import { ShieldCheckIcon } from "@heroicons/react/24/solid";

const AdminBadge = () => {
  return (
    <div className="inline-flex items-center gap-1 px-2 py-1 text-xs font-bold bg-blue-500 rounded-full">
      <ShieldCheckIcon className="w-3.5 h-3.5" />
      <span className="uppercase">admin</span>
    </div>
  );
};

export default AdminBadge;
