import {
  Card,
  CardContent,
  CardTitle,
} from "@/components/common/ui/cards/card";
import { TableCell, TableRow } from "@/components/common/ui/table";
import { InputWrapper } from "@/components/common/ui/input";
import { Button } from "@/components/common/ui/button";
import Link from "next/link";

const leftColumn = [
  { label: "Estimated Cost", value: "$1234" },
  { label: "Diamond", value: "$750" },
  { label: "Metal", value: "$400" },
  { label: "Labour", value: "VS1" },
];

const rightColumn = [
  { label: "Total Base Price", value: "$1250" },
  { label: "Price to Store", value: "$1125" },
  { label: "Final Customer Price", value: "$1350" },
];

const renderItemAttributes = (item, index) => {
  return (
    <TableRow key={index} className="border-0">
      <TableCell className="text-sm text-secondary-foreground pb-3.5 pe-4 lg:pe-6 py-2">
        {item.label}
      </TableCell>
      <TableCell className="text-sm text-mono pb-3 py-2">{item.info}</TableCell>
    </TableRow>
  );
};

export const StorePricingConfig = () => {
  return (
    <Card className={"w-full mt-5 mb-5"}>
      <div className="max-w-4xl">
        <CardContent className="lg:py-7.5">
          <CardTitle className="mb-5">Store Pricing Configuration</CardTitle>
          <CardContent className="p-5 lg:p-7.5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Store Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-muted-foreground">
                  Store
                </label>
                <InputWrapper>
                  <select className="w-full">
                    <option value="">Select Store</option>
                    <option value="niora">Niora</option>
                    <option value="another">Elova</option>
                  </select>
                </InputWrapper>
              </div>

              {/* Status Field */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-muted-foreground">
                  Status
                </label>
                <InputWrapper>
                  <select className="w-full">
                    <option value="">Requested</option>
                    <option value="niora">Approvel</option>
                  </select>
                </InputWrapper>
              </div>
            </div>
          </CardContent>
        </CardContent>
      </div>

      <div className="max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
          <div className="p-4 rounded-lg col-span-1 md:col-span-2">
            <h3 className="text-base font-medium mb-4">Quotation</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
              {/* Left Column */}
              <div className="space-y-2">
                {leftColumn.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>{item.label}</span>
                    <span className="font-semibold text-gray-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Right Column */}
              <div className="space-y-2">
                {rightColumn.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>{item.label}</span>
                    <span className="font-semibold text-gray-900">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CardTitle className="ml-5 mb-5">CAD & Assets</CardTitle>
      <div className="flex gap-3 ml-5 mb-5">
        <Button variant="outline" className={"bg-gray-200"}>
          <Link href="#">CAD Version History</Link>
        </Button>
        <Button>
          <Link href="#">Message</Link>
        </Button>
      </div>
    </Card>
  );
};

export default StorePricingConfig;
