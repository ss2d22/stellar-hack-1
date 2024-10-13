import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CreditCard,
  TrendingUp,
} from "lucide-react";

// Mock data for transactions
const transactions = [
  { id: 1, type: "loan", amount: 5000, date: "2023-06-01", status: "active" },
  { id: 2, type: "lend", amount: 2000, date: "2023-06-05", status: "active" },
  { id: 3, type: "loan", amount: 1000, date: "2023-06-10", status: "paid" },
  { id: 4, type: "lend", amount: 3000, date: "2023-06-15", status: "active" },
];

// Mock data for owner statistics
const ownerStats = {
  totalLent: 5000,
  totalBorrowed: 6000,
  activeLoans: 2,
  activeLends: 2,
  creditScore: 750,
};

export default function Dashboard() {
  const [loanAmount, setLoanAmount] = useState("");
  const [lendAmount, setLendAmount] = useState("");

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Loan requested:", loanAmount);
    // Here you would typically send this data to your backend
  };

  const handleLendSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Lend offered:", lendAmount);
    // Here you would typically send this data to your backend
  };

  return (
    <div className="flex flex-row bg-[#0B0406] mx-auto px-4 py-8 space-x-16">
      <div className="grid grid-cols-2 gap-6 mb-8 h-1/2">
        <StatCard
          title="Total Lent"
          value={`$${ownerStats.totalLent}`}
          icon={<ArrowUpIcon className="h-4 w-4 text-green-500" />}
        />
        <StatCard
          title="Total Borrowed"
          value={`$${ownerStats.totalBorrowed}`}
          icon={<ArrowDownIcon className="h-4 w-4 text-red-500" />}
        />
        <StatCard
          title="Active Transactions"
          value={ownerStats.activeLoans + ownerStats.activeLends}
          icon={<CreditCard className="h-4 w-4 text-blue-500" />}
        />
        <StatCard
          title="Credit Score"
          value={ownerStats.creditScore}
          icon={<TrendingUp className="h-4 w-4 text-purple-500" />}
        />
      </div>
      <div className="flex flex-col spacing-y-5">
        <Tabs defaultValue="lend" className="mb-8">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lend">Lend Money</TabsTrigger>
            <TabsTrigger value="loan">Request Loan</TabsTrigger>
          </TabsList>
          <TabsContent value="lend">
            <Card>
              <CardHeader>
                <CardTitle>Lend Money</CardTitle>
                <CardDescription>
                  Offer a loan to others and earn interest.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLendSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="lendAmount">Amount to Lend</Label>
                      <Input
                        id="lendAmount"
                        placeholder="Enter amount"
                        type="number"
                        value={lendAmount}
                        onChange={(e) => setLendAmount(e.target.value)}
                      />
                    </div>
                    <Button type="submit">Offer Loan</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="loan">
            <Card>
              <CardHeader>
                <CardTitle>Request Loan</CardTitle>
                <CardDescription>Borrow money from lenders.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLoanSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="loanAmount">Loan Amount</Label>
                      <Input
                        id="loanAmount"
                        placeholder="Enter amount"
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                      />
                    </div>
                    <Button type="submit">Request Loan</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center">
                  <div
                    className={`rounded-full p-2 ${
                      transaction.type === "loan"
                        ? "bg-red-100"
                        : "bg-green-100"
                    }`}
                  >
                    {transaction.type === "loan" ? (
                      <ArrowDownIcon className="h-4 w-4 text-red-500" />
                    ) : (
                      <ArrowUpIcon className="h-4 w-4 text-green-500" />
                    )}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {transaction.type === "loan" ? "Loan" : "Lend"} - $
                      {transaction.amount}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {transaction.date} - {transaction.status}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    {transaction.type === "loan" ? "-" : "+"}$
                    {transaction.amount}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
}
