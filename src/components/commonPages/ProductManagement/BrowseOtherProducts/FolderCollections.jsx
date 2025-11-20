"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/common/ui/breadcrumb";
import { Card } from "@/components/common/ui/cards/card";
import { Skeleton } from "@/components/common/ui/skeleton";
import { ChevronRight, Folder } from "lucide-react";
import { toTitleCase } from "@/lib/utils";
import React from "react";

const FolderCollections = ({ category, onBack }) => {
  const loading = false;
  const products = [
    { id: 1, name: "Bridal", collection_count: 20 },
    { id: 2, name: "Classic", collection_count: 15 },
    { id: 3, name: "Elegant", collection_count: 10 },
  ];

  return (
    <>
      <div className="ml-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink onClick={onBack} className="cursor-pointer">
                Product Categories
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{toTitleCase(category.name)}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mt-4 ml-5">
        <h1 className="text-xl font-semibold">
          {toTitleCase(category.name)} Collections
        </h1>
        <p className="text-sm text-gray-500">{products.length} Collections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-24 rounded-xl" />
            ))
          : products.map((item) => (
              <Card
                key={item.id}
                className="p-6 rounded-xl border border-gray-200 transition-all cursor-pointer group bg-white hover:border-primary hover:shadow-md"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
                    <Folder className="w-8 h-8 text-primary" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-gray-900 mb-1 font-medium group-hover:text-primary">
                      {toTitleCase(item.name)} Collection
                    </h3>
                    <p className="text-sm text-gray-500">
                      {item.collection_count} Items
                    </p>
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-primary" />
                </div>
              </Card>
            ))}
      </div>
    </>
  );
};

export default FolderCollections;
