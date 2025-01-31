const SignUpSkeleton = () => {
    return (
        <main className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover bg-[url('./assets/login1.png')]">
            <div className="fixed top-0 left-0">
                <div className="w-32 h-8 bg-gray-300 animate-pulse rounded-md"></div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
                <h1 className="w-32 h-8 bg-gray-300 animate-pulse mb-6"></h1>

                <form className="space-y-6">
                    <div className="mb-4">
                        <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
                    </div>

                    <div className="mb-4">
                        <div className="w-full h-10 bg-gray-300 animate-pulse rounded-md"></div>
                    </div>

                    {/* Bio (Optional) */}
                    <div className="mb-4">
                        <div className="w-full h-24 bg-gray-300 animate-pulse rounded-md"></div>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <div className="w-full h-12 bg-gray-300 animate-pulse rounded-md"></div>
                    </div>

                    <div className="w-32 h-6 bg-gray-300 animate-pulse mx-auto"></div>
                </form>
            </div>
        </main>
    );
};

export default SignUpSkeleton;
