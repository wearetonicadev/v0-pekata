import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ResponsivePie } from "@nivo/pie";

type Item = {
  id: string;
  value: number;
};

type ChartCardProps = {
  title: string;
  data?: Item[];
};

const generateColors = (length: number) => {
  const colors = [
    "hsl(200, 70%, 50%)",
    "hsl(0, 70%, 50%)",
    "hsl(60, 70%, 50%)",
    "hsl(120, 70%, 50%)",
    "hsl(240, 70%, 50%)",
    "hsl(300, 70%, 50%)",
    "hsl(30, 70%, 50%)",
    "hsl(150, 70%, 50%)",
    "hsl(270, 70%, 50%)",
    "hsl(90, 70%, 50%)",
  ];
  return colors.slice(0, length);
};

export const ChartCard = ({ title, data = [] }: ChartCardProps) => {
  const chartData = data.map((item, index) => ({
    color: generateColors(data.length)[index],
    ...item,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-black font-family-apercu font-semibold">
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
          margin={{ top: 0, right: 200, bottom: 0, left: 0 }}
          theme={{
            legends: {
              text: {
                fontFamily: "Inter, system-ui, sans-serif",
                fontWeight: 500,
                fontSize: 12,
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                overflow: "hidden",
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
              translateX: 120,
              itemTextColor: "#071437",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolShape: "circle",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000000",
                  },
                },
              ],
            },
          ]}
        />
      </CardContent>
    </Card>
  );
};
