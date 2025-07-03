"use client";

import { Fragment } from "react";
import Link from "next/link";
import { Badge } from "../badge";
import { Card, CardContent } from "./card";

export function TwoColCard({ items = [], limit = items.length }) {
  const renderItem = (item, index) => (
    <Card key={index}>
      <CardContent className="flex items-center flex-wrap justify-between gap-4.5 p-2 pe-5">
        <div className="flex items-center gap-3.5">
          <Card className="flex items-center justify-center bg-accent/50 h-[70px] w-[90px] shadow-none">
            <img
              src={item.image}
              className="cursor-pointer h-[70px]"
              alt={item.title}
            />
          </Card>

          <div className="flex flex-col gap-1">
            <Link
              href="#"
              className="hover:text-primary text-sm font-medium text-mono leading-5.5"
            >
              {item.title}
            </Link>

            <div className="flex items-center gap-1.5">
              <span className="text-xs font-normal text-secondary-foreground uppercase">
                sku:{" "}
                <span className="text-xs font-medium text-foreground">
                  {item.sku}
                </span>
              </span>

              {item.badge && (
                <Badge size="sm" variant="destructive" className="uppercase">
                  save 25%
                </Badge>
              )}
            </div>

            {item.metal && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-normal text-secondary-foreground uppercase">
                  Metal:{" "}
                  <span className="text-xs font-medium text-foreground">
                    {item.metal}
                  </span>
                </span>
              </div>
            )}

            {item.dimondCaret && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-normal text-secondary-foreground uppercase">
                  Diamond Carat:{" "}
                  <span className="text-xs font-medium text-foreground">
                    {item.dimondCaret}
                  </span>
                </span>
              </div>
            )}

            {item.Style && (
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-normal text-secondary-foreground uppercase">
                  Style:{" "}
                  <span className="text-xs font-medium text-foreground">
                    {item.Style}
                  </span>
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <span className="text-xs font-normal text-secondary-foreground text-end">
            1 x
          </span>
          <div className="flex items-center flex-wrap gap-1.5">
            {item.total && (
              <span className="text-sm font-normal text-secondary-foreground line-through">
                {item.total}
              </span>
            )}
            <span className="text-sm font-semibold text-mono">
              {item.label}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <Fragment>
      {items.slice(0, limit).map((item, index) => {
        return renderItem(item, index);
      })}
    </Fragment>
  );
}
