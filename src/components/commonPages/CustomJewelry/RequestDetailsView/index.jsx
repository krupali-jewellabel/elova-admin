import { Badge } from "@/components/common/ui/badge";
import { Button } from "@/components/common/ui/button";
import { Container } from "@/components/common/ui/container";
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from "@/components/common/ui/toolbar";
import Link from "next/link";
import React, { Fragment } from "react";

const RequestDetailsView = () => {
  const statistics = [
    {
      total: "Trial",
      description: "Status",
    },
    {
      total: "10,000",
      description: "Query runs",
    },
    {
      total: "Unlimited",
      description: "API calls",
    },
    {
      total: "$99.00",
      description: "Price",
    },
    {
      total: "17 Aug, 2024",
      description: "Next bill date",
    },
  ];

  const renderItem = (statistic, index) => {
    return (
      <div
        key={index}
        className="flex flex-col gap-1.5 px-2.75 py-2.25 border border-dashed border-input rounded-md"
      >
        <span className="text-mono text-sm leading-none font-medium">
          {statistic.total}
        </span>
        <span className="text-secondary-foreground text-xs">
          {statistic.description}
        </span>
      </div>
    );
  };
  return (
    <Fragment>
      {/* <PageNavbar /> */}
      {/* {settings?.layout === "demo1" && ( */}
      <Container>
        <Toolbar>
          <ToolbarHeading>
            <div className="flex items-center gap-2.5">
              <ToolbarPageTitle text={"Custom Request Details"} />
              <Badge size="md" className={"text-purple-500"}>
                Requested
              </Badge>
            </div>
            <div className="flex items-center gap-2.5 mt-3">
              <ToolbarDescription className="font-semibold">
                #CJ-20250604-0001
              </ToolbarDescription>
              <ToolbarDescription>Noira</ToolbarDescription>
              <ToolbarDescription>28 Jul, 20 25 10:02</ToolbarDescription>
            </div>
          </ToolbarHeading>
          <ToolbarActions>
            <Button variant="outline">
              <Link href="#">Forward to Production</Link>
            </Button>
            <Button variant="outline">
              <Link href="#">Covert to Product</Link>
            </Button>
            <Button>
              <Link href="#">Message</Link>
            </Button>
            <Button>&#8942;</Button>
          </ToolbarActions>
        </Toolbar>

        {/* )} */}
      </Container>
    </Fragment>
  );
};

export default RequestDetailsView;
