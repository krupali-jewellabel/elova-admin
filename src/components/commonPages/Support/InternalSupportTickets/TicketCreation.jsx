"use client";

import React, { useState, useRef } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/common/ui/sheet";
import { ScrollArea } from "@/components/common/ui/scroll-area";
import { Button } from "@/components/common/ui/button";
import { Input } from "@/components/common/ui/input";
import { Label } from "@/components/common/ui/label";
import { Textarea } from "@/components/common/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/common/ui/select";
import {
  AlertCircle,
  Plus,
  Upload,
  WifiOff,
  FileText,
  Video,
  Image,
  X,
} from "lucide-react";

function getFileIcon(type) {
  if (type.startsWith("image/")) return Image;
  if (type.startsWith("video/")) return Video;
  if (type.includes("pdf") || type.includes("document")) return FileText;
  return FileText;
}

function isImageFile(type) {
  return type.startsWith("image/");
}

function formatFileSize(size) {
  return `${(size / 1024).toFixed(1)} KB`;
}

export default function TicketCreationSheet({
  isOpen,
  onOpenChange,
  onCreate,
}) {
  const [newTicketData, setNewTicketData] = useState({
    subject: "",
    department: "",
    priority: "medium",
    store: "",
    description: "",
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState(null);
  const [isOnline, setIsOnline] = useState(true);
  const dbHealthy = true;
  const departments = [
    "Web - Tech Support",
    "Order Related Support",
    "Social Media Marketing",
  ];
  const fileInputRef = useRef();

  const handleFileSelect = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const removeFile = (index) => {
    const files = [...selectedFiles];
    files.splice(index, 1);
    setSelectedFiles(files);
  };

  const createTicket = () => {
    if (typeof onCreate !== "function") {
      console.error("onCreate is not a function", onCreate);
      return;
    }

    setIsCreating(true);

    const newTicket = {
      id: `ticket-${Date.now()}`,
      createdAt: new Date().toISOString(),
      ...newTicketData,
      attachments: selectedFiles,
      createdBy: { name: "Current User", role: "Admin" },
    };

    setTimeout(() => {
      onCreate(newTicket);
      setIsCreating(false);
      setNewTicketData({
        subject: "",
        department: "",
        priority: "medium",
        store: "",
        description: "",
      });
      setSelectedFiles([]);
      onOpenChange(false);
    }, 1500);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[90%] md:max-w-[70vw] lg:max-w-[50vw] xl:max-w-[30vw] inset-5 start-auto h-auto rounded-lg p-0">
        <SheetHeader className="border-b py-3.5 px-5 border-border">
          <SheetTitle className="text-brand flex items-center gap-2">
            Create Support Ticket
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className="flex-1 px-6">
          <div className="space-y-6 py-6">
            {/* You can re-enable these alerts if needed */}
            {/* {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )} */}

            {!isOnline && (
              <div className="text-sm text-red-500 flex items-center gap-2">
                <WifiOff className="h-4 w-4" />
                You're currently offline. Ticket will be saved when online.
              </div>
            )}

            <div className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={newTicketData.subject}
                  onChange={(e) =>
                    setNewTicketData({
                      ...newTicketData,
                      subject: e.target.value,
                    })
                  }
                  placeholder="Describe the issue briefly"
                  className="mt-2"
                  disabled={isCreating}
                />
              </div>

              <div>
                <Label htmlFor="department">Department *</Label>
                <Select
                  value={newTicketData.department}
                  onValueChange={(value) =>
                    setNewTicketData({ ...newTicketData, department: value })
                  }
                  disabled={isCreating}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="priority">Priority</Label>
                <Select
                  value={newTicketData.priority}
                  onValueChange={(value) =>
                    setNewTicketData({ ...newTicketData, priority: value })
                  }
                  disabled={isCreating}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="store">Store</Label>
                <Input
                  id="store"
                  value={newTicketData.store}
                  onChange={(e) =>
                    setNewTicketData({
                      ...newTicketData,
                      store: e.target.value,
                    })
                  }
                  placeholder="Store name"
                  className="mt-2"
                  disabled={isCreating}
                />
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newTicketData.description}
                  onChange={(e) =>
                    setNewTicketData({
                      ...newTicketData,
                      description: e.target.value,
                    })
                  }
                  placeholder="Provide detailed information about the issue"
                  rows={4}
                  className="mt-2"
                  disabled={isCreating}
                />
              </div>

              <div>
                <Label>Attachments</Label>
                <div className="space-y-4 mt-2">
                  <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                    <div className="space-y-3">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto" />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isCreating}
                      >
                        Choose Files
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        className="hidden"
                        accept="image/*,video/*,.pdf,.doc,.docx,.txt,.csv,.xlsx"
                        onChange={handleFileSelect}
                        disabled={isCreating}
                      />
                      <p className="text-sm text-muted-foreground mt-2">
                        or drag and drop files here
                      </p>
                    </div>
                  </div>

                  {selectedFiles.length > 0 && (
                    <div className="space-y-3">
                      <Label className="text-sm">
                        Selected Files ({selectedFiles.length})
                      </Label>
                      {selectedFiles.map((file, index) => {
                        const IconComponent = getFileIcon(file.type);
                        return (
                          <div
                            key={index}
                            className="flex items-center gap-3 p-3 border rounded-lg"
                          >
                            <IconComponent className="h-5 w-5 text-brand" />
                            <div className="flex-1">
                              <p className="truncate font-mono">{file.name}</p>
                              <p className="text-xs text-muted-foreground">
                                {formatFileSize(file.size)}
                              </p>
                            </div>
                            {isImageFile(file.type) && (
                              <div className="w-12 h-12 rounded-md overflow-hidden">
                                <img
                                  src={URL.createObjectURL(file)}
                                  alt="Preview"
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-destructive"
                              disabled={isCreating}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        <div className="px-6 py-4 border-t border-border bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              {!newTicketData.subject ||
              !newTicketData.description ||
              !newTicketData.department
                ? "Please fill in required fields"
                : isCreating
                ? "Creating ticket..."
                : dbHealthy
                ? "Ready to create ticket"
                : "Will create when database is available"}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isCreating}
              >
                Cancel
              </Button>
              <Button
                onClick={createTicket}
                disabled={
                  !newTicketData.subject ||
                  !newTicketData.description ||
                  !newTicketData.department ||
                  isCreating
                }
                className="gradient-brand text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                {isCreating ? "Creating..." : "Create Ticket"}
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
