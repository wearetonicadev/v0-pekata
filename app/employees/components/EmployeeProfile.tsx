import { User } from "lucide-react";
import { CampaignUserDetail } from "@/types/campaigns";

type EmployeeProfileProps = {
  user: CampaignUserDetail["user"];
};

export const EmployeeProfile = ({ user }: EmployeeProfileProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg border border-[#F1F1F4] p-6">
        <div className="text-center mb-2 flex flex-row items-center md:flex-col">
          <div className="w-16 h-16 bg-[#f1f1f4] rounded-full flex items-center justify-center mr-6 md:mr-0 md:mb-4">
            <User className="w-8 h-8 text-neutral-700" />
          </div>

          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-black mb-1">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-sm text-neutral-700">{user.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-neutral-600">Teléfono</div>
            <div>{user.phone_number || "-"}</div>
          </div>

          <div className="border-b border-gray-300"></div>

          <div className="flex items-center justify-between">
            <div className="text-sm font-medium text-neutral-600">
              External ID
            </div>
            <div>{user.id || "-"}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
