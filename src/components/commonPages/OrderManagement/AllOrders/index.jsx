"use client";

import { useState } from "react";
import { useOrderListColumns } from "../hooks/useOrderListColumns";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { useCrudList } from "@/hooks/useCrudList";
import ViewOrders from "./ViewOrders";

const AllOrders = () => {
  const [orderListView, setOrderListView] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const { list, error, editData, setEditData, dialogOpen, setDialogOpen } =
    useCrudList("/api/order-management");

  const orders = Array.isArray(list?.data) ? list.data : [];

  const columns = useOrderListColumns({
    onEdit: (item) => {
      setEditData(item);
      setDialogOpen(true);
    },
    onView: (item) => {
      setSelectedOrderId(item.id);
      setOrderListView(true);
    },
  });

  const filterOptions = (data, query) => {
    if (!query) return data;
    const searchLower = query.toLowerCase();
    return data.filter((item) => {
      const orderId = item?.id?.toString().toLowerCase() || "";
      const productName = item?.items?.[0]?.product_name?.toLowerCase() || "";
      return orderId.includes(searchLower) || productName.includes(searchLower);
    });
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ListWithCardToggle
        title="Order List"
        data={orders}
        columns={columns}
        filterFunction={filterOptions}
      />

      <ViewOrders
        open={orderListView}
        onClose={() => setOrderListView(false)}
        orders={orders}
        orderId={selectedOrderId}
      />
    </>
  );
};

export default AllOrders;
