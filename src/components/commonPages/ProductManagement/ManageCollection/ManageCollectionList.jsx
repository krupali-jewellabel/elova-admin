import { ListWithCardToggle } from "@/components/common/ListWithCardToggle";
import React from "react";

const ManageCollectionList = () => {
  return (
    <ListWithCardToggle
      title="Product Master List"
      data={filteredRows}
      columns={columns}
      pagination={pageInfo}
      onPaginationChange={setPageInfo}
      pageCount={pagination?.totalPages}
      totalCount={pagination?.total}
      serverSidePagination={true}
    />
  );
};

export default ManageCollectionList;
