import React from "react";
import { CARD_DATA } from "./constant";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/common/ui/cards/card";
import { Button } from "@/components/common/ui/button";
import Link from "next/link";

export const FinalReview = () => {
  return (
    <div>
      <h2 className="text-center text-xl font-semibold mb-8">Review</h2>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-screen-lg mx-auto px-4">
        {CARD_DATA.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="font-bold">{card.title}</CardTitle>
              <Button mode="link" underlined="dashed">
                <Link href="#">Edit</Link>
              </Button>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              {card.content}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3 mt-6 max-w-screen-lg mx-auto px-4">
        <Link href="#" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto">
            Save Draft
          </Button>
        </Link>
        <Link href="#" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full sm:w-auto bg-[#F1F1F2]">
            Previous
          </Button>
        </Link>
        <Link href="/theme-customization" className="w-full sm:w-auto">
          <Button className="w-full sm:w-auto">Submit</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinalReview;
