"use client";

import React, { useState } from "react";
import { Card } from "@/components/common/ui/cards/card";
import { Input } from "@/components/common/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { Search } from "lucide-react";

const FilterChips = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [collectionFilter, setCollectionFilter] = useState("all");
  const [metalFilter, setMetalFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  return (
    <div>
      <Card className="p-4 rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 rounded-xl"
              />
            </div>
          </div>

          {/* Category Filter */}
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="Rings">Rings</SelectItem>
              <SelectItem value="Earrings">Earrings</SelectItem>
              <SelectItem value="Pendants">Pendants</SelectItem>
              <SelectItem value="Bracelets">Bracelets</SelectItem>
            </SelectContent>
          </Select>

          {/* Collection Filter */}
          <Select value={collectionFilter} onValueChange={setCollectionFilter}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Collection" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Collections</SelectItem>
              <SelectItem value="Bridal Collection">Bridal</SelectItem>
              <SelectItem value="Classic Collection">Classic</SelectItem>
              <SelectItem value="Designer Collection">Designer</SelectItem>
            </SelectContent>
          </Select>

          {/* Metal Filter */}
          <Select value={metalFilter} onValueChange={setMetalFilter}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Metal" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Metals</SelectItem>
              <SelectItem value="White Gold">White Gold</SelectItem>
              <SelectItem value="Yellow Gold">Yellow Gold</SelectItem>
              <SelectItem value="Platinum">Platinum</SelectItem>
            </SelectContent>
          </Select>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="name">Name A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
    </div>
  );
};

export default FilterChips;
