const WorkStatusSkeleton = () => {
    return (
        <section aria-labelledby="analytics-overview" className="mb-8">
            <header className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />
                    <div className="w-1/4 h-6 bg-gray-300 rounded animate-pulse" />
                </div>
                <div className="w-1/2 h-4 bg-gray-200 rounded animate-pulse" />
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 animate-pulse"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg" />
                            <div className="w-8 h-1 bg-gray-300 rounded-full" />
                        </div>
                        <div>
                            <div className="w-1/3 h-6 bg-gray-300 rounded mb-2" />
                            <div className="w-1/2 h-4 bg-gray-200 rounded" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkStatusSkeleton;
