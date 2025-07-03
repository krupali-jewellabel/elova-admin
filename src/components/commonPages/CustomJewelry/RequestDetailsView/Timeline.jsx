"use client"

import { Card, CardContent, CardTitle } from "@/components/common/ui/cards/card";
import {
    Share2,
    FileText,
    FileUp,
    FileEdit,
    CheckCircle2,
    CreditCard,
    FileCheck,
    ThumbsUp,
    Package
} from 'lucide-react';


export function TimelineItem({ line, icon: Icon, children }) {
    return (
        <div className="flex items-start relative pb-8 last:pb-0">
            {line && (
                <div className="absolute w-px h-full bg-gray-200 left-4 top-8"></div>
            )}
            <div className="flex items-center justify-center shrink-0 rounded-full bg-white border border-gray-200 w-8 h-8 z-10">
                <Icon size={16} className="text-gray-600" />
            </div>
            <div className="flex-1 ml-4">
                {children}
            </div>
        </div>
    );
}

export const Timeline = () => {
    return (
        <Card className={"w-full mt-5 mb-5"}>
            <div className="max-w-4xl">
                <CardContent className="lg:py-7.5">
                    <CardTitle className="mb-5">Timeline</CardTitle>
                </CardContent>
            </div>            
            <div className="p-6 space-y-0">
                <TimelineItem icon={Share2} line={true}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Requested</span>
                            <span className="text-gray-500">28 Jul, 2025 10:02</span>
                        </div>
                        <span className="text-sm text-gray-600">Request Received</span>
                    </div>
                </TimelineItem>

                <TimelineItem icon={FileText} line={true}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Notes added</span>
                            <span className="text-gray-500">28 Jul, 2025 11:02</span>
                        </div>
                        <span className="text-sm text-gray-600">Items being picked from inventory</span>
                    </div>
                </TimelineItem>

                <TimelineItem icon={FileUp} line={true}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Quotation uploaded</span>
                            <span className="text-gray-500">28 Jul, 2025 12:27</span>
                        </div>
                        <span className="text-sm text-gray-600">Shipment information received by seller</span>
                    </div>
                </TimelineItem>

                <TimelineItem icon={FileEdit} line={true}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Quotation Revised</span>
                            <span className="text-gray-500">28 Jul, 2025 14:27</span>
                        </div>
                        <span className="text-sm text-gray-600">Package handed off to carrier</span>
                    </div>
                </TimelineItem>

                <TimelineItem icon={CheckCircle2} line={true}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Quotation Final</span>
                            <span className="text-gray-500">28 Jul, 2025 14:27</span>
                        </div>
                        <span className="text-sm text-gray-600">Package handed off to carrier</span>
                    </div>
                </TimelineItem>

                <TimelineItem icon={CreditCard} line={true}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Payment Success</span>
                            <span className="text-gray-500">28 Jul, 2025 14:27</span>
                        </div>
                        <span className="text-sm text-gray-600">Package handed off to carrier</span>
                    </div>
                </TimelineItem>

                <TimelineItem icon={FileCheck} line={true}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">CAD file shared</span>
                            <span className="text-gray-500">28 Jul, 2025 14:27</span>
                        </div>
                        <span className="text-sm text-gray-600">Package handed off to carrier</span>
                    </div>
                </TimelineItem>

                <TimelineItem icon={ThumbsUp} line={true}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">CAD file Approved</span>
                            <span className="text-gray-500">28 Jul, 2025 14:27</span>
                        </div>
                        <span className="text-sm text-gray-600">Package handed off to carrier</span>
                    </div>
                </TimelineItem>

                <TimelineItem icon={Package} line={false}>
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                            <span className="font-medium">Converted to product</span>
                            <span className="text-gray-500">28 Jul, 2025 14:27</span>
                        </div>
                        <span className="text-sm text-gray-600">Package handed off to carrier</span>
                    </div>
                </TimelineItem>
            </div>
        </Card>
    )
}

export default Timeline
