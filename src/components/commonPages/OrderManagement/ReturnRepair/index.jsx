"use client";

import React from 'react'
import { RETURN_REPAIR_DATA } from '../constant';
import { useFilteredStoreData } from '../../ProductManagement/hooks/useFilteredStoreData';
import { ListWithCardToggle } from '@/components/common/ListWithCardToggle';
import { useReturnRepairColumns } from '../hooks/useReturnRepairColumns';
import { DataGridToolbar } from '../../DataGridToolBar';

export const ReturnRepair = () => {
  const columns = useReturnRepairColumns();

  return (
    <>
      <ListWithCardToggle
        title="Return/ Repair Orders"
        data={RETURN_REPAIR_DATA}
        columns={columns}
        useFilteredData={useFilteredStoreData}
        ToolbarComponent={DataGridToolbar}
      />
    </>
  );
};

export default ReturnRepair