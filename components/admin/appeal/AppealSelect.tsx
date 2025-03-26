import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppealFilter } from "@/interfaces/appeal.interface";
import { IAppealSelectProps } from "@/interfaces/props.interface";
export const AppealSelect = ({ filter, setFilter }: IAppealSelectProps) => {
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-bold tracking-tight">Ban Appeals</h2>
      <Select
        value={filter}
        onValueChange={(value) => setFilter(value as AppealFilter)}
      >
        <SelectTrigger className="w-[180px] bg-[#222] border-[#333] text-white">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent className="bg-[#222] border-[#333] text-white">
          <SelectItem value="All" className="focus:bg-[#444] focus:text-white">
            All Appeals
          </SelectItem>
          <SelectItem
            value="Pending"
            className="focus:bg-[#444] focus:text-white"
          >
            Pending
          </SelectItem>
          <SelectItem
            value="Approved"
            className="focus:bg-[#444] focus:text-white"
          >
            Approved
          </SelectItem>
          <SelectItem
            value="Rejected"
            className="focus:bg-[#444] focus:text-white"
          >
            Rejected
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
