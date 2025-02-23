import NextAuth from "next-auth"
import EmailProvider from "next-auth/providers/email"
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY);

const handler = NextAuth({
  providers: [
    EmailProvider({
      server: {
        send: async (message) => {
          await resend.emails.send({
            from: "onboarding@resend.dev",
            to: message.to,
            subject: message.subject,
            html: message.html,
          });
        },
      },
      from: "onboarding@resend.dev",
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
    verifyRequest: '/auth/verify',
  },
});

export { handler as GET, handler as POST }