"use client";

import { useState, useEffect, useMemo } from "react";
import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import { useCustomerData } from "./hooks/userCustomerData";
import { DataGridToolbar } from "@/components/common/DataGridToolBar";
import { useCrudApi } from "@/hooks/useCrudApi";

const AllCustomer = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const { fetchAll } = useCrudApi("/api/customer-data");

  const columns = useCustomerData();

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const result = await fetchAll();
        console.log("Customers API result:", result);

        const mappedCustomers = (result?.data?.data || []).map((c) => ({
          id: c.id,
          firstName: c.first_name,
          lastName: c.last_name,
          email: c.email,
        }));

        console.log("Mapped customers:", mappedCustomers);
        setCustomers(mappedCustomers);
      } catch (error) {
        console.error("Error fetching customers:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCustomers();
  }, [fetchAll]);

  const filteredData = useMemo(() => {
    if (!searchQuery) return customers;
    return customers.filter(
      (c) =>
        c.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, customers]);

  return (
    <ListWithCardToggle
      title="All Customers"
      data={filteredData}
      columns={columns}
      useFilteredData={null}
      loading={loading}
    />
  );
};

export default AllCustomer;
