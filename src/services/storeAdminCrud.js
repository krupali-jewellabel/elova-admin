export const storeAdminCrud = (baseUrl) => {
  return {
    fetchAll: async (search = "") => {
      const params = new URLSearchParams();
      if (search) params.append("search", search);

      const res = await fetch(`${baseUrl}?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch data");
      return res.json();
    },

    fetchById: async (id) => {
      const res = await fetch(`${baseUrl}/${id}`);
      if (!res.ok) throw new Error("Failed to fetch data by ID");
      return await res.json();
    },

    create: async (payload) => {
      const res = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to create record");
      }
      return res.json();
    },

    update: async (id, payload) => {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to update record");
      }
      return res.json();
    },

    remove: async (id) => {
      const res = await fetch(`${baseUrl}/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to delete record");
      }
      return res.json();
    },

    toggleStatus: async (id, is_active) => {
      const res = await fetch(`${baseUrl}/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active }),
      });
      if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.message || "Failed to toggle status");
      }
      return res.json();
    },
  };
};
