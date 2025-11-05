// "use client";

// import { useState } from "react";
// import { useOrderListColumns } from "../hooks/useOrderListColumns";
// import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
// import { useCrudList } from "@/hooks/useCrudList";
// import ViewOrders from "./ViewOrders";

// const AllOrders = () => {
//   const [orderListView, setOrderListView] = useState(false);
//   const [selectedOrderId, setSelectedOrderId] = useState(null);

//   const { list, error, editData, setEditData, dialogOpen, setDialogOpen } =
//     useCrudList("/api/order-management");
//   console.log("list", list);

//   const columns = useOrderListColumns({
//     onEdit: (item) => {
//       setEditData(item);
//       setDialogOpen(true);
//     },
//     onView: (item) => {
//       setSelectedOrderId(item.id);
//       setOrderListView(true);
//     },
//   });

//   const filterOptions = (data, query) => {
//     debugger;
//     if (!query) return data;
//     const searchLower = query.toLowerCase();
//     return data.filter((item) => {
//       const orderId = item?.id?.toString().toLowerCase() || "";
//       const payment_status = item?.payment_status?.toLowerCase() || "";
//       const order_status = item?.order_status?.toLowerCase() || "";
//       return (
//         orderId.includes(searchLower) ||
//         payment_status.includes(searchLower) ||
//         order_status.includes(searchLower)
//       );
//     });
//   };

//   if (error) return <div>Error: {error}</div>;

//   return (
//     <>
//       <ListWithCardToggle
//         title="Order List"
//         data={list}
//         columns={columns}
//         filterFunction={filterOptions}
//       />

//       <ViewOrders
//         open={orderListView}
//         onClose={() => setOrderListView(false)}
//         orders={list}
//         orderId={selectedOrderId}
//       />
//     </>
//   );
// };

// export default AllOrders;

"use client";

import React, { useState, useMemo } from "react";
import { useOrderListColumns } from "../hooks/useOrderListColumns";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { useCrudList } from "@/hooks/useCrudList";
import ViewOrders from "./ViewOrders";

const AllOrders = () => {
  const [orderListView, setOrderListView] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");

  const [pageInfo, setPageInfo] = useState({ pageIndex: 0, pageSize: 10 });
  const [searchQuery, setSearchQuery] = useState("");

  const { list = [], error } = useCrudList("/api/order-management");

  const columns = useOrderListColumns({
    onEdit: (item) => {
      console.log("Edit order:", item);
    },
    onView: (item) => {
      setSelectedOrderId(item.id);
      setOrderListView(true);
    },
  });

  const filteredData = useMemo(() => {
    if (!searchQuery) return list;
    const query = searchQuery.toLowerCase();

    return list.filter((item) => {
      const orderId = item?.id?.toString().toLowerCase() || "";
      const payment_status = item?.payment_status?.toLowerCase() || "";
      const order_status = item?.order_status?.toLowerCase() || "";
      return (
        orderId.includes(query) ||
        payment_status.includes(query) ||
        order_status.includes(query)
      );
    });
  }, [list, searchQuery]);

  const paginatedData = useMemo(() => {
    const start = pageInfo.pageIndex * pageInfo.pageSize;
    const end = start + pageInfo.pageSize;
    return filteredData.slice(start, end);
  }, [filteredData, pageInfo]);

  const totalPages = Math.ceil(filteredData.length / pageInfo.pageSize);

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ListWithCardToggle
        title="Order List"
        description="Manage and view all orders"
        data={paginatedData}
        columns={columns}
        pagination={pageInfo}
        onPaginationChange={setPageInfo}
        pageCount={totalPages}
        totalCount={filteredData.length}
        search={{
          value: searchQuery,
          onChange: (e) => {
            setSearchQuery(e.target.value);
            setPageInfo({ ...pageInfo, pageIndex: 0 });
          },
          placeholder: "Search by order ID, status, or payment...",
        }}
      />

      <ViewOrders
        open={orderListView}
        onClose={() => setOrderListView(false)}
        orders={list}
        orderId={selectedOrderId}
      />
    </>
  );
};

export default AllOrders;
