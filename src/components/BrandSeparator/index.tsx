
type BrandSeparatorProps = {
  leftColor?: string;
  rightColor?: string;
  height?: number;
};

export function BrandSeparator({
  leftColor = "#D9E2EE",
  rightColor = "#4370A8",
  height = 29,
}: BrandSeparatorProps) {
  const safeHeight = Math.min(height, 48);
  return (
    <div className="w-full relative overflow-hidden" style={{height: safeHeight + 'px'}}>
      <div
        className="h-12 w-full"
        style={{ backgroundColor: leftColor }}
      ></div>
      <div
        className="h-12 absolute top-0 right-0 w-1/2"
        style={{
          backgroundColor: rightColor,
          clipPath: "polygon(5% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      ></div>
    </div>
  );
}
