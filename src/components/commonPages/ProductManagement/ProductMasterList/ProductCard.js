import { Card } from "@/components/common/ui/cards/card";
import { Edit2, EyeIcon } from "lucide-react";
import React from "react";
import { Checkbox } from "@/components/common/ui/checkbox";
import { RiDeleteBinFill } from "@remixicon/react";

const ProductCard = ({
  id,
  productImg,
  title,
  designNo,
  category,
  style,
  shape,
  salesPrice,
  margin,
  collection,
  createdAt,
  lastUpdatedDate,
  gender,
  active,
  onClick,
}) => {
  return (
    <Card className="shadow-none mb-5">
      <div className="rounded-t-xl relative p-[17px] w-auto h-[196px] bg-[#FCFCFC]">
        <div className="absolute left-[17px]">
          <Checkbox />
        </div>
        <div className="absolute right-[17px] text-[14px] font-[400] flex items-center gap-[10px]">
          Active {active}
        </div>
        <img
          src={productImg}
          alt={category}
          className="h-[163px] w-[163px] mx-auto object-cover"
        />
      </div>
      <div className="card-border card-rounded-b px-3.5 pt-5 pb-3.5 ">
        {title && (
          <div className="text-[12px] text-secondary-foreground font-[400] pb-4">
            Title
            <p className="text-[14px] font-[500] text-foreground">
              {title}
            </p>
          </div>
        )}
        <div className="text-[12px] text-secondary-foreground font-[400] pb-4">
          Design No
          <p className="text-[14px] font-[500] text-foreground"> {designNo}</p>
        </div>
        <div className="grid grid-cols-2 items-center gap-4">
          <div className="text-[12px] text-secondary-foreground font-[400]">
            Style
            <p className="text-[14px] font-[500] text-foreground"> {style}</p>
          </div>
          <div className="text-[12px] text-secondary-foreground font-[400]">
            Shape
            <p className="text-[14px] font-[500] text-foreground"> {shape}</p>
          </div>

          <div className="text-[12px] text-secondary-foreground font-[400]">
            Margin
            <p className="text-[14px] font-[500] text-foreground"> {margin}</p>
          </div>
          <div className="text-[12px] text-secondary-foreground font-[400]">
            Collection
            <p className="text-[14px] font-[500] text-foreground">
              {" "}
              {collection}
            </p>
          </div>

          <div className="text-[12px] text-secondary-foreground font-[400]">
            Sales Price
            <p className="text-[14px] font-[500] text-foreground">
              {" "}
              {salesPrice}
            </p>
          </div>
          <div className="text-[12px] text-secondary-foreground font-[400]">
            Gender
            <p className="text-[14px] font-[500] text-foreground"> {gender}</p>
          </div>

          <div className="text-[12px] text-secondary-foreground font-[400]">
            Created Date
            <p className="text-[14px] font-[500] text-foreground">
              {" "}
              {createdAt}
            </p>
          </div>
          <div className="text-[12px] text-secondary-foreground font-[400]">
            Last Update Date
            <p className="text-[14px] font-[500] text-foreground">
              {" "}
              {lastUpdatedDate}
            </p>
          </div>
        </div>

        <div className="flex justify-between pt-[20px]">
          <div className="flex items-center gap-2">
            <Edit2 width={16} />
            <span className="text-[12px] text-secondary-foreground font-[400]">
              Edit
            </span>
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={onClick}
          >
            <EyeIcon width={16} />
            <span className="text-[12px] text-secondary-foreground font-[400]">
              View
            </span>
          </div>
          <div className="flex items-center gap-2 ">
            <RiDeleteBinFill width={16} />
            <span className="text-[12px] text-secondary-foreground font-[400]">
              Remove
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
