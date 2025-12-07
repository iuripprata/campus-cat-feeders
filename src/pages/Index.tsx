import { FeederSidebar } from '@/components/FeederSidebar';
import { FeederMap } from '@/components/FeederMap';

const Index = () => {
  return (
    <div className="flex h-screen bg-surface">
      <FeederSidebar />
      <main className="flex-1 p-4 md:p-6">
        <div className="h-full flex flex-col">
          <div className="mb-4 pl-12 md:pl-0">
            <h2 className="text-2xl font-semibold text-foreground">Campus Overview</h2>
            <p className="text-muted-foreground">Monitor all feeders across the university</p>
          </div>
          <div className="flex-1">
            <FeederMap />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
