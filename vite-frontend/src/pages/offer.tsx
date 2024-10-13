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
import { ShoppingCart } from "lucide-react";

// Mock product data
const products = [
  {
    id: 1,
    name: "Smartphone X",
    price: 699,
    category: "Electronics",
    image: "/placeholder.svg",
  },
  {
    id: 2,
    name: "Laptop Pro",
    price: 1299,
    category: "Electronics",
    image: "/placeholder.svg",
  },
  {
    id: 3,
    name: "Wireless Headphones",
    price: 199,
    category: "Electronics",
    image: "/placeholder.svg",
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 89,
    category: "Sports",
    image: "/placeholder.svg",
  },
  {
    id: 5,
    name: "Yoga Mat",
    price: 29,
    category: "Sports",
    image: "/placeholder.svg",
  },
  {
    id: 6,
    name: "Coffee Maker",
    price: 79,
    category: "Home",
    image: "/placeholder.svg",
  },
  {
    id: 7,
    name: "Desk Lamp",
    price: 39,
    category: "Home",
    image: "/placeholder.svg",
  },
  {
    id: 8,
    name: "Backpack",
    price: 59,
    category: "Fashion",
    image: "/placeholder.svg",
  },
];

export default function Offer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (categoryFilter === "All" || product.category === categoryFilter)
  );

  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className="flex flex-col w-full py-8 bg-[#0B0406]">
      <h1 className="text-3xl font-bold mb-8 text-[#F3F3F3]">Current Offers</h1>

      <div className="flex flex-col md:flex-row gap-4 mb-8 ml-20">
        <Input
          type="search"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="max-w-[180px]">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-20">
        {filteredProducts.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <p className="text-2xl font-bold mt-2">${product.price}</p>
            </CardHeader>
            <CardContent>
              <CardTitle className="mb-2">{product.name}</CardTitle>
              <p className="text-gray-600">{product.category}</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No products found.</p>
      )}
    </div>
  );
}
