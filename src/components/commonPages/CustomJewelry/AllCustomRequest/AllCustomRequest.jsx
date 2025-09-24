"use client";

import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import React, { useState, useMemo } from "react";
import useCustomRequestColumn from "../useCustomRequestColumn";
import { DataGridToolbar } from "@/components/common/DataGridToolBar";
import { useCrudList } from "@/hooks/useCrudList";

const AllCustomRequest = () => {
  const { list } = useCrudList("/api/custom-request");
  const columns = useCustomRequestColumn();

  const [searchQuery, setSearchQuery] = useState("");

  const filteredList = useMemo(() => {
    if (!searchQuery) return list;

    return list?.filter((item) =>
      String(item.category?.name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, list]);

  return (
    <ListWithCardToggle
      title="All Custom Requests"
      data={filteredList}
      columns={columns}
    />
  );
};

export default AllCustomRequest;
