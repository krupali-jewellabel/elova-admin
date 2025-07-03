"use client";

import { Badge } from "@/components/common/ui/badge";
import { Input } from "@/components/common/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/common/ui/select";
import {
  Mail,
  Clock,
  Paperclip,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
  User,
} from "lucide-react";
import { Button } from "@/components/common/ui/button";
import { Card } from "@/components/common/ui/cards/card";

export default function TicketList({
  tickets,
  selectedTicket,
  //   setSelectedTicket=() => {},
  setSelectedTicket = () => {},
  isLoading,
  loadTickets,
  error,
  searchQuery,
  setSearchQuery,
  departmentFilter,
  setDepartmentFilter,
  statusFilter,
  setStatusFilter,
  departments,
  currentUserId,
}) {
  //   const allTickets = [...dummyTickets, ...(tickets || [])];

  //   const seen = new Set();
  //   const allTickets = [...dummyTickets, ...(tickets || [])].filter((t) => {
  //     const uniqueKey = `${t.id}-${t.createdAt}`;
  //     if (seen.has(uniqueKey)) return false;
  //     seen.add(uniqueKey);
  //     return true;
  //   });

  const allTickets = [...(tickets || [])];

  const unassignedCount = allTickets.filter(
    (t) => !t.assignedTo && t.status !== "closed"
  ).length;

  const myTicketsCount = allTickets.filter(
    (t) => t.assignedTo?.id === currentUserId && t.status !== "closed"
  ).length;

  //   const [selectedTicket, setSelectedTicket] = useState(SUPPORT_MESSAGES[0]);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "urgent":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "open":
        return "destructive";
      case "in-progress":
        return "default";
      case "resolved":
        return "secondary";
      case "closed":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="w-1/2 border-r border-border flex flex-col">
      <div className="p-4 border-b border-border space-y-3 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-primary font-mono">Support Tickets</h2>
          <Button
            size="sm"
            onClick={loadTickets}
            disabled={isLoading}
            className="bg-primary"
          >
            <RefreshCw />
          </Button>
        </div>

        {error && (
          <div className="text-destructive flex items-center gap-2 text-sm">
            <AlertCircle className="h-4 w-4" />
            {error}
          </div>
        )}

        <div className="flex gap-2">
          <Badge
            variant={unassignedCount > 0 ? "destructive" : "outline"}
            className="cursor-pointer"
            onClick={() => setDepartmentFilter("unassigned")}
          >
            {unassignedCount} Unassigned
          </Badge>
          <Badge
            variant={myTicketsCount > 0 ? "default" : "outline"}
            className="cursor-pointer bg-primary text-white hover:bg-primary/90"
            onClick={() => setDepartmentFilter("mine")}
          >
            {myTicketsCount} My Tickets
          </Badge>
          <Badge variant="outline">{allTickets.length} Total</Badge>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tickets..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 ring-brand focus:ring-brand"
            />
          </div>

          <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All Departments" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="web-tech-support">
                Web - Tech Support
              </SelectItem>
              <SelectItem value="graphics-design-support">
                Grphics Design Supports
              </SelectItem>
              <SelectItem value="social-media-marketing-support">
                Social Media & Marketing Support
              </SelectItem>
              <SelectItem value="order-related-support">
                Order Related Support
              </SelectItem>
              <SelectItem value="account-support">Account Support</SelectItem>
              {(departments || []).map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="flex-1 overflow-y-auto m-2">
        {isLoading ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            Loading...
          </div>
        ) : allTickets.length === 0 ? (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <div className="text-center">
              <AlertCircle className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p>No tickets found</p>
              <p className="text-sm">Try adjusting filters</p>
            </div>
          </div>
        ) : (
          allTickets
            // .filter((ticket) => ticket?.id && ticket?.createdAt)
            .map((ticket) => (
              <div
                key={`${ticket.id}-${ticket.createdAt}`}
                onClick={() => setSelectedTicket(ticket)}
                className={`p-4 border-b border-border cursor-pointer hover:bg-accent/50 transition-colors ${
                  selectedTicket?.id === ticket.id
                    ? "bg-accent border-l-4 border-l-primary"
                    : ""
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-wrap text-xs">
                    <div
                      className={`w-2 h-2 rounded-full ${getPriorityColor(
                        ticket.priority
                      )}`}
                    />
                    <span className="font-medium">{ticket.id}</span>
                    <Badge variant={getStatusColor(ticket.status)}>
                      {ticket.status}
                    </Badge>
                    {!ticket.assignedTo && (
                      <Badge variant="outline" className="text-xs">
                        <User className="h-3 w-3 mr-1" />
                        Unassigned
                      </Badge>
                    )}
                    {ticket.assignmentHistory?.some(
                      (h) => h.isAutoAssigned
                    ) && (
                      <Badge variant="secondary" className="text-xs">
                        Auto-Assigned
                      </Badge>
                    )}
                    {ticket.attachments?.length > 0 && (
                      <Badge className="border border-primary">
                        <Paperclip className="h-3 w-3 mr-1" />
                        {ticket.attachments.length}
                      </Badge>
                    )}
                  </div>
                  {ticket.slaDeadline && (
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      SLA: {new Date(ticket.slaDeadline).toLocaleDateString()}
                    </div>
                  )}
                </div>

                <h3 className="font-medium mb-1">{ticket.subject}</h3>
                <div className="text-sm text-muted-foreground mb-2">
                  {ticket.store} • {ticket.department}
                </div>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>
                    Created by {ticket.createdBy.name} •{" "}
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </span>
                  {ticket.assignedTo && (
                    <div className="flex items-center gap-1">
                      <span>{ticket.assignedTo.name}</span>
                      {ticket.ccUsers?.length > 0 && (
                        <>
                          <Mail className="h-3 w-3" />
                          <span>CC: {ticket.ccUsers.length}</span>
                        </>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))
        )}
      </Card>
    </div>
  );
}
