"use client";

import { useState } from "react";
import { useOrderListColumns } from "../hooks/useOrderListColumns";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { useCrudList } from "@/hooks/useCrudList";
import ViewOrders from "./ViewOrders";

const AllOrders = () => {
  const [orderListView, setOrderListView] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

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
  const finalFilteredData = orders.filter((item) => {
    debugger;
    if (
      statusFilter &&
      item.status?.toLowerCase() !== statusFilter.toLowerCase()
    ) {
      return false;
    }
    if (
      paymentFilter &&
      item.payment_status?.toLowerCase() !== paymentFilter.toLowerCase()
    ) {
      return false;
    }
    return true;
  });

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ListWithCardToggle
        title="Order List"
        data={finalFilteredData}
        columns={columns}
        filterFunction={(data, query) =>
          filterOptions(finalFilteredData, query)
        }
        filterDropdownProps={{
          status: {
            value: statusFilter,
            onChange: setStatusFilter,
            options: [
              { value: "pending", label: "Pending" },
              { value: "processing", label: "Processing" },
              { value: "shipped", label: "Shipped" },
              { value: "delivered", label: "Delivered" },
            ],
          },
          payment: {
            value: paymentFilter,
            onChange: setPaymentFilter,
            options: [
              { value: "paid", label: "Paid" },
              { value: "unpaid", label: "Unpaid" },
              { value: "cod", label: "Cash on Delivery" },
            ],
          },
        }}
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
