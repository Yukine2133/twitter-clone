import { DashboardCards } from "@/components/admin/dashboard/DashboardCards";
import { DashboardHeader } from "@/components/admin/dashboard/DashboardHeader";

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <DashboardHeader />
      <DashboardCards />
    </div>
  );
}
