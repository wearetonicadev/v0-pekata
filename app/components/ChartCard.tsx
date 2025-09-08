import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadialBarChart, PolarRadiusAxis, Legend, RadialBar } from "recharts";
import {
  ChartTooltip,
  ChartTooltipContent,
  ChartContainer,
} from "@/components/ui/chart";

type ChartCardProps = {
  title: string;
};

export const ChartCard = ({ title }: ChartCardProps) => {
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
    mobile: {
      label: "Mobile",
      color: "var(--chart-2)",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium text-[#071437]">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={[{ month: "january", desktop: 1260, mobile: 570 }]}
            innerRadius={30}
            outerRadius={50}
          >
            <Legend
              align="right"
              verticalAlign="middle"
              layout="vertical"
              iconType="circle"
              payload={[
                {
                  value: "Desktop",
                  type: "circle",
                  color: "var(--color-desktop)",
                },
                {
                  value: "Mobile",
                  type: "circle",
                  color: "var(--color-mobile)",
                },
              ]}
            />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false} />
            <RadialBar
              dataKey="desktop"
              name="Desktop"
              stackId="a"
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="mobile"
              name="Mobile"
              fill="var(--color-mobile)"
              stackId="a"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
