import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowUp, Check, CircleUserRound, ShoppingCart } from "lucide-react";

// Mock lent data
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
  {
    id: 5,
    amount: 5000,
    account: 0x123123,
    date: "2023-06-01",
    loan_term: "3 months",
    interest_rate: "10%",
  },
  {
    id: 6,
    amount: 2000,
    account: 0x123123,
    date: "2023-06-05",
    loan_term: "2 months",
    interest_rate: "15%",
  },
  {
    id: 7,
    amount: 1000,
    account: 0x123123,
    date: "2023-06-10",
    loan_term: "1 months",
    interest_rate: "5%",
  },
  {
    id: 8,
    amount: 3000,
    account: 0x123123,
    date: "2023-06-15",
    loan_term: "2 weeks",
    interest_rate: "10%",
  },
];

export default function Offer() {
  const [termFilter, setTermFilter] = useState("All");
  const [rateFilter, setRateFilter] = useState("All");
  const loanTerm = ["All", ...new Set(lent.map((lent) => lent.loan_term))];
  const loanRate = ["All", ...new Set(lent.map((lent) => lent.interest_rate))];

  return (
    <div className="flex flex-col w-full py-8 bg-[#0B0406]">
      <h1 className="text-3xl font-bold mb-8 text-[#F3F3F3]">Current Offers</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 ml-20 ">
        <Select value={termFilter} onValueChange={setTermFilter}>
          <SelectTrigger className="max-w-[180px] bg-[#F3F3F3]">
            <SelectValue placeholder="Term" />
          </SelectTrigger>
          <SelectContent>
            {loanTerm.map((term) => (
              <SelectItem key={term} value={term}>
                {term}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={rateFilter} onValueChange={setRateFilter}>
          <SelectTrigger className="max-w-[180px] bg-[#F3F3F3]">
            <SelectValue
              className="text-[#F3F3F3]"
              placeholder="Interest Rate"
            />
          </SelectTrigger>
          <SelectContent>
            {loanRate.map((rate) => (
              <SelectItem key={rate} value={rate}>
                {rate}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-20">
        {lent.map((lent) => (
          <Card className="bg-[#171717] border-transparent" key={lent.id}>
            <CardHeader>
              <CardTitle className="text-4xl font-bold mt-2 text-[#F3F3F3]">
                {lent.amount} XLM
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-200 flex flex-row">
                <CircleUserRound className="pr-2" />
                {lent.account}
              </p>
              <p className="text-gray-200 flex flex-row">
                <ArrowUp className="pr-2" />
                {lent.interest_rate} interest rate!
              </p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <Check className="mr-2 h-4 w-4" /> Accept Offer
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {lent.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No lents found.</p>
      )}
    </div>
  );
}
