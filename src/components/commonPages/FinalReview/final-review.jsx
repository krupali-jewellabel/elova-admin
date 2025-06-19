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
    <>
      <CardHeader className={"text-lg justify-center"}>Review</CardHeader>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {CARD_DATA.map((card, index) => (
          <Card key={index}>
            <CardHeader className="flex items-center justify-between">
              <CardTitle className="font-bold">{card.title}</CardTitle>
              {/* <Button className="text-sm">Edit</Button> */}
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

      <div className="flex flex-col sm:flex-row justify-end gap-2 md:gap-3 mb-5 mr-3 mt-5">
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
        <Link href="#" className="w-full sm:w-auto">
          <Button>Submit</Button>
        </Link>
      </div>
    </>
  );
};

export default FinalReview;
