import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminStats } from "@/components/admin/AdminStats";
import { BanAppeals } from "@/components/admin/BanAppeals";
import { UserManagement } from "@/components/admin/UserManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <AdminHeader />
      <div className="container mx-auto py-6 px-4 md:px-6">
        <AdminStats />
        <div className="mt-6 bg-[#111] rounded-lg p-4">
          <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-[#222] mb-4">
              <TabsTrigger
                value="users"
                className="data-[state=active]:bg-[#1d9bf0] data-[state=active]:text-white"
              >
                User Management
              </TabsTrigger>
              <TabsTrigger
                value="appeals"
                className="data-[state=active]:bg-[#1d9bf0] data-[state=active]:text-white"
              >
                Ban Appeals
              </TabsTrigger>
            </TabsList>
            <TabsContent value="users" className="mt-0">
              <UserManagement />
            </TabsContent>
            <TabsContent value="appeals" className="mt-0">
              <BanAppeals />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
