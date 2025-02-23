import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Wallet } from "lucide-react";

export const Budget = ({ expenses }) => {
  const [budgets, setBudgets] = useState({
    Food: 500,
    Rent: 1500,
    Entertainment: 200,
    Transportation: 300,
    Utilities: 400,
    Shopping: 300
  });

  const categorySpending = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="w-5 h-5" />
          Budget Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(budgets).map(([category, budget]) => {
          const spent = categorySpending[category] || 0;
          const percentage = Math.min((spent / budget) * 100, 100);
          const isOverBudget = spent > budget;

          return (
            <div key={category} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{category}</span>
                <span className="text-sm">${spent.toFixed(2)} / ${budget}</span>
              </div>
              <Progress value={percentage} />
              {isOverBudget && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>You've exceeded your budget for {category}</AlertDescription>
                </Alert>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};