export const ORDERS_LIST_DATA = [
  {
    orderId: "A1234567",
    image: "/images/brand-logo/disqus.png",
    productName: "Ring",
    storeName: "Niora",
    orderDate: "October 1, 2023",
    quantity: 1,
    totalValue: "₹85,000",
    paymentStatus: "paid",
    fulfilmentStatus: "July 20, 2023",
    orderChannel: "Website",
  },
];

export const RETURN_REPAIR_DATA = [
  {
    returnId: "A1234567",
    relatedOrderId: "A1234567",
    storeName: "Niora",
    reason: "Damaged",
    image: "/images/products/product-ring.png",
    product: "Ring",
    charge: "₹0",
    returnStatus: {
      label: "Approved",
      variant: "success",
    },
    resolutionType: "Replace",
    productCondition: "New",
    orderChannel: "Website",
  },
];