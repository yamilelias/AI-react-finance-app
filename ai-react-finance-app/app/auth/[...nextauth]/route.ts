import NextAuth from "next-auth"
import { authOptions } from "@/lib/auth"
import EmailProvider from "next-auth/providers/email"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "@/lib/prisma"
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    EmailProvider({
      server: {
        send: async (message) => {
          console.log("Sending email:", message);

          const { data, error } = await resend.emails.send({
            from: "no-reply@finance.prograpp.dev",
            to: message.to,
            subject: message.subject,
            html: message.html,
          });

          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent successfully:", data);
          }
        },
      },
      from: "no-reply@finance.prograpp.dev",
    }),
  ],
  callbacks: {
    session: async ({ session, user }) => {
      if (session?.user) {
        session.user.id = user.id;
      }
      return session;
    },
    redirect: async ({ url, baseUrl }) => {
      return url.startsWith(baseUrl) ? url : baseUrl;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
  },
  session: {
    strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }