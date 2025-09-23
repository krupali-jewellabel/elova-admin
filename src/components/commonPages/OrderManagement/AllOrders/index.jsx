// "use client";

// import { useState, useEffect } from "react";
// import { useOrderListColumns } from "../hooks/useOrderListColumns";
// import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
// import ViewOrders from "./ViewOrders";
// import { DataGridToolbar } from "../../DataGridToolBar";
// import { useCrudApi } from "@/hooks/useCrudApi";

// const AllOrders = () => {
//   const [orderListView, setOrderListView] = useState(false);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const { fetchAll } = useCrudApi("/api/order-management");

//   const [selectedOrderId, setSelectedOrderId] = useState(null);

//   const handleView = (id) => {
//     setSelectedOrderId(id);
//     setOrderListView(true);
//   };

//   // const handleView = () => {
//   //   setOrderListView(!orderListView);
//   // };

//   const columns = useOrderListColumns({ orderListView, handleView });

//   useEffect(() => {
//     const loadOrders = async () => {
//       try {
//         const result = await fetchAll();
//         console.log("Orders API result:", result);

//         const mappedOrders = (result?.data?.data || []).map((o) => {
//           const firstItem = o.items?.[0] || {};
//           return {
//             id: o.id,
//             orderId: o.id,
//             image: firstItem.image ?? "/images/products/1.png",
//             productName:
//               firstItem.product_name ??
//               `Product ${firstItem.product_id ?? "-"}`,
//             orderDate: o.created_at
//               ? new Date(o.created_at).toLocaleDateString()
//               : "-",
//             quantity: firstItem.quantity ?? 1,
//             totalValue: o.total ?? "-",
//             paymentStatus: o.payment_status,
//             fulfilmentStatus: o.order_status,
//             orderChannel: o.payment_method ?? "Online",
//           };
//         });

//         console.log("Mapped orders:", mappedOrders);

//         setOrders(mappedOrders);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadOrders();
//   }, [fetchAll]);

//   return (
//     <>
//       <ListWithCardToggle
//         title="Order List"
//         data={orders}
//         columns={columns}
//         // useFilteredData={useFilteredStoreData}
//         ToolbarComponent={DataGridToolbar}
//         loading={loading}
//       />

//       {orderListView && (
//         <ViewOrders orderListView={orderListView} onCloseSheet={handleView} />
//       )}
//     </>
//   );
// };

// export default AllOrders;

"use client";

import { useState, useEffect } from "react";
import { useOrderListColumns } from "../hooks/useOrderListColumns";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";

import { DataGridToolbar } from "../../DataGridToolBar";
import { useCrudApi } from "@/hooks/useCrudApi";
import { ContentLoader } from "@/components/common/ui/Loader/content-loader";
import { useCrudList } from "@/hooks/useCrudList";
import ViewOrders from "./ViewOrders";

const AllOrders = () => {
  const [orderListView, setOrderListView] = useState(false);
  const {
    list,
    loading,
    error,
    editData,
    setEditData,
    dialogOpen,
    setDialogOpen,
    fetchData,
  } = useCrudList("/api/order-management");
  const [orders, setOrders] = useState([]);
  // const [loading, setLoading] = useState(true);

  // const { fetchAll } = useCrudApi("/api/order-management");
  console.log("list", list);
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const columns = useOrderListColumns({
    onEdit: (item) => {
      setEditData(item);
      setDialogOpen(true);
    },
    onView: (item) => {
      setOrderListView(true);
      setSelectedOrderId(item);
    },
  });

  const filterOptions = (data, query) => {
    if (!query) return data;

    const searchLower = query.toLowerCase();

    return data.filter((item) => {
      const orderId = item?.id?.toString().toLowerCase() || "";
      const productName = item?.items?.[0]?.product?.title?.toLowerCase() || "";

      return orderId.includes(searchLower) || productName.includes(searchLower);
    });
  };

  if (error) return <div>Error: {error}</div>;
  // const columns = useOrderListColumns({ orderListView, handleView });

  // useEffect(() => {
  //   const loadOrders = async () => {
  //     try {
  //       const result = await fetchAll();
  //       console.log("Orders API result:", result);

  //       const mappedOrders = (result?.data?.data || []).map((o) => {
  //         const firstItem = o.items?.[0] || {};
  //         return {
  //           id: o.id,
  //           orderId: o.id,
  //           image: firstItem.image ?? "/images/products/1.png",
  //           productName:
  //             firstItem.product_name ??
  //             `Product ${firstItem.product_id ?? "-"}`,
  //           orderDate: o.created_at
  //             ? new Date(o.created_at).toLocaleDateString()
  //             : "-",
  //           quantity: firstItem.quantity ?? 1,
  //           totalValue: o.total ?? "-",
  //           paymentStatus: o.payment_status,
  //           fulfilmentStatus: o.order_status,
  //           orderChannel: o.payment_method ?? "Online",
  //         };
  //       });

  //       console.log("Mapped orders:", mappedOrders);

  //       setOrders(mappedOrders);
  //     } catch (error) {
  //       console.error("Error fetching orders:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   loadOrders();
  // }, [fetchAll]);

  return (
    <>
      <ListWithCardToggle
        title="Order List"
        data={Array.isArray(list?.data) ? list.data : []}
        columns={columns}
        filterFunction={filterOptions}
        // ToolbarComponent={DataGridToolbar}
      />

      {/* {orderListView && ( */}
      <ViewOrders
        open={orderListView}
        onClose={() => setOrderListView(!orderListView)}
        orderDetails={Array.isArray(editData) ? editData : []}
      />
      {/* )} */}
    </>
  );
};

export default AllOrders;
