import Header from "@/components/shared/header";
import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
    return (
        <div className="flex min-h-screen w-full flex-col bg-background">
            <Header />
            <main className="flex-1">
                <div className="container mx-auto px-4 py-8">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {Array.from({ length: 12 }).map((_, index) => (
                            <div key={index} className="flex flex-col rounded-lg border bg-card shadow-sm p-4 space-y-4">
                                <Skeleton className="h-48 w-full rounded-md" />
                                <div className="space-y-2">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-4 w-1/2" />
                                </div>
                                <div className="flex justify-between pt-2">
                                    <Skeleton className="h-8 w-20" />
                                    <Skeleton className="h-8 w-20" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Loading;