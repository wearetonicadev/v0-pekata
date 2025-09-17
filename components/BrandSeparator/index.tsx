export const BrandSeparator = () => {
  return (
    <div className="h-5 w-full relative overflow-hidden">
      <div className="h-5 bg-[#D9E2EE] w-full"></div>
      <div
        className="h-5 bg-[#4370A8] absolute top-0 right-0 w-1/2"
        style={{
          clipPath: "polygon(10% 0%, 100% 0%, 100% 100%, 0% 100%)",
        }}
      ></div>
    </div>
  );
};
