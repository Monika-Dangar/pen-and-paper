const WorkStatusSkeleton = () => {
    return (
        <section aria-labelledby="work-status" className="mb-8">
            <header id="work-status">
                {/* Title skeleton */}
                <div className="w-1/4 h-6 bg-gray-300 animate-pulse mb-3"></div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Card skeleton */}
                <div className="bg-white p-6 rounded-lg shadow-md animate-pulse">
                    {/* Card title skeleton */}
                    <div className="w-1/2 h-5 bg-gray-300 animate-pulse mb-2"></div>
                    {/* Content count skeleton */}
                    <div className="w-3/4 h-8 bg-gray-300 animate-pulse"></div>
                </div>
            </div>
        </section>
    );
};

export default WorkStatusSkeleton;
