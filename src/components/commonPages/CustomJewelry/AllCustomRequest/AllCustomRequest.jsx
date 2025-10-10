"use client";

import React, { useState } from "react";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import useCustomRequestColumn from "../useCustomRequestColumn";
import { useCrudList } from "@/hooks/useCrudList";
import RequestDetailsSheet from "./RequestDetailsModel";

const AllCustomRequest = () => {
  const { list } = useCrudList("/api/custom-request");

  const [sheetOpen, setSheetOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleView = (item) => {
    setSelectedRequest(item);
    setSheetOpen(true);
  };

  const columns = useCustomRequestColumn({ onView: handleView });

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <ListWithCardToggle
        title="All Custom Requests"
        data={list}
        columns={columns}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filterFunction={(data, query) => {
          if (!query) return data;
          const q = query.toLowerCase();
          return data.filter((item) =>
            String(item.category?.name || "")
              .toLowerCase()
              .includes(q)
          );
        }}
        createBtn={null}
      />

      <RequestDetailsSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        requestDetails={selectedRequest}
      />
    </>
  );
};

export default AllCustomRequest;
