interface PageTitleProps {
  title: string;
}

const PageTitle = ({ title }: PageTitleProps) => (
  <div className="relative w-full flex items-center justify-center overflow-hidden bg-[#E0F1FE] min-h-[50px]">
    <h2 className="font-bold text-[32px] text-[#222] z-10 my-4">{title}</h2>
  </div>
);

export default PageTitle; 