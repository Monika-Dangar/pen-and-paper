const HomeSkeleton = () => {
    return (
        <main className="flex items-center bg-center bg-no-repeat bg-cover min-h-screen bg-[url('./assets/bg1.png')]">
            <div className="px-4 mx-auto max-w-screen-xl text-center">
                {/* Title */}
                <div className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-[#de5044] md:text-5xl lg:text-6xl">
                    <div className="w-40 h-8 bg-gray-300 animate-pulse mx-auto" />
                </div>

                {/* Description text */}
                <p className="text-1xl font-medium mt-2 text-[#de5044]">
                    <div className="w-64 h-6 bg-gray-300 animate-pulse mx-auto my-2" />
                    <div className="w-64 h-6 bg-gray-300 animate-pulse mx-auto my-2" />
                    <div className="w-64 h-6 bg-gray-300 animate-pulse mx-auto my-2" />
                </p>

                {/* Paragraph text */}
                <p className="mb-8 mt-2 font-bold text-lg text-[#6595ac] sm:px-16 lg:px-48">
                    <div className="w-80 h-6 bg-gray-300 animate-pulse mx-auto my-2" />
                    <div className="w-80 h-6 bg-gray-300 animate-pulse mx-auto my-2" />
                    <div className="w-80 h-6 bg-gray-300 animate-pulse mx-auto my-2" />
                </p>

                {/* Buttons */}
                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <div className="w-36 h-12 bg-gray-300 animate-pulse rounded-md mx-auto" />
                    <div className="w-36 h-12 bg-gray-300 animate-pulse rounded-md mx-auto" />
                </div>
            </div>
        </main>
    );
}

export default HomeSkeleton;
