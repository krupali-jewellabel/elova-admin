"use client";

import React, { Fragment } from "react";
import PieChartCard from "@/components/common/ui/cards/PieChartCard";
import ReactApexChart from "react-apexcharts";
import MetricBreakdownCard from "@/components/common/ui/cards/MetricBreakdownCard";
import SalesOverview from "./salesoverview";
import TopPerformingProducts from "./top-performing-products";
import {
  ACTIVITIES,
  CUSTOM_JEWELRY_REQUEST,
  EXTERNAL_LINKS,
  TOP_PERFORMING_ITEMS_TABLE,
} from "./constant";
import GenericListCard from "@/components/common/ui/cards/GenericListCard";
import ActivityCard from "./ActivityCard";
import { DropdownMenu } from "@/components/common/ui/dropdown-menu";

const series = [22, 50, 15];
const labels = ["Pending", "Shipped", "Delivers"];
const colors = ["#22C55E", "#3B82F6", "#E5E7EB"];

const options = {
  chart: {
    type: "donut",
  },
  labels,
  colors,
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  stroke: {
    width: 4,
  },
  plotOptions: {
    pie: {
      expandOnClick: false,
      donut: {
        size: "60%",
      },
    },
  },
};

const ACTIVE_STORE_DATA = {
  chart: {
    Component: ReactApexChart,
    props: {
      options,
      series,
      type: "donut",
      width: 120,
      height: 120,
    },
  },
  items: [
    { label: "Pending", value: "22", color: "#22C55E" },
    { label: "Shipped", value: "50", color: "#3B82F6" },
    { label: "Delivers", value: "15", color: "#E5E7EB" },
  ],
};

const renderRow = (row, index) => {
  return (
    <Fragment key={index}>
      <div className="flex flex-wrap gap-2">
        <div className="flex items-center text-sm font-medium text-foreground gap-2 sm:gap-4 lg:gap-6">
          <span className="text-left sm:text-right">{row.brand}</span>
          <span className="text-left sm:text-right">{row.category}</span>
          <span className="flex justify-end gap-1">
            <div className="flex items-center gap-10">
              <img src="/images/customization/arrows (1).svg" alt="" />
            </div>
          </span>
        </div>
      </div>
      <div className="border-b border-dashed border-gray-200"></div>
    </Fragment>
  );
};

export const Overview = () => {
  return (
    <>
      <div className="grid grid-cols-4 gap-2 p-5">
        <div className="flex flex-col gap-2 w-72">
          <div className="flex items-center gap-[7px]">
            <span className="text-3xl font-semibold text-mono">$45,025</span>
          </div>
          <span className="text-sm font-medium text-secondary-foreground">
            Total Revenue
          </span>
        </div>
        <div className="w-full">
          <PieChartCard
            title="Total Orders Today"
            value="185"
            data={ACTIVE_STORE_DATA}
          />
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <img
              src="/images/customization/Ellipse 43.svg"
              className="w-[16px] h-[18px]"
            />
            <span className="text-3xl font-semibold text-mono">320</span>
          </div>
          <span className="text-sm font-medium text-secondary-foreground">
            Products Live
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center">
            <span className="text-3xl font-semibold text-mono">
              ₹3.5 Cr / ₹4Cr
            </span>
          </div>
          <span className="text-sm font-medium text-secondary-foreground">
            Budget Utilised
          </span>
        </div>
      </div>

      <SalesOverview />
      <div className="grid grid-cols-3 gap-5 mt-5">
        <TopPerformingProducts topItems={TOP_PERFORMING_ITEMS_TABLE} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6 lg:gap-[30px] items-start mt-5">
        <div className="w-full sm:col-span-2 lg:col-span-2">
          <ActivityCard
            activities={ACTIVITIES}
            footerLink={{
              href: "/public-profile/activity",
              label: "View All Activities",
            }}
          />
        </div>

        <div className="w-full">
          <MetricBreakdownCard
            total="15"
            isCurrency={false}
            title="Custom Jewelry Request"
            badgeValue="4"
            badgeProps={{
              variant: "success",
              appearance: "outline",
              size: "sm",
            }}
            items={CUSTOM_JEWELRY_REQUEST}
          />
        </div>

        <div className="w-full">
          <GenericListCard
            title="External Links"
            rows={EXTERNAL_LINKS}
            renderRow={renderRow}
            dropdown={<DropdownMenu />}
          />
        </div>
      </div>
    </>
  );
};

export default Overview;
