"use client";
import React, { useEffect, useState } from "react";
import { useCrudList } from "@/hooks/useCrudList"; // import your hook
import {
  Sheet,
  SheetBody,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/common/ui/sheet";
import { ScrollArea } from "@/components/common/ui/scroll-area";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/common/ui/cards/card";
import { TwoColCard } from "@/components/common/ui/cards/TwoColCard";
import { Button } from "@/components/common/ui/button";
import { Progress } from "@/components/common/ui/progress";
import { Badge, BadgeDot } from "@/components/common/ui/badge";
import { MapPin } from "lucide-react";
import { cn, formatDateShort } from "@/lib/utils";
import { ORDER_DATA } from "../constant";

const ViewOrders = ({ open, onClose, orderId, orders }) => {
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

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="sm:w-[720px] inset-5 start-auto h-auto rounded-lg p-0 sm:max-w-none [&_[data-slot=sheet-close]]:top-4.5 [&_[data-slot=sheet-close]]:end-5">
        <SheetHeader className="border-b py-3.5 px-5 border-border">
          <SheetTitle>Order Info</SheetTitle>
        </SheetHeader>

        <SheetBody className="px-5 py-0">
          <ScrollArea className="h-[calc(100dvh-11.5rem)] pe-3 -me-3">
            {/* ORDER DETAILS */}
            <div className="grid xl:grid-cols-1 gap-5 lg:gap-9">
              <div className="lg:col-span-1">
                <Card>
                  <CardHeader className="justify-start bg-muted/70 gap-9 h-auto py-5">
                    {[
                      ["Order ID", orders?.id],
                      ["Status", orders?.order_status],
                      ["Order placed", formatDateShort(orders?.created_at)],
                      ["Total", orders?.total],
                      [
                        "Ship to",
                        orders?.customer?.first_name +
                          " " +
                          orders?.customer?.last_name,
                      ],
                      ["Estimated Delivery", orders?.estimated_delivery || "—"],
                    ].map(([label, value], i) => (
                      <div key={i}>
                        <span className="text-xs text-secondary-foreground">
                          {label}
                        </span>
                        <div className="text-sm font-medium">{value}</div>
                      </div>
                    ))}
                  </CardHeader>

                  <CardContent className="p-5 lg:p-7.5 space-y-5">
                    <TwoColCard items={orders?.items} limit={4} />
                  </CardContent>
                </Card>
              </div>
            </div>

            <div className="flex items-center justify-between mt-5">
              <div className="space-y-2.5">
                <div className="flex gap-2.5">
                  <p>{orders?.id}</p>
                  <Badge variant="success">{orders?.order_status}</Badge>
                </div>

                <div className="flex gap-1">
                  <div className="flex items-center gap-1">
                    <span className="text-xs text-secondary-foreground">
                      Placed
                    </span>
                    <span className="text-sm font-medium text-mono">
                      {formatDateShort(orders?.created_at)}
                    </span>
                  </div>

                  <Badge appearance="ghost" variant="destructive">
                    <BadgeDot className="size-1 bg-muted-foreground/60" />
                  </Badge>

                  <div className="flex items-center gap-1">
                    <span className="text-xs text-secondary-foreground">
                      Customer
                    </span>
                    <span className="text-sm font-medium text-mono">
                      {orders?.customer_name}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-2.5">
                <Button variant="ghost">Cancel Order</Button>
                <Button variant="outline">Notify Customer</Button>
              </div>
            </div>

            {/* <Card className="overflow-hidden my-[20px]">
              <CardContent className="p-0">
                <div className="flex items-center justify-between gap-5 flex-wrap px-5 bg-muted/70 py-2.5">
                  <div className="flex flex-col space-y-3 relative">
                    {Locations.map((loc, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 relative z-10"
                      >
                        {index !== Locations.length - 1 && (
                          <div className="absolute left-[2.2px] top-[15px] w-[2px] h-full bg-input rounded-full z-0"></div>
                        )}
                        <span className="size-1.5 rounded-full bg-gray-700 z-10 outline outline-gray-50 mt-[2px]"></span>
                        <span className="text-xs font-medium text-foreground">
                          {loc.address}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <span className="border-b border-border"></span>

                <div className="grid grid-cols-4 justify-start gap-[8px] p-5 pt-4">
                  {Statuses.map((s, i) => (
                    <div key={i}>
                      <Progress
                        value={s.value}
                        className="h-1.5 mb-2"
                        indicatorClassName="bg-[#0BC33F]"
                      />
                      <div className="flex items-center gap-1 text-xs font-medium">
                        <CheckIcon active={s.active} />
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            {/* shipping data */}
            {/* <Card>
              <CardHeader className="justify-start bg-muted/70 gap-9 h-auto py-5">
                Shipping Data
              </CardHeader>
              <CardContent className="flex justify-between">
                {ShippingInfo.map(({ label, value }, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <span className="text-xs font-normal text-secondary-foreground">
                      {label}
                    </span>
                    <span className="text-sm font-medium text-mono">
                      {value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card> */}

            {/* shipping log */}
            {/* <Card className="my-[20px]">
              <CardHeader className="justify-start bg-muted/70 gap-9 h-auto py-5">
                Shipping Log
              </CardHeader>
              <CardContent>
                <div className="flex flex-col relative">
                  {ShippingLog.map((shippingLog, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 relative z-10"
                    >
                      {index !== shippingLog.length - 1 && (
                        <div className="absolute left-[2.2px] top-0 w-[2px] h-full bg-input rounded-full z-0"></div>
                      )}
                      <span className="size-1.5 rounded-full bg-gray-700 z-10 outline-gray-50 outline-3 mt-[2px]"></span>
                      <div className="mb-[15px]">
                        <div className="text-sm font-medium">
                          {shippingLog.orderStatus}{" "}
                          <span className="text-sm font-[400] text-secondary-foreground">
                            {shippingLog.date}
                          </span>
                        </div>
                        <div className="text-sm font-[400] text-secondary-foreground">
                          {shippingLog.description}
                        </div>
                        {shippingLog.address && (
                          <div className="flex items-center gap-1.5 text-sm font-normal text-foreground">
                            <MapPin
                              size={16}
                              className="text-base text-muted-foreground"
                            />
                            {shippingLog.address}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card> */}

            <Card className="overflow-hidden my-[20px]">
              <CardContent className="p-0">
                <div className="flex items-center justify-between gap-5 flex-wrap px-5 bg-muted/70 py-2.5">
                  <div className="flex flex-col space-y-3 relative">
                    {Locations.map((loc, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 relative z-10"
                      >
                        {index !== Locations.length - 1 && (
                          <div className="absolute left-[2.2px] top-[15px] w-[2px] h-full bg-input rounded-full z-0"></div>
                        )}
                        <span className="size-1.5 rounded-full bg-gray-700 z-10 outline outline-gray-50 mt-[2px]"></span>
                        <span className="text-xs font-medium text-foreground">
                          {loc.address}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <span className="border-b border-border"></span>

                <div className="grid grid-cols-4 justify-start gap-[8px] p-5 pt-4">
                  {Statuses.map((s, i) => (
                    <div key={i}>
                      <Progress
                        value={s.value}
                        className="h-1.5 mb-2"
                        indicatorClassName="bg-[#0BC33F]"
                      />
                      <div className="flex items-center gap-1 text-xs font-medium">
                        <CheckIcon active={s.active} />
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* shipping data */}
            <Card>
              <CardHeader className="justify-start bg-muted/70 gap-9 h-auto py-5">
                Shipping Data
              </CardHeader>
              <CardContent className="flex justify-between">
                {ShippingInfo.map(({ label, value }, i) => (
                  <div key={i} className="flex flex-col gap-1.5">
                    <span className="text-xs font-normal text-secondary-foreground">
                      {label}
                    </span>
                    <span className="text-sm font-medium text-mono">
                      {value}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* shipping log */}
            <Card className="my-[20px]">
              <CardHeader className="justify-start bg-muted/70 gap-9 h-auto py-5">
                Shipping Log
              </CardHeader>
              <CardContent>
                <div className="flex flex-col relative">
                  {ShippingLog.map((shippingLog, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-2 relative z-10"
                    >
                      {index !== shippingLog.length - 1 && (
                        <div className="absolute left-[2.2px] top-0 w-[2px] h-full bg-input rounded-full z-0"></div>
                      )}
                      <span className="size-1.5 rounded-full bg-gray-700 z-10 outline-gray-50 outline-3 mt-[2px]"></span>
                      <div className="mb-[15px]">
                        <div className="text-sm font-medium">
                          {shippingLog.orderStatus}{" "}
                          <span className="text-sm font-[400] text-secondary-foreground">
                            {shippingLog.date}
                          </span>
                        </div>
                        <div className="text-sm font-[400] text-secondary-foreground">
                          {shippingLog.description}
                        </div>
                        {shippingLog.address && (
                          <div className="flex items-center gap-1.5 text-sm font-normal text-foreground">
                            <MapPin
                              size={16}
                              className="text-base text-muted-foreground"
                            />
                            {shippingLog.address}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollArea>
        </SheetBody>
      </SheetContent>
    </Sheet>
  );
};

export default ViewOrders;
