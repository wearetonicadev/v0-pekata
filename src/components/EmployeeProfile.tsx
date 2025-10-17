import { CircleUserRound } from "lucide-react";
import { CampaignUserDetail } from "@/types/campaigns";

type EmployeeProfileProps = {
  user: CampaignUserDetail["user"];
};

export const EmployeeProfile = ({ user }: EmployeeProfileProps) => {
  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg border border-[#F1F1F4] p-6">
        <div className="text-center mb-5 flex flex-row items-center md:flex-col">
          <div className="w-15 h-15 bg-[#F7FAF8] border border-[#D5EADE] rounded-full flex items-center justify-center mr-6 md:mr-0 md:mb-4">
            <CircleUserRound className="w-6 h-6 text-[#1F503B]" />
          </div>

          <div className="flex flex-col">
            <h2 className="text-lg font-semibold text-black mb-0.5">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-sm text-[#4D4D4D]">{user.email}</p>
          </div>
        </div>

        <div className="space-y-3">
          {user.phone_number && (
            <div className="flex items-center justify-between">
              <div className="text-sm font-normal text-[#666666]">Teléfono</div>
              <div className="text-sm font-normal text-[#000000]">{user.phone_number}</div>
            </div>
          )}
          
          {user.external_id && (
            <>
              <div className="border-b border-[#DBDFE9]"></div>

              <div className="flex items-center justify-between">
                <div className="text-sm font-normal text-[#666666]">
                  External ID
                </div>
                <div className="text-sm font-normal text-[#000000]">{user.external_id}</div>
              </div>
            </>
          )}

          
        </div>
      </div>
    </div>
  );
};
