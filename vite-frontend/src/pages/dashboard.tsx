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
import { Progress } from "@/components/ui/progress";
import {
  ArrowDownIcon,
  ArrowUp,
  ArrowUpIcon,
  CircleUserRound,
  CreditCard,
  TrendingUp,
  History,
  Calendar,
} from "lucide-react";
// Mock data for transactions
const transactions = [
  { id: 1, type: "loan", amount: 5000, date: "2023-06-01", status: "active" },
  { id: 2, type: "lend", amount: 2000, date: "2023-06-05", status: "active" },
  { id: 3, type: "loan", amount: 1000, date: "2023-06-10", status: "paid" },
  { id: 4, type: "lend", amount: 3000, date: "2023-06-15", status: "active" },
];

// Mock data for current lents
const lent = [
  {
    id: 1,
    amount: 5000,
    account: 0x123123,
    date: "2023-06-01",
    loan_term: "3 months",
    interest_rate: "10%",
  },
  {
    id: 2,
    amount: 2000,
    account: 0x123123,
    date: "2023-06-05",
    loan_term: "2 months",
    interest_rate: "15%",
  },
  {
    id: 3,
    amount: 1000,
    account: 0x123123,
    date: "2023-06-10",
    loan_term: "1 months",
    interest_rate: "5%",
  },
  {
    id: 4,
    amount: 3000,
    account: 0x123123,
    date: "2023-06-15",
    loan_term: "2 weeks",
    interest_rate: "10%",
  },
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
  const [interestRate, setInterestRate] = useState("");

  const handleLoanSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Loan requested:", loanAmount);
    // Here you would typically send this data to your backend
  };

  return (
    <div className="flex flex-row bg-[#0B0406] mx-auto px-8 pb-8 pt-4 space-x-16">
      <div className="w-7/12">
        <Tabs defaultValue="lend" className="mb-8">
          <TabsList className="grid w-full grid-cols-2 bg-[#0B0406]">
            <TabsTrigger value="lend">Lend Money</TabsTrigger>
            <TabsTrigger value="loan">Request Loan</TabsTrigger>
          </TabsList>
          <TabsContent className="space-y-4 px-10 mt-4 " value="lend">
            {lent.map((record) => (
              <Card
                className="flex flex-row bg-[#171717] border-transparent"
                key={record.id}
              >
                <CardHeader className="items-center justify-center w-2/3 space-y-4">
                  <CardTitle className="text-4xl font-bold mt-2 text-[#F3F3F3]">
                    {record.amount} XLM
                  </CardTitle>
                  <Progress value={33} className="border-2 w-[60%] h-4" />
                </CardHeader>
                <CardContent className="flex flex-col items-start mt-6">
                  <p className="text-gray-200 flex flex-row">
                    <CircleUserRound className="pr-2" />
                    {record.account}
                  </p>
                  <p className="text-gray-200 flex flex-row">
                    <ArrowUp className="pr-2" />
                    {record.interest_rate} interest rate!
                  </p>
                  <p className="text-gray-200 flex flex-row">
                    <History className="pr-2" />
                    {record.loan_term}
                  </p>
                  <p className="text-gray-200 flex flex-row">
                    <Calendar className="pr-2" />
                    {record.date}
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          <TabsContent value="loan">
            <Card className="bg-[#171717] border-transparent">
              <CardHeader>
                <CardTitle className="text-[#F3F3F3] text-2xl">
                  Request Loan
                </CardTitle>
                <CardDescription>
                  Post your Loan to your lenders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLoanSubmit}>
                  <div className="grid w-full items-center gap-4 ">
                    <div className="flex flex-row space-x-3">
                      <Label
                        className="mt-3 w-[15%] text-[#F3F3F3]"
                        htmlFor="amount"
                      >
                        Amount
                      </Label>
                      <Input
                        className="w-[75%]"
                        id="amount"
                        placeholder="Enter amount"
                        type="number"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-row space-x-3">
                      <Label
                        className="mt-3 w-[15%] text-[#F3F3F3]"
                        htmlFor="interest"
                      >
                        Interest Rate
                      </Label>
                      <Input
                        className="w-[75%]"
                        id="interestRate"
                        placeholder="Enter amount"
                        type="number"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                      />
                    </div>
                    <Button className="border-[#737373]" type="submit">
                      Request Loan
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-4 h-1/3 mt-10">
              {lent.map((record) => (
                <Card
                  className="flex flex-row bg-[#171717] border-transparent"
                  key={record.id}
                >
                  <CardHeader className="items-center justify-center w-1/2 space-y-4">
                    <CardTitle className="text-4xl font-bold text-[#F3F3F3]">
                      {record.amount} XLM
                    </CardTitle>
                    <Progress value={33} className="border-2 w-[50%] h-4" />
                  </CardHeader>
                  <CardContent className="flex flex-col items-start mt-6">
                    <p className="text-gray-200 flex flex-row">
                      <CircleUserRound className="pr-2" />
                      {record.account}
                    </p>
                    <p className="text-gray-200 flex flex-row">
                      <ArrowUp className="pr-2" />
                      {record.interest_rate} interest
                    </p>
                    <p className="text-gray-200 flex flex-row">
                      <History className="pr-2" />
                      {record.loan_term}
                    </p>
                    <p className="text-gray-200 flex flex-row">
                      <Calendar className="pr-2" />
                      {record.date}
                    </p>
                    <Button type="submit" className="w-full mt-5 bg-[#737373]">
                      Return now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex flex-col w-1/3 space-y-10">
        <div className="grid grid-cols-2 gap-4 h-1/3">
          <StatCard
            title="Total Lent"
            value={`${ownerStats.totalLent} XLM`}
            icon={<ArrowUpIcon className="h-4 w-4 text-green-500" />}
          />
          <StatCard
            title="Total Borrowed"
            value={`${ownerStats.totalBorrowed} XLM`}
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
        <Card className="bg-[#171717] border-transparent">
          <CardHeader>
            <CardTitle className="text-xl text-[#F3F3F3]">
              Recent Transactions
            </CardTitle>
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
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none text-[#F3F3F3]">
                      {transaction.type === "loan" ? "Loan" : "Lend"} -
                      {transaction.amount} XLM
                    </p>
                    <p className="ml-9 text-sm text-[#B9B9B9]">
                      {transaction.date} - {transaction.status}
                    </p>
                  </div>
                  <div className="ml-auto font-medium text-[#F3F3F3]">
                    {transaction.type === "loan" ? "-" : "+"}
                    {transaction.amount} XLM
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
    <div className="rounded-xl p-px bg-gradient-to-b from-[#395BBF] to-[#D96277] box-border w-full max-w-md max-h-[115px]">
      <Card className="bg-[#0B0406] border-transparent">
        <CardHeader className="flex flex-row items-center justify-between space-x-2 pb-2">
          <CardTitle className="text-sm text-[#F3F3F3] font-medium">
            {title}
          </CardTitle>
          {icon}
        </CardHeader>
        <CardContent>
          <div className="text-2xl text-[#F3F3F3] font-bold">{value}</div>
        </CardContent>
      </Card>
    </div>
  );
}
