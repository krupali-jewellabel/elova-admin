import { createCrudClient } from "@/services/storeAdminCrud";
import { useCallback } from "react";

export const useCrudApi = (baseUrl) => {
  const api = createCrudClient(baseUrl);

  return {
    fetchAll: useCallback(api.fetchAll, []),
    create: useCallback(api.create, []),
    update: useCallback(api.update, []),
    remove: useCallback(api.remove, []),
    toggleStatus: useCallback(api.toggleStatus, []),
  };
};
