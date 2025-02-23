import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus } from "lucide-react";

const initialCategories = ["Food", "Rent", "Entertainment", "Transportation", "Utilities", "Shopping"];
const initialPaymentMethods = ["Cash", "Credit Card", "Debit Card", "Bank Transfer"];

const ExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    name: "",
    amount: "",
    category: "",
    date: new Date().toISOString().split("T")[0],
    paymentMethod: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense(expense);
    setExpense({
      name: "",
      amount: "",
      category: "",
      date: new Date().toISOString().split("T")[0],
      paymentMethod: ""
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Expense
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input type="text" placeholder="Expense Name" value={expense.name} onChange={(e) => setExpense({ ...expense, name: e.target.value })} required />
          <Input type="number" placeholder="Amount" value={expense.amount} onChange={(e) => setExpense({ ...expense, amount: e.target.value })} required />
          <Select value={expense.category} onValueChange={(value) => setExpense({ ...expense, category: value })}>
            <SelectTrigger><SelectValue placeholder="Select Category" /></SelectTrigger>
            <SelectContent>
              {initialCategories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input type="date" value={expense.date} onChange={(e) => setExpense({ ...expense, date: e.target.value })} required />
          <Select value={expense.paymentMethod} onValueChange={(value) => setExpense({ ...expense, paymentMethod: value })}>
            <SelectTrigger><SelectValue placeholder="Select Payment Method" /></SelectTrigger>
            <SelectContent>
              {initialPaymentMethods.map((method) => (
                <SelectItem key={method} value={method}>{method}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">Add Expense</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;