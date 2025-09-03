"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { Badge } from "@/Components/ui/badge"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/Components/ui/table"
import { Search, Download, Eye, Edit, MoreHorizontal, Package, Truck, CheckCircle, Clock, XCircle, RefreshCw, CreditCard,
} from "lucide-react"
import {  DropdownMenu,  DropdownMenuContent,  DropdownMenuItem,  DropdownMenuLabel,  DropdownMenuSeparator,  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"

export default function OrdersManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [dateFilter, setDateFilter] = useState("all")

  const orders = [
    // Pending and New Orders (Priority - shown at top)
    {
      id: "#3215",
      customer: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      date: "2024-01-16",
      status: "pending",
      total: "$89.99",
      items: 2,
      paymentStatus: "pending",
      priority: 1,
    },
    {
      id: "#3214",
      customer: "Alex Rodriguez",
      email: "alex.rodriguez@email.com",
      date: "2024-01-16",
      status: "in-progress",
      total: "$234.50",
      items: 4,
      paymentStatus: "paid",
      priority: 1,
    },
    {
      id: "#3213",
      customer: "Maria Garcia",
      email: "maria.garcia@email.com",
      date: "2024-01-15",
      status: "pending",
      total: "$156.75",
      items: 3,
      paymentStatus: "pending",
      priority: 1,
    },
    {
      id: "#3212",
      customer: "John Smith",
      email: "john.smith@email.com",
      date: "2024-01-15",
      status: "in-progress",
      total: "$299.99",
      items: 5,
      paymentStatus: "paid",
      priority: 1,
    },
    // Processing Orders
    {
      id: "#3211",
      customer: "Lisa Chen",
      email: "lisa.chen@email.com",
      date: "2024-01-15",
      status: "shipped",
      total: "$189.25",
      items: 2,
      paymentStatus: "paid",
      priority: 2,
    },
    {
      id: "#3210",
      customer: "Olivia Martin",
      email: "olivia.martin@email.com",
      date: "2024-01-15",
      status: "shipped",
      total: "$142.25",
      items: 3,
      paymentStatus: "paid",
      priority: 2,
    },
    // Completed Orders (shown at bottom)
    {
      id: "#3209",
      customer: "Jackson Lee",
      email: "jackson.lee@email.com",
      date: "2024-01-14",
      status: "completed",
      total: "$274.99",
      items: 5,
      paymentStatus: "paid",
      priority: 3,
    },
    {
      id: "#3208",
      customer: "Isabella Nguyen",
      email: "isabella.nguyen@email.com",
      date: "2024-01-14",
      status: "completed",
      total: "$399.99",
      items: 2,
      paymentStatus: "paid",
      priority: 3,
    },
    {
      id: "#3207",
      customer: "William Kim",
      email: "will@email.com",
      date: "2024-01-13",
      status: "cancelled",
      total: "$139.95",
      items: 4,
      paymentStatus: "refunded",
      priority: 3,
    },
    {
      id: "#3206",
      customer: "Sofia Davis",
      email: "sofia.davis@email.com",
      date: "2024-01-13",
      status: "completed",
      total: "$89.99",
      items: 1,
      paymentStatus: "paid",
      priority: 3,
    },
  ]

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />
      case "in-progress":
        return <RefreshCw className="h-4 w-4" />
      case "shipped":
        return <Truck className="h-4 w-4" />
      case "pending":
        return <Clock className="h-4 w-4" />
      case "cancelled":
        return <XCircle className="h-4 w-4" />
      case "refund":
        return <CreditCard className="h-4 w-4" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusVariant = (status) => {
    switch (status) {
      case "completed":
        return "default"
      case "in-progress":
        return "secondary"
      case "shipped":
        return "outline"
      case "pending":
        return "outline"
      case "cancelled":
        return "destructive"
      case "refund":
        return "secondary"
      default:
        return "outline"
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-50"
      case "in-progress":
        return "text-orange-600 bg-orange-50"
      case "shipped":
        return "text-blue-600 bg-blue-50"
      case "pending":
        return "text-yellow-600 bg-yellow-50"
      case "cancelled":
        return "text-red-600 bg-red-50"
      case "refund":
        return "text-purple-600 bg-purple-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const filteredOrders = orders
    .filter((order) => {
      const matchesSearch =
        order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.email.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = statusFilter === "all" || order.status === statusFilter

      const matchesDate = (() => {
        if (dateFilter === "all") return true
        const orderDate = new Date(order.date)
        const today = new Date()

        switch (dateFilter) {
          case "today":
            return orderDate.toDateString() === today.toDateString()
          case "week":
            const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
            return orderDate >= weekAgo
          case "month":
            const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)
            return orderDate >= monthAgo
          default:
            return true
        }
      })()

      return matchesSearch && matchesStatus && matchesDate
    })
    .sort((a, b) => a.priority - b.priority) // Sort by priority (pending/new first, completed last)

  const orderStats = [
    {
      title: "Total Orders",
      value: orders.length.toString(),
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "In Progress",
      value: orders.filter((o) => o.status === "in-progress").length.toString(),
      icon: RefreshCw,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Order Shipped",
      value: orders.filter((o) => o.status === "shipped").length.toString(),
      icon: Truck,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Order Cancel",
      value: orders.filter((o) => o.status === "cancelled").length.toString(),
      icon: XCircle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Payment Refund",
      value: orders.filter((o) => o.paymentStatus === "refunded").length.toString(),
      icon: CreditCard,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ]

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Orders Management</h1>
          <p className="text-muted-foreground">Manage and track all your orders with advanced filtering</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="btn-ghost-hover bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" style={{ backgroundColor: "#ff6c2f", borderColor: "#ff6c2f" }}>
            Create Order
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {orderStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                <div className={`p-2 rounded-full ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.title === "Total Orders" ? "All time" : "This month"}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle>Order Management Dashboard</CardTitle>
          <CardDescription>View and manage all customer orders with advanced filtering options</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search orders, customers, or order IDs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="shipped">Order Shipped</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Order Cancel</SelectItem>
                <SelectItem value="refund">Payment Refund</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id} className={order.priority === 1 ? "bg-yellow-50" : ""}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{order.customer}</div>
                        <div className="text-sm text-muted-foreground">{order.email}</div>
                      </div>
                    </TableCell>
                    <TableCell>
  {new Date(order.date).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })}
</TableCell>

                    <TableCell>
                      <Badge className={`flex items-center gap-1 w-fit ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status === "in-progress"
                          ? "In Progress"
                          : order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>{order.items} items</TableCell>
                    <TableCell className="font-medium">{order.total}</TableCell>
                    <TableCell>
                      <Badge  variant={order.paymentStatus === "paid" ? "default" : "outline"}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0 btn-hover-custom">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Order
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Mark as In Progress
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Truck className="mr-2 h-4 w-4" />
                            Mark as Shipped
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Mark as Completed
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <XCircle className="mr-2 h-4 w-4" />
                            Cancel Order
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-purple-600">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Process Refund
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
