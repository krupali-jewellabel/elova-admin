// "use client";

// import React, { useState, useMemo } from "react";
// import { useOrderListColumns } from "../hooks/useOrderListColumns";
// import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
// import ViewOrders from "./ViewOrders";
// import { useCrudListWithPagination } from "@/hooks/useCrudListWithPagination";

// const AllOrders = () => {
//   const [openOrderDetailSheet, setOpenOrderDetailSheet] = useState(false);
//   const [pageInfo, setPageInfo] = useState({ pageIndex: 0, pageSize: 10 });
//   const [searchQuery, setSearchQuery] = useState("");

//   const {
//     list,
//     error,
//     editData,
//     setEditData,
//     fetchData,
//     fetchById,
//     pagination,
//   } = useCrudListWithPagination("/api/order-management");
//   const [selectedOrderId, setSelectedOrderId] = useState(editData?._id || null);
//   const columns = useOrderListColumns({
//     onEdit: (item) => {
//       console.log("Edit order:", item);
//     },
//     onView: async (item) => {
//       try {
//         setSelectedOrderId(item.id);

//         const data = await fetchById(item.id);
//         setEditData(data?.data);
//         setOpenOrderDetailSheet(true);
//       } catch (err) {}
//     },
//   });

//   const filterOptions = (data, query) => {
//     const searchLower = query.toLowerCase();

//     return data.filter((item) => {
//       const category = item?.category?.toLowerCase() || "";

//       return category.includes(searchLower);
//     });
//   };

//   if (error) return <div>Error: {error}</div>;

//   return (
//     <>
//       <ListWithCardToggle
//         title="Order List"
//         data={list}
//         columns={columns}
//         pagination={pageInfo}
//         filterFunction={filterOptions}
//         filterOptions={filterOptions}
//         onPaginationChange={(updater) => {
//           let newPageInfo =
//             typeof updater === "function" ? updater(pageInfo) : updater;

//           if (!newPageInfo) return;

//           setPageInfo(newPageInfo);
//           fetchData({
//             page: newPageInfo.pageIndex + 1,
//             pageSize: newPageInfo.pageSize,
//             search: searchQuery,
//           });
//         }}
//         pageCount={pagination?.totalPages || 1}
//         totalCount={pagination?.total || 0}
//         paginationLinks={pagination?.links}
//         serverSidePagination
//         searchQuery={searchQuery}
//         onSearchChange={(query) => {
//           setSearchQuery(query);
//           fetchData(query);
//         }}
//       />

//       <ViewOrders
//         open={openOrderDetailSheet}
//         onClose={() => setOpenOrderDetailSheet(false)}
//         orders={editData}
//         orderId={selectedOrderId}
//       />
//     </>
//   );
// };

// export default AllOrders;

"use client";

import React, { useState, useEffect, useRef } from "react";
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
      } catch (err) {
        console.error(err);
      }
    },
  });

  // debounce timer ref
  const searchDebounce = useRef(null);

  // initial load
  useEffect(() => {
    fetchData({
      page: pageInfo.pageIndex + 1,
      pageSize: pageInfo.pageSize,
      search: searchQuery,
    });
  }, []); // eslint-disable-line

  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <ListWithCardToggle
        title="Order List"
        data={list}
        columns={columns}
        pagination={pageInfo}
        filterFunction={() => {}} // server-side, not used
        onPaginationChange={(updater) => {
          let newPageInfo =
            typeof updater === "function" ? updater(pageInfo) : updater;

          if (!newPageInfo) return;

          setPageInfo(newPageInfo);

          // send object, not string
          console.log("fetchData pagination ->", {
            page: newPageInfo.pageIndex + 1,
            pageSize: newPageInfo.pageSize,
            search: searchQuery,
          });

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
          // keep UI state
          setSearchQuery(query);

          // debounce user typing
          if (searchDebounce.current) clearTimeout(searchDebounce.current);
          searchDebounce.current = setTimeout(() => {
            const payload = {
              page: 1,
              pageSize: pageInfo.pageSize,
              search: query,
            };
            console.log("fetchData search ->", payload);
            fetchData(payload);
            setPageInfo((p) => ({ ...p, pageIndex: 0 })); // reset UI pagination to first page
          }, 300); // 300ms debounce
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
