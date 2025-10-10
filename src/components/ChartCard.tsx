import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ResponsivePie } from "@nivo/pie";
import { cn } from "@/lib/utils";
import { EmptyState } from "./EmptyState";
import { CategoryIcon, SurveyIcon, HomeIcon, IncidentsIcon } from "./icons/EmptyStateIcons";


type Item = {
  id: string;
  value: number;
};

type ChartCardProps = {
  title: string;
  className: string;
  data?: Item[];
  description?: string;
  colors?: string[];
  htmlDescription? : string;
  customLegends?: string[];
  iconType?: 'category' | 'survey' | 'delivery' | 'incidents';
};

const generateColors = (length: number, colors: string[] = [
  "hsl(248, 66%, 83%)",
  "hsl(0, 100%, 37%)",
  "hsl(40, 84%, 65%)",
  "hsl(339, 16%, 41%)",
  "hsl(0, 0%, 0%)",
  "hsl(240, 70%, 50%)",
  "hsl(300, 70%, 50%)",
  "hsl(30, 70%, 50%)",
  "hsl(150, 70%, 50%)",
  "hsl(270, 70%, 50%)",
  "hsl(90, 70%, 50%)",
]) => {
  return colors.slice(0, length);
};

export const ChartCard = ({
  title,
  data = [],
  description,
  htmlDescription,
  colors,
  customLegends,
  className,
  iconType = 'category',
}: ChartCardProps) => {

  
  // Show empty state if no data
  if (data.length < 1) {
    console.log(data);
    const getIcon = () => {
      switch (iconType) {
        case 'category':
          return <CategoryIcon className="w-16 h-16" />;
        case 'survey':
          return <SurveyIcon className="w-16 h-16" />;
        case 'delivery':
          return <HomeIcon className="w-16 h-16" />;
        case 'incidents':
          return <IncidentsIcon className="w-16 h-16" />;
        default:
          return <CategoryIcon className="w-16 h-16" />;
      }
    };

    return (
      <EmptyState
        title={title}
        icon={getIcon()}
        description="Todavía no hay datos"
      />
    );
  }

  const chartData = data.map((item, index) => ({
    color: generateColors(data.length, colors)[index],
    ...item,
  }));

  const legendsData = [
    ...chartData.map(d => ({
      id: d.id,
      label: d.id,
      color: d.color,
    })),
  ]
  
  const customLegendsData = [
    ...( customLegends?.map(d =>({
      id: 'title',
      label: d,
      color: 'transparent',
    })) ?? []),
  ]

  return (
    <Card  className={cn(
      "chart_card",
      className
    )}>
      <CardHeader>
        <CardTitle className="text-xl text-black font-family-apercu font-semibold">
          {title}
        </CardTitle>

        <CardDescription className={`text-[14px] text-[#1F503B]! flex flex-row items-center gap-2`}
        dangerouslySetInnerHTML={ htmlDescription ? { __html: htmlDescription } : undefined
        }>
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="h-full min-h-[170px] sm:min-h-[250px]">
        <ResponsivePie
          data={chartData}
          innerRadius={0.83}
          padAngle={2}
          cornerRadius={2}
          colors={{ datum: 'data.color' }}
          enableArcLabels={false}
          enableArcLinkLabels={false}
          arcLabelsSkipAngle={10}
          margin={{ top: 0, right: 210, bottom: 0, left: 0 }}
          theme={{
            legends: {
              text: {
                fontFamily: "Apercu Pro, system-ui, sans-serif",
                fontWeight: 400,
                margin: 10,
                fontSize: 15,
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
              itemHeight: 22,
              symbolSize: 10,
              translateX: 120,
              translateY: 0,
              itemTextColor: "#252F4A",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolShape: "circle",
              itemsSpacing: 7,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000000",
                  },
                },
              ],
              data: legendsData,
            },
            {
              anchor: "right",
              direction: "column",
              itemWidth: 100,
              itemHeight: 15,
              symbolSize: 10,
              translateX: 100,
              translateY: -70,
              itemTextColor: "#252F4A",
              itemDirection: "left-to-right",
              itemOpacity: 1,
              symbolShape: "circle",
              itemsSpacing: 5,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "#000000",
                  },
                },
              ],
              data: customLegendsData,
            },
          ]}
       

        />
      </CardContent>
    </Card>
  );
};

