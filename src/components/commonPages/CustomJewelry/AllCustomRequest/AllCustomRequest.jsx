"use client";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import React from "react";
import { CUSTOM_REQUEST_DATA } from "../constant";
import useCustomRequestColumn from "../useCustomRequestColumn";
import { useFilteredStoreData } from "../../ProductManagement/hooks/useFilteredStoreData";
import { DataGridToolbar } from "@/components/common/DataGridToolBar";

const AllCustomRequest = () => {
  const columns = useCustomRequestColumn();
  return (
    <ListWithCardToggle
      title="All Custom Requests"
      data={CUSTOM_REQUEST_DATA}
      columns={columns}
      useFilteredData={useFilteredStoreData}
      ToolbarComponent={DataGridToolbar}
    />
  );
};

export default AllCustomRequest;
