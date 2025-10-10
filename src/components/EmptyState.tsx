import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type EmptyStateProps = {
  title: string;
  icon: ReactNode;
  description?: string;
};

export const EmptyState = ({ title, icon, description }: EmptyStateProps) => {
  return (
    <Card className="border-[#F1F1F4]">
      <CardHeader>
        <CardTitle className="text-xl text-black font-family-apercu font-semibold">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-full min-h-[170px] sm:min-h-[250px] flex items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="text-gray-400">
            {icon}
          </div>
          <div className="text-gray-500 text-sm">
            {description || "Todavía no hay datos"}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
