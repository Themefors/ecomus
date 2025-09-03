"use client"

import { useState } from "react"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  Copy,
  Calendar,
  Percent,
  Users,
  TrendingUp,
  Eye,
  EyeOff,
} from "lucide-react"
import { Button } from "@/Components/ui/button"
import { Input } from "@/Components/ui/input"
import { Badge } from "@/Components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/Components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/Components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog"
import { Label } from "@/Components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select"

export default function DiscountManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    type: "percentage",
    value: "",
    description: "",
    expiryDate: "",
    usageLimit: "",
    minimumOrder: "",
  })

  // Sample coupon data
  const coupons = [
    {
      id: 1,
      code: "WELCOME20",
      type: "percentage",
      value: 20,
      description: "Welcome discount for new customers",
      status: "active",
      used: 45,
      limit: 100,
      expiryDate: "2024-12-31",
      minimumOrder: 50,
      createdDate: "2024-01-15",
    },
    {
      id: 2,
      code: "SAVE50",
      type: "fixed",
      value: 50,
      description: "Fixed $50 off on orders above $200",
      status: "active",
      used: 23,
      limit: 50,
      expiryDate: "2024-11-30",
      minimumOrder: 200,
      createdDate: "2024-02-01",
    },
    {
      id: 3,
      code: "SUMMER15",
      type: "percentage",
      value: 15,
      description: "Summer sale discount",
      status: "expired",
      used: 89,
      limit: 100,
      expiryDate: "2024-08-31",
      minimumOrder: 30,
      createdDate: "2024-06-01",
    },
    {
      id: 4,
      code: "FLASH25",
      type: "percentage",
      value: 25,
      description: "Flash sale - limited time",
      status: "inactive",
      used: 12,
      limit: 200,
      expiryDate: "2024-10-15",
      minimumOrder: 75,
      createdDate: "2024-03-10",
    },
  ]

  const stats = [
    {
      title: "Total Coupons",
      value: "24",
      change: "+3 this month",
      icon: Percent,
      color: "text-blue-600",
    },
    {
      title: "Active Coupons",
      value: "18",
      change: "+2 this week",
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      title: "Total Redemptions",
      value: "1,247",
      change: "+12% from last month",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Revenue Saved",
      value: "$8,450",
      change: "This month",
      icon: Calendar,
      color: "text-orange-600",
    },
  ]

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { label: "Active", className: "bg-green-100 text-green-800" },
      inactive: { label: "Inactive", className: "bg-gray-100 text-gray-800" },
      expired: { label: "Expired", className: "bg-red-100 text-red-800" },
    }
    const config = statusConfig[status] || statusConfig.inactive
    return <Badge className={config.className}>{config.label}</Badge>
  }

  const generateCouponCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setNewCoupon({ ...newCoupon, code: result })
  }

  const handleCreateCoupon = () => {
    console.log("Creating coupon:", newCoupon)
    setIsCreateDialogOpen(false)
    setNewCoupon({
      code: "",
      type: "percentage",
      value: "",
      description: "",
      expiryDate: "",
      usageLimit: "",
      minimumOrder: "",
    })
  }

  const filteredCoupons = coupons.filter((coupon) => {
    const matchesSearch =
      coupon.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      coupon.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" || coupon.status === filterStatus
    return matchesSearch && matchesFilter
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Discount Management</h1>
          <p className="text-gray-600">Create and manage discount coupons for your store</p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#ff6c2f] hover:bg-[#ffdacb] hover:text-gray-800 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Create Coupon
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Coupon</DialogTitle>
              <DialogDescription>Create a new discount coupon for your customers</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="flex gap-2 items-end" >
                <div className="flex-1 ">
                  <Label htmlFor="code" className='pb-2'>Coupon Code Name</Label>
                  <Input
                    id="code"
                    value={newCoupon.code}
                    onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value })}
                    placeholder="Enter coupon code"
                  />
                </div>
                <Button type="button" variant="outline" onClick={generateCouponCode} className="mt-6 bg-transparent">
                  Generate
                </Button>
              </div>
              <div>
                <Label htmlFor="description" className='pb-2'>Description</Label>
                <Input
                  id="description"
                  value={newCoupon.description}
                  onChange={(e) => setNewCoupon({ ...newCoupon, description: e.target.value })}
                  placeholder="Coupon description"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="type" className='pb-2'>Discount Type</Label>
                  <Select value={newCoupon.type} onValueChange={(value) => setNewCoupon({ ...newCoupon, type: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage</SelectItem>
                      <SelectItem value="fixed">Fixed Amount</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="value" className='pb-2'>Discount Value</Label>
                  <Input
                    id="value"
                    type="number"
                    value={newCoupon.value}
                    onChange={(e) => setNewCoupon({ ...newCoupon, value: e.target.value })}
                    placeholder={newCoupon.type === "percentage" ? "20" : "50"}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiryDate" className='pb-2'>Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    type="date"
                    value={newCoupon.expiryDate}
                    onChange={(e) => setNewCoupon({ ...newCoupon, expiryDate: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="usageLimit" className='pb-2'>Usage Limit</Label>
                  <Input
                    id="usageLimit"
                    type="number"
                    value={newCoupon.usageLimit}
                    onChange={(e) => setNewCoupon({ ...newCoupon, usageLimit: e.target.value })}
                    placeholder="100"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="minimumOrder" className='pb-2'>Minimum Order Amount</Label>
                <Input
                  id="minimumOrder"
                  type="number"
                  value={newCoupon.minimumOrder}
                  onChange={(e) => setNewCoupon({ ...newCoupon, minimumOrder: e.target.value })}
                  placeholder="50"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleCreateCoupon}
                className="bg-[#ff6c2f] hover:bg-[#ffdacb] hover:text-gray-800 text-white"
              >
                Create Coupon
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Coupon List</CardTitle>
              <CardDescription>Manage all your discount coupons</CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search coupons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-64"
                />
              </div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-32">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="expired">Expired</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredCoupons.map((coupon) => (
              <div
                key={coupon.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-1 space-y-2 sm:space-y-0">
                  <div className="flex items-center gap-3">
                    <code className="px-2 py-1 bg-gray-100 rounded text-sm font-mono font-medium">{coupon.code}</code>
                    {getStatusBadge(coupon.status)}
                    <span className="text-sm text-gray-600">
                      {coupon.type === "percentage" ? `${coupon.value}% off` : `$${coupon.value} off`}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{coupon.description}</p>
                  <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                    <span>
                      Used: {coupon.used}/{coupon.limit}
                    </span>
                    <span>Min Order: ${coupon.minimumOrder}</span>
                    <span>Expires: {coupon.expiryDate}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 sm:mt-0">
                  <div className="text-right text-sm">
                    <div className="font-medium text-gray-900">
                      {Math.round((coupon.used / coupon.limit) * 100)}% used
                    </div>
                    <div className="text-gray-500">{coupon.limit - coupon.used} remaining</div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicate
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        {coupon.status === "active" ? (
                          <>
                            <EyeOff className="w-4 h-4 mr-2" />
                            Deactivate
                          </>
                        ) : (
                          <>
                            <Eye className="w-4 h-4 mr-2" />
                            Activate
                          </>
                        )}
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
