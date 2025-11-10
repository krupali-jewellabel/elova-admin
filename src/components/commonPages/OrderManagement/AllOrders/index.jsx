"use client";

import React, { useState, useMemo } from "react";
import { useOrderListColumns } from "../hooks/useOrderListColumns";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import ViewOrders from "./ViewOrders";
import { useCrudListWithPagination } from "@/hooks/useCrudListWithPagination";

const AllOrders = () => {
  const [openOrderDetailSheet, setOpenOrderDetailSheet] = useState(false);
  const [pageInfo, setPageInfo] = useState({ pageIndex: 0, pageSize: 10 });
  const [searchQuery, setSearchQuery] = useState("");

  const {
    list,
    error,
    editData,
    setEditData,
    fetchData,
    fetchById,
    pagination,
  } = useCrudListWithPagination("/api/order-management");
  const [selectedOrderId, setSelectedOrderId] = useState(editData?._id || null);
  const columns = useOrderListColumns({
    onEdit: (item) => {
      console.log("Edit order:", item);
    },
    onView: async (item) => {
      try {
        setSelectedOrderId(item.id);
        const data = await fetchById(item.id);
        setEditData(data?.data);
        setOpenOrderDetailSheet(true);
      } catch (err) {}
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

  const filterOptions = (data, query) => {
    const searchLower = query.toLowerCase();

    return data.filter((item) => {
      const category = item?.category?.toLowerCase() || "";

      return category.includes(searchLower);
    });
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ListWithCardToggle
        title="Order List"
        data={list}
        columns={columns}
        pagination={pageInfo}
        filterFunction={filterOptions}
        filterOptions={filterOptions}
        onPaginationChange={(updater) => {
          let newPageInfo =
            typeof updater === "function" ? updater(pageInfo) : updater;

          if (!newPageInfo) return;

          setPageInfo(newPageInfo);
          fetchData({
            page: newPageInfo.pageIndex + 1,
            pageSize: newPageInfo.pageSize,
            search: searchQuery,
          });
        }}
        pageCount={pagination?.totalPages || 1}
        totalCount={pagination?.total || 0}
        paginationLinks={pagination?.links}
        serverSidePagination
        searchQuery={searchQuery}
        onSearchChange={(query) => {
          setSearchQuery(query);
          fetchData(query);
        }}
      />

      <ViewOrders
        open={openOrderDetailSheet}
        onClose={() => setOpenOrderDetailSheet(false)}
        orders={editData}
        orderId={selectedOrderId}
      />
    </>
  );
};

export default AllOrders;
