export const SidebarSkeleton = () => (
    <div className="w-64 h-full bg-gray-300 animate-pulse">
        <div className="h-16 bg-gray-400 mb-4"></div>
        <div className="h-10 bg-gray-400 mb-2"></div>
        <div className="h-10 bg-gray-400 mb-2"></div>
        <div className="h-10 bg-gray-400 mb-2"></div>
    </div>
);

export const WritingPreviewSkeleton = () => (
    <div className="p-4 space-y-4 bg-white rounded-lg shadow-lg animate-pulse">
        <div className="w-full h-40 bg-gray-300 rounded-md"></div>
        <div className="h-6 w-3/4 bg-gray-300 rounded-md"></div>
        <div className="h-4 w-1/2 bg-gray-300 rounded-md"></div>
    </div>
);

export const WritingDetailSkeleton = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg animate-pulse">
        <div className="h-8 w-1/4 bg-gray-300 rounded-md mb-4"></div>
        <div className="h-5 w-full bg-gray-300 rounded-md mb-2"></div>
        <div className="h-5 w-full bg-gray-300 rounded-md mb-2"></div>
        <div className="h-5 w-full bg-gray-300 rounded-md mb-2"></div>
    </div>
);

export const ReaderSkeleton = () => (
    <div className="flex h-screen">
        <div className="w-64">
            <SidebarSkeleton />
        </div>
        <main className="flex-1 p-6 bg-gray-100">
            <header className="text-center mb-5">
                <div className="w-2/3 h-8 bg-gray-300 animate-pulse mx-auto mb-2"></div>
                <div className="w-1/3 h-6 bg-gray-300 animate-pulse mx-auto"></div>
            </header>

            <section className="space-y-6">
                <WritingPreviewSkeleton />
                <WritingPreviewSkeleton />
                <WritingPreviewSkeleton />
            </section>
        </main>
    </div>
);
