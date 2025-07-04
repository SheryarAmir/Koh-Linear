"use client";
import {
  Inbox,
  User,
  FolderKanban,
  Eye,
  FileText,
  Settings,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuBadge,
  SidebarRail,
} from "@/components/ui/sidebar";

interface KanbanSidebarProps {
  onViewChange: (view: string) => void;
  currentView: string;
}

export function KanbanSidebar({ onViewChange, currentView }: KanbanSidebarProps) {
  const navigationItems = [
    {
      title: "Inbox",
      icon: Inbox,
      badge: "1",
      view: "inbox",
    },
    {
      title: "My issues",
      icon: User,
      view: "my-issues",
    },
  ];

  const teamItems = [
    {
      title: "Issues",
      icon: FileText,
      view: "all-tickets",
    },
    {
      title: "Projects",
      icon: FolderKanban,
      view: "team-projects",
    },
    {
      title: "Views",
      icon: Eye,
      view: "team-views",
    },
  ];

  return (
    <Sidebar className="border-r border-gray-200 bg-white">
      <SidebarHeader className="border-b border-gray-100 p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-pink-500 text-white font-semibold text-sm">K</div>
          <span className="font-semibold text-gray-900">Kho-Linear</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.view)}
                    isActive={currentView === item.view}
                    className="text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <SidebarMenuBadge className="bg-gray-100 text-gray-600">{item.badge}</SidebarMenuBadge>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Team Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-500 text-xs font-medium uppercase tracking-wide">
            Your teams
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton className="text-gray-700 hover:bg-gray-50 hover:text-gray-900">
                  <div className="flex h-5 w-5 items-center justify-center rounded bg-pink-500 text-white text-xs font-semibold">K</div>
                  <span>Kho-Linear</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              {teamItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    onClick={() => onViewChange(item.view)}
                    isActive={currentView === item.view}
                    className="ml-6 text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>



        
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-100 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="text-gray-700 hover:bg-gray-50 hover:text-gray-900">
              <Settings className="h-4 w-4" />
              <span>Try</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
