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

                        <div className="text-xs font-normal text-secondary-foreground uppercase">
                            ID:{" "}
                            <span className="text-xs font-medium text-foreground">
                                {item.id}
                            </span>
                        </div>

                        {item.style && (
                            <div className="text-xs text-secondary-foreground">
                                Style: <span className="text-foreground font-medium">{item.style}</span>
                            </div>
                        )}

                        {item.collection && (
                            <div className="text-xs text-secondary-foreground">
                                Collection: <span className="text-foreground font-medium">{item.collection}</span>
                            </div>
                        )}

                        {item.category && (
                            <div className="text-xs text-secondary-foreground">
                                Category: <span className="text-foreground font-medium">{item.category}</span>
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>

    );
    return (
        <Fragment>
            {items.slice(0, limit).map((item, index) => renderItem(item, index))}
        </Fragment>
    );
}
