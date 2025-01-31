const DashboardSkeleton = () => {
    return (
        <main className="bg-center bg-no-repeat bg-cover min-h-screen bg-[url('./assets/wd.png')]">
            <div className="px-6 py-12 text-center flex flex-col items-center justify-center">

                <header className="w-full flex flex-col sm:flex-row sm:justify-between items-center sm:items-start gap-4 mb-6">
                    <div className="w-32 h-8 bg-gray-300 animate-pulse rounded-md mb-4 sm:mb-0"></div>

                    <div className="sm:text-left text-center mb-4 sm:mb-0">
                        <div className="w-48 h-8 bg-gray-300 animate-pulse mb-2"></div>
                        <div className="w-64 h-6 bg-gray-300 animate-pulse"></div>
                    </div>


                    <div className="flex justify-center sm:justify-start gap-4">
                        <div className="w-24 h-10 bg-gray-300 animate-pulse rounded-md"></div>
                    </div>
                </header>

                <section>
                    <div className="w-48 h-6 bg-gray-300 animate-pulse mb-4 mx-auto"></div>

                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <div className="w-full h-48 bg-gray-300 animate-pulse rounded-md"></div>
                        <div className="w-full h-48 bg-gray-300 animate-pulse rounded-md"></div>
                        <div className="w-full h-48 bg-gray-300 animate-pulse rounded-md"></div>
                        <div className="w-full h-48 bg-gray-300 animate-pulse rounded-md"></div>
                        <div className="w-full h-48 bg-gray-300 animate-pulse rounded-md"></div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default DashboardSkeleton;
