"use client";
import { Search, Filter, MoreHorizontal, User, Grid3X3 } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UserProfile from "@/app/(profileDetails)/userProfile/page";

interface KanbanTopbarProps {
  onViewChange: (view: string) => void;
  currentView: string;
}

export function KanbanTopbar({ onViewChange, currentView }: KanbanTopbarProps) {
  const viewTabs = [
    { id: "all-issues", label: "All issues", icon: Grid3X3 },
    { id: "active", label: "Active", icon: null },
    { id: "backlog", label: "Backlog", icon: null },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className="flex h-[65px] items-center justify-between border-b border-gray-200 bg-white px-4">
      {/* Left side - Search and Navigation */}
      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search..."
            className="w-64 pl-9 bg-gray-50 border-gray-200 focus:bg-white"
          />
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-1">
          {viewTabs.map((tab) => (
            <Button
              key={tab.id}
              variant={currentView === tab.id ? "default" : "ghost"}
              size="sm"
              onClick={() => onViewChange(tab.id)}
              className={`gap-2 ${
                currentView === tab.id
                  ? "bg-gray-900 text-white hover:bg-gray-800"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              }`}
            >
              {tab.icon && <tab.icon className="h-4 w-4" />}
              {tab.label}
            </Button>
          ))}
        </div>

        {/* Filter Button */}
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-gray-600 hover:text-gray-900"
        >
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Right side - Actions */}
      <div className="flex items-center gap-2">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
            >
              <User className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>User Profile</DialogTitle> {/* ✅ Add this */}
              <DialogDescription>
                you details are important to us
              </DialogDescription>
            </DialogHeader>
            <UserProfile />
          </DialogContent>
        </Dialog>


 <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
         <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
          <User className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">User Profile</DialogTitle>
          <UserProfile/>
        </DialogHeader>

     

 </DialogContent>
    </Dialog>

        <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
          <Grid3X3 className="h-4 w-4" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-600 hover:text-gray-900"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            <DropdownMenuItem onClick={() => onViewChange("display")}>
              Display
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onViewChange("settings")}>
              Settings
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
