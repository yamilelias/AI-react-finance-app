'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Budget } from "@/components/Budget";
import { Insights } from "@/components/Insights";

export default function DashboardPage({ expenses }) {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Total Expenses</p>
                <p className="text-2xl font-bold">
                  ${expenses.reduce((sum, exp) => sum + Number(exp.amount), 0).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-2xl font-bold">
                  ${expenses
                    .filter(exp => new Date(exp.date).getMonth() === new Date().getMonth())
                    .reduce((sum, exp) => sum + Number(exp.amount), 0)
                    .toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Budget expenses={expenses} />
      </div>
      <Insights expenses={expenses} />
    </div>
  );
}