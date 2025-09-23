import { Badge, BadgeDot } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/common/ui/cards/card";
import { TwoColCard } from "@/components/common/ui/cards/TwoColCard";
import { Progress } from "@/components/common/ui/progress";
import { ScrollArea } from "@/components/common/ui/scroll-area";
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/common/ui/sheet";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import React from "react";
import { ORDER_DATA } from "../constant";

const {
  Locations,
  ShippingInfo,
  Statuses,
  OrderInfo,
  OrderedProducts,
  ShippingLog,
} = ORDER_DATA;

const CheckIcon = ({ active = true }) => (
  <svg
    className={cn(
      "size-4",
      active ? "text-green-500" : "text-muted-foreground"
    )}
    viewBox="0 0 16 16"
    fill="none"
  >
    <path
      d="M15.333 8A7.333 7.333 0 1 1 8 .667 7.333 7.333 0 0 1 15.333 8ZM7.78 10.72l4.4-4.4a.667.667 0 0 0-.935-.935L7.267 9.165 4.847 6.745a.667.667 0 0 0-.935.935l2.933 2.933a.667.667 0 0 0 .935 0Z"
      fill={active ? "#0BC33F" : "#C9CEDA"}
    />
  </svg>
);

const ViewOrders = ({ open, onClose, orderDetails, orders }) => {
  // const order = orderDetails;
  const OrderData = orders?.data ?? {};

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:w-[720px] inset-5 start-auto h-auto rounded-lg p-0 sm:max-w-none [&_[data-slot=sheet-close]]:top-4.5 [&_[data-slot=sheet-close]]:end-5">
        <SheetHeader className="border-b py-3.5 px-5 border-border">
          <SheetTitle>Order Info</SheetTitle>
        </SheetHeader>
        <SheetBody className="px-5 py-0">
          <ScrollArea className="h-[calc(100dvh-11.5rem)] pe-3 -me-3">
            <div className="grid xl:grid-cols-1 gap-5 lg:gap-9">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader className="justify-start bg-muted/70 gap-9 h-auto py-5">
                    {[
                      ["Order ID", OrderData?.id],
                      // [
                      //   "Order placed",
                      //   order?.created_at
                      //     ? new Date(order.created_at).toLocaleDateString(
                      //         "en-GB",
                      //         {
                      //           day: "2-digit",
                      //           month: "short",
                      //           year: "numeric",
                      //         }
                      //       )
                      //     : "-",
                      // ],
                      // ["Total", `$${order?.total}`],
                      // ["Ship to", `${order?.first_name} ${order?.last_name}`],
                      // ["Estimated Delivery", "07 July, 2025"],
                    ].map(([label, value], i) => (
                      <div key={i}>
                        <span className="text-xs text-secondary-foreground">
                          {label}
                        </span>
                        <div className="text-sm font-medium">{value}</div>
                      </div>
                    ))}
                  </CardHeader>

                  {/* <CardContent className="p-5 lg:p-7.5 space-y-5">
                    <TwoColCard items={order?.items || []} limit={4} />
                  </CardContent> */}
                </Card>
              </div>
            </div>
          </ScrollArea>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export default ViewOrders;
