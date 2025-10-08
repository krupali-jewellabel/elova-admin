"use client";

import React, { useState } from "react";
import { Button } from "@/components/common/ui/button";
import {
  Toolbar,
  ToolbarActions,
  ToolbarDescription,
  ToolbarHeading,
  ToolbarPageTitle,
} from "@/components/common/ui/toolbar";
import { Plus } from "lucide-react";
import { CategoriesCard } from "./CategoriesCard";
import { FAQ_CATEGORIES_DATA } from "../../constant";
import FAQCategoriesModel from "./FAQCategoriesModel";
import ConfirmDialog from "@/components/common/ui/ConfirmDialog";

const FAQCategories = () => {
  const [list, setList] = useState(FAQ_CATEGORIES_DATA);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editData, setEditData] = useState(null);

  // For confirmation dialog
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Add category
  const handleAddClick = () => {
    setEditData(null);
    setDialogOpen(true);
  };

  // Edit category
  const handleEditClick = (id) => {
    const category = list.find((item) => item.id === id);
    setEditData(category);
    setDialogOpen(true);
  };

  // Ask before delete
  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  // Confirm deletion
  const handleDelete = () => {
    if (deleteId) {
      setList((prev) => prev.filter((cat) => cat.id !== deleteId));
    }
    setConfirmOpen(false);
    setDeleteId(null);
  };

  // Handle add/edit success
  const handleSuccess = (newCategory) => {
    if (editData) {
      // Update
      setList((prev) =>
        prev.map((cat) =>
          cat.id === editData.id
            ? {
                ...cat,
                faq_category_title: newCategory.faq_category_title,
                headtitle: newCategory.headtitle,
                description: newCategory.description,
              }
            : cat
        )
      );
    } else {
      // Add
      const newItem = {
        id: Date.now(),
        ...newCategory,
        is_active: true,
      };
      setList((prev) => [...prev, newItem]);
    }
  };

  return (
    <div>
      <Toolbar>
        <ToolbarHeading>
          <ToolbarPageTitle
            text="FAQ Categories"
            className="font-semibold !text-foreground text-lg"
          />
          <ToolbarDescription className="mt-1 text-sm">
            Organize FAQs by category with page-specific assignments
          </ToolbarDescription>
        </ToolbarHeading>
        <ToolbarActions>
          <Button onClick={handleAddClick}>
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </ToolbarActions>
      </Toolbar>

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {loading ? (
          <p>Loading...</p>
        ) : list.length > 0 ? (
          list.map((cat) => (
            <CategoriesCard
              key={cat.id}
              data={cat}
              handleEditClick={() => handleEditClick(cat.id)}
              handleDeleteClick={() => handleDeleteClick(cat.id)}
            />
          ))
        ) : (
          <p>No categories found</p>
        )}
      </div>

      {/* Add/Edit Modal */}
      <FAQCategoriesModel
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSuccess={(data) => {
          handleSuccess(data);
          setDialogOpen(false);
        }}
        editData={editData}
      />

      {/* Confirm Delete Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={handleDelete}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
      />
    </div>
  );
};

export default FAQCategories;
