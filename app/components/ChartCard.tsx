import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsivePie } from "@nivo/pie";

type ChartCardProps = {
  title: string;
};

const chartData = [
  { id: "Cajas jamoneras", value: 28, color: "hsl(200, 70%, 50%)" },
  { id: "Lotes", value: 32, color: "hsl(0, 70%, 50%)" },
  { id: "Gourmet", value: 24, color: "hsl(60, 70%, 50%)" },
  { id: "Vinos", value: 15, color: "hsl(120, 70%, 50%)" },
  { id: "Chocolates", value: 12, color: "hsl(240, 70%, 50%)" },
];

export const ChartCard = ({ title }: ChartCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-black font-family-apercu font-normal">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="h-full min-h-[250px]">
        <ResponsivePie
          data={chartData}
          innerRadius={0.9}
          padAngle={3}
          cornerRadius={3}
          colors={{ scheme: "nivo" }}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          arcLabelsSkipAngle={10}
          margin={{ top: -50, right: 160, bottom: 0, left: 0 }}
          theme={{
            legends: {
              text: {
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 500,
                fontSize: 12,
              },
            },
          }}
          legends={[
            {
              anchor: "right",
              direction: "column",
              itemWidth: 100,
              itemHeight: 20,
              symbolSize: 15,
              translateX: 140,
              itemTextColor: "#071437",
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};
