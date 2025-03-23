"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Ban,
  Check,
  Edit,
  MoreHorizontal,
  Search,
  Trash,
  UserCog,
  X,
} from "lucide-react";

// Mock data for users
const users = [
  {
    id: "1",
    name: "Yukine213",
    username: "@yukine213",
    email: "yukine213@example.com",
    status: "active",
    role: "admin",
    joinDate: "Mar 20, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Edge Lord",
    username: "@womp.womp",
    email: "edgelord@example.com",
    status: "active",
    role: "user",
    joinDate: "Apr 15, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "3",
    name: "Bruh",
    username: "@yukineyukine",
    email: "bruh@example.com",
    status: "active",
    role: "user",
    joinDate: "May 3, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "4",
    name: "ZXC",
    username: "@zxc",
    email: "zxc@example.com",
    status: "active",
    role: "user",
    joinDate: "Jun 12, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "5",
    name: "John Doe",
    username: "@johndoe",
    email: "john@example.com",
    status: "banned",
    role: "user",
    joinDate: "Feb 8, 2023",
    avatar: "/placeholder.svg?height=40&width=40",
  },
];

export function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [editUser, setEditUser] = useState<any>(null);
  const [banUser, setBanUser] = useState<any>(null);
  const [deleteUser, setDeleteUser] = useState<any>(null);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search users..."
            className="pl-8 bg-[#222] border-[#333] text-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button className="bg-[#222] hover:bg-[#333] text-white">
          <UserCog className="mr-2 h-4 w-4" />
          Add New User
        </Button>
      </div>

      <div className="rounded-md border border-[#333]">
        <Table>
          <TableHeader className="bg-[#111]">
            <TableRow className="border-b-[#333] hover:bg-[#222]">
              <TableHead className="text-gray-400">User</TableHead>
              <TableHead className="text-gray-400">Email</TableHead>
              <TableHead className="text-gray-400">Status</TableHead>
              <TableHead className="text-gray-400">Role</TableHead>
              <TableHead className="text-gray-400">Join Date</TableHead>
              <TableHead className="text-right text-gray-400">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredUsers.map((user) => (
              <TableRow
                key={user.id}
                className="border-b-[#333] hover:bg-[#222]"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback className="bg-[#333] text-white">
                        {user.name.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-xs text-gray-400">
                        {user.username}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  {user.status === "active" ? (
                    <span className="inline-flex items-center rounded-full border border-[#333] px-2.5 py-0.5 text-xs font-semibold text-gray-200">
                      Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-500">
                      Banned
                    </span>
                  )}
                </TableCell>
                <TableCell>
                  {user.role === "admin" ? (
                    <span className="inline-flex items-center rounded-full bg-[#1d9bf0] px-2.5 py-0.5 text-xs font-semibold text-white">
                      Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded-full bg-[#333] px-2.5 py-0.5 text-xs font-semibold text-white">
                      User
                    </span>
                  )}
                </TableCell>
                <TableCell>{user.joinDate}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 text-gray-400 hover:text-white hover:bg-[#333]"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align="end"
                      className="bg-[#222] border-[#333] text-white"
                    >
                      <DropdownMenuItem
                        onClick={() => setEditUser(user)}
                        className="hover:bg-[#333] focus:bg-[#333]"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      {user.status === "active" ? (
                        <DropdownMenuItem
                          onClick={() => setBanUser(user)}
                          className="hover:bg-[#333] focus:bg-[#333]"
                        >
                          <Ban className="mr-2 h-4 w-4" />
                          Ban User
                        </DropdownMenuItem>
                      ) : (
                        <DropdownMenuItem className="hover:bg-[#333] focus:bg-[#333]">
                          <Check className="mr-2 h-4 w-4" />
                          Unban User
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator className="bg-[#333]" />
                      <DropdownMenuItem
                        className="text-red-500 hover:bg-[#333] focus:bg-[#333]"
                        onClick={() => setDeleteUser(user)}
                      >
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Edit User Dialog */}
      <Dialog
        open={!!editUser}
        onOpenChange={(open) => !open && setEditUser(null)}
      >
        <DialogContent className="bg-[#222] text-white border-[#333]">
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription className="text-gray-400">
              Make changes to the user account. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          {editUser && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  defaultValue={editUser.name}
                  className="col-span-3 bg-[#333] border-[#444] text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Username
                </Label>
                <Input
                  id="username"
                  defaultValue={editUser.username}
                  className="col-span-3 bg-[#333] border-[#444] text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  defaultValue={editUser.email}
                  className="col-span-3 bg-[#333] border-[#444] text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="role" className="text-right">
                  Role
                </Label>
                <Select defaultValue={editUser.role}>
                  <SelectTrigger className="col-span-3 bg-[#333] border-[#444] text-white">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#333] border-[#444] text-white">
                    <SelectItem
                      value="user"
                      className="focus:bg-[#444] focus:text-white"
                    >
                      User
                    </SelectItem>
                    <SelectItem
                      value="moderator"
                      className="focus:bg-[#444] focus:text-white"
                    >
                      Moderator
                    </SelectItem>
                    <SelectItem
                      value="admin"
                      className="focus:bg-[#444] focus:text-white"
                    >
                      Admin
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setEditUser(null)}
              className="bg-transparent border-[#444] text-white hover:bg-[#333] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setEditUser(null)}
              className="bg-[#1d9bf0] text-white hover:bg-[#1a8cd8]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Ban User Dialog */}
      <Dialog
        open={!!banUser}
        onOpenChange={(open) => !open && setBanUser(null)}
      >
        <DialogContent className="bg-[#222] text-white border-[#333]">
          <DialogHeader>
            <DialogTitle>Ban User</DialogTitle>
            <DialogDescription className="text-gray-400">
              Specify the reason and duration for banning this user.
            </DialogDescription>
          </DialogHeader>
          {banUser && (
            <div className="grid gap-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={banUser.avatar} alt={banUser.name} />
                  <AvatarFallback className="bg-[#333] text-white">
                    {banUser.name.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{banUser.name}</div>
                  <div className="text-sm text-gray-400">
                    {banUser.username}
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="reason">Reason</Label>
                <Select defaultValue="violation">
                  <SelectTrigger className="bg-[#333] border-[#444] text-white">
                    <SelectValue placeholder="Select a reason" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#333] border-[#444] text-white">
                    <SelectItem
                      value="violation"
                      className="focus:bg-[#444] focus:text-white"
                    >
                      Community Guidelines Violation
                    </SelectItem>
                    <SelectItem
                      value="harassment"
                      className="focus:bg-[#444] focus:text-white"
                    >
                      Harassment
                    </SelectItem>
                    <SelectItem
                      value="spam"
                      className="focus:bg-[#444] focus:text-white"
                    >
                      Spam
                    </SelectItem>
                    <SelectItem
                      value="impersonation"
                      className="focus:bg-[#444] focus:text-white"
                    >
                      Impersonation
                    </SelectItem>
                    <SelectItem
                      value="other"
                      className="focus:bg-[#444] focus:text-white"
                    >
                      Other
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Select defaultValue="7days">
                  <SelectTrigger className="bg-[#333] border-[#444] text-white">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#333] border-[#444] text-white">
                    <SelectItem
                      value="24hours"
                      className="focus:bg-[#444] focus:text-white"
                    >
                      24 Hours
                    </SelectItem>
                    <SelectItem
                      value="7days"
                      className="focus:bg-[#444] focus:text-white"
                    >
                      7 Days
                    </SelectItem>
                    <SelectItem
                      value="30days"
                      className="focus:bg-[#444] focus:text-white"
                    >
                      30 Days
                    </SelectItem>
                    <SelectItem
                      value="permanent"
                      className="focus:bg-[#444] focus:text-white"
                    >
                      Permanent
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notes">Additional Notes</Label>
                <Input
                  id="notes"
                  placeholder="Add any additional details..."
                  className="bg-[#333] border-[#444] text-white"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setBanUser(null)}
              className="bg-transparent border-[#444] text-white hover:bg-[#333] hover:text-white"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => setBanUser(null)}
              className="bg-red-500 text-white hover:bg-red-600"
            >
              Ban User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete User Confirmation */}
      <AlertDialog
        open={!!deleteUser}
        onOpenChange={(open) => !open && setDeleteUser(null)}
      >
        <AlertDialogContent className="bg-[#222] text-white border-[#333]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400">
              This action cannot be undone. This will permanently delete the
              user account and remove all associated data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border-[#444] text-white hover:bg-[#333] hover:text-white">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={() => setDeleteUser(null)}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
