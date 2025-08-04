const WriterSkeleton = () => {
    return (
        <>
            {Array.from({ length: 3 }).map((_, index) => (
                <tr key={index} className="animate-pulse">
                    <td className="px-6 py-4">
                        <div className="h-4 w-3/4 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                        <div className="h-4 w-1/2 bg-gray-200 rounded" />
                    </td>
                    <td className="px-6 py-4">
                        <div className="h-4 w-2/3 bg-gray-200 rounded mb-1" />
                        <div className="h-3 w-1/2 bg-gray-100 rounded" />
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex justify-center gap-4">
                            <div className="h-4 w-4 bg-gray-200 rounded-full" />
                            <div className="h-4 w-4 bg-gray-200 rounded-full" />
                        </div>
                    </td>
                    <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                            <div className="h-6 w-6 bg-gray-200 rounded-full" />
                            <div className="h-6 w-6 bg-gray-200 rounded-full" />
                            <div className="h-6 w-6 bg-gray-200 rounded-full" />
                        </div>
                    </td>
                </tr>
            ))}
        </>
    );
};

export default WriterSkeleton;
