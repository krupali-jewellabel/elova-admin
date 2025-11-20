"use client";

import React, { useState, useEffect, useRef } from "react";
import { useOrderListColumns } from "../hooks/useOrderListColumns";
import ViewOrders from "./ViewOrders";
import { useCrudListWithPagination } from "@/hooks/useCrudListWithPagination";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";

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
      } catch (err) {
        console.error(err);
      }
    },
  });

  const searchDebounce = useRef(null);

  useEffect(() => {
    fetchData({
      page: pageInfo.pageIndex + 1,
      pageSize: pageInfo.pageSize,
      search: searchQuery,
    });
  }, []);

  const filterOptions = (data, query) => {
    debugger;
    const searchLower = query.toLowerCase();

    return data.filter((item) => {
      const category = item?.category?.toLowerCase() || "";

      return category?.includes(searchLower);
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

          if (searchDebounce.current) clearTimeout(searchDebounce.current);
          searchDebounce.current = setTimeout(() => {
            const payload = {
              page: 1,
              pageSize: pageInfo.pageSize,
              search: query,
            };
            fetchData(payload);
            setPageInfo((p) => ({ ...p, pageIndex: 0 }));
          }, 300);
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
