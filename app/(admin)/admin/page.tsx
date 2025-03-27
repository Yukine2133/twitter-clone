import { fetchAppeals } from "@/actions/appeal.actions";
import { fetchAllUsers } from "@/actions/user.actions";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminStats } from "@/components/admin/AdminStats";
import { BanAppeals } from "@/components/admin/BanAppeals";
import { UserManagement } from "@/components/admin/UserManagement";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IAppeal } from "@/interfaces/appeal.interface";
import { IUser } from "@/interfaces/user.interface";

export default async function AdminDashboard() {
  const users = await fetchAllUsers();
  const appeals = await fetchAppeals();

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <AdminHeader />
      <div className="container mx-auto py-6 px-4 md:px-6">
        <AdminStats appeals={appeals as IAppeal[]} users={users as IUser[]} />
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
              <UserManagement users={users as IUser[]} />
            </TabsContent>
            <TabsContent value="appeals" className="mt-0">
              <BanAppeals appeals={appeals as IAppeal[]} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
