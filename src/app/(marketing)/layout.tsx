import { NavigationBar } from "./_components/navbar";
const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full">
      <main className="h-full text-foreground bg-background min-h-full flex flex-col">
        <NavigationBar />
        {children}
      </main>
    </div>
  );
};

export default MarketingLayout;
