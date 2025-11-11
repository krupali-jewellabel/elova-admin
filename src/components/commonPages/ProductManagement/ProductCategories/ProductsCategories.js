// "use client";

// import React, { useState } from "react";
// import { Folder, ChevronRight } from "lucide-react";
// import { Card } from "@/components/common/ui/cards/card";
// import {
//   Toolbar,
//   ToolbarDescription,
//   ToolbarHeading,
//   ToolbarPageTitle,
// } from "@/components/common/ui/toolbar";
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "@/components/common/ui/breadcrumb";

// export const ProductsCategories = () => {
//   const categories = [
//     { id: "1", name: "Rings", productCount: 148 },
//     { id: "2", name: "Earrings", productCount: 98 },
//     { id: "3", name: "Pendants", productCount: 76 },
//     { id: "4", name: "Bracelets", productCount: 54 },
//     { id: "5", name: "Necklaces", productCount: 89 },
//     { id: "6", name: "Bangles", productCount: 42 },
//   ];

//   return (
//     <>
//       <div className="ml-5">
//         <Breadcrumb>
//           <BreadcrumbList>
//             <BreadcrumbItem>
//               <BreadcrumbLink href="/">Product Management</BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//             <BreadcrumbItem>
//               <BreadcrumbPage>Product Categories</BreadcrumbPage>
//             </BreadcrumbItem>
//           </BreadcrumbList>
//         </Breadcrumb>
//       </div>
//       <div className="mt-6 ml-5">
//         <Toolbar>
//           <ToolbarHeading>
//             <ToolbarPageTitle
//               text="Product Categories"
//               className="font-semibold !text-foreground text-lg"
//             />
//             <ToolbarDescription className="mt-1 text-sm">
//               Select a category to manage products
//             </ToolbarDescription>
//           </ToolbarHeading>
//         </Toolbar>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {categories.map((category) => (
//           <Card
//             key={category.id}
//             className="p-6 rounded-xl border border-gray-200 hover:shadow-lg hover:border-primary transition-all cursor-pointer group bg-white"
//             onClick={() => handleCategoryClick(category.name)}
//           >
//             <div className="flex items-center gap-4">
//               <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center group-hover:from-primary/20 group-hover:to-primary/10 transition-all">
//                 <Folder className="w-8 h-8 text-primary" />
//               </div>

//               <div className="flex-1">
//                 <h3 className="text-gray-900 mb-1 group-hover:text-primary transition-colors">
//                   {category.name}
//                 </h3>
//                 <p className="text-sm">{category.productCount} Products</p>
//               </div>

//               <ChevronRight className="w-5 h-5 group-hover:text-primary transition-colors" />
//             </div>
//           </Card>
//         ))}
//       </div>
//     </>
//   );
// };

// export default ProductsCategories;

"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Folder, ChevronRight } from "lucide-react";
import { Card } from "@/components/common/ui/cards/card";
import {
  Toolbar,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from "@/components/common/ui/toolbar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/common/ui/breadcrumb";

export const ProductsCategories = () => {
  const router = useRouter();

  const categories = [
    { id: "rings", name: "Rings", productCount: 148 },
    { id: "earrings", name: "Earrings", productCount: 98 },
    { id: "pendants", name: "Pendants", productCount: 76 },
    { id: "bracelets", name: "Bracelets", productCount: 54 },
    { id: "necklaces", name: "Necklaces", productCount: 89 },
    { id: "bangles", name: "Bangles", productCount: 42 },
  ];

  const handleCategoryClick = (id) => {
    router.push(`/dashboard/product-categories/${id}`);
  };

  return (
    <>
      <div className="ml-5">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Product Management</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Product Categories</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="mt-6 ml-5">
        <Toolbar>
          <ToolbarHeading>
            <ToolbarPageTitle
              text="Product Categories"
              className="font-semibold !text-foreground text-lg"
            />
            <ToolbarDescription className="mt-1 text-sm">
              Select a category to manage products
            </ToolbarDescription>
          </ToolbarHeading>
        </Toolbar>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="p-6 rounded-xl border border-gray-200 transition-all cursor-pointer group bg-white hover:border-primary"
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center transition-all">
                <Folder className="w-8 h-8 text-primary" />
              </div>

              <div className="flex-1">
                <h3 className="text-gray-900 mb-1  transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm">{category.productCount} Products</p>
              </div>

              <ChevronRight className="w-5 h-5  transition-colors" />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};

export default ProductsCategories;
