"use client";

import { useState } from "react";
import { useOrderListColumns } from "../hooks/useOrderListColumns";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import ViewOrders from "./ViewOrders";

import { ORDERS_LIST_DATA } from "../constant";
import { DataGridToolbar } from "../../DataGridToolBar";
import { useFilteredStoreData } from "../../ProductManagement/hooks/useFilteredStoreData";

const AllOrders = () => {
  const [orderListView, setOrderListView] = useState(false);
  const handleView = () => {
    setOrderListView(!orderListView);
  };
  const columns = useOrderListColumns({ orderListView, handleView });

  return (
    <>
      <ListWithCardToggle
        title="Order List"
        data={ORDERS_LIST_DATA}
        columns={columns}
        useFilteredData={useFilteredStoreData}
        ToolbarComponent={DataGridToolbar}
      />
      {orderListView && (
        <ViewOrders orderListView={orderListView} onCloseSheet={handleView} />
      )}
    </>
  );
};

export default AllOrders;
