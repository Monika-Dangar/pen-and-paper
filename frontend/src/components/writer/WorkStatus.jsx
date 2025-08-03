/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { HiOutlineEye, HiOutlineChat, HiOutlineHeart, HiOutlineDocumentText, HiOutlineTrendingUp } from "react-icons/hi";

// Enhanced WorkStatus Component
const WorkStatus = ({ data, length = 3 }) => {
    const [totalLikes, setLikes] = useState(0);
    const [totalComments, setComments] = useState(0);
    // const [totalViews, setViews] = useState(0);

    useEffect(() => {
        let likes = 0;
        let comments = 0;
        let views = 0;

        data?.forEach((writing) => {
            likes += writing?.likes || 0;
            comments += writing?.comments?.length || 0;
            views += writing?.views || 0;
        });

        setLikes(likes);
        setComments(comments);
        // setViews(views);
    }, [data]);

    const stats = [
        {
            label: "Published Works",
            value: length || 0,
            icon: HiOutlineDocumentText,
            color: "from-blue-500 to-blue-600",
            bgColor: "bg-blue-50",
            textColor: "text-blue-600"
        },
        {
            label: "Total Likes",
            value: totalLikes || 0,
            icon: HiOutlineHeart,
            color: "from-rose-500 to-rose-600",
            bgColor: "bg-rose-50",
            textColor: "text-rose-600"
        },
        {
            label: "Total Comments",
            value: totalComments || 0,
            icon: HiOutlineChat,
            color: "from-green-500 to-green-600",
            bgColor: "bg-green-50",
            textColor: "text-green-600"
        },
        // {
        //     label: "Total Views",
        //     value: totalViews || 0,
        //     icon: HiOutlineEye,
        //     color: "from-purple-500 to-purple-600",
        //     bgColor: "bg-purple-50",
        //     textColor: "text-purple-600"
        // }
    ];

    return (
        <section aria-labelledby="analytics-overview" className="mb-8">
            <header className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <HiOutlineTrendingUp className="w-6 h-6 text-blue-600" />
                    <h1 className="text-2xl font-bold text-gray-900">Analytics Overview</h1>
                </div>
                <p className="text-gray-600">Track your writing performance and engagement metrics</p>
            </header>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => {
                    const IconComponent = stat.icon;
                    return (
                        <div
                            key={index}
                            className="group relative bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                    <IconComponent className={`w-6 h-6 ${stat.textColor}`} />
                                </div>
                                <div className="w-8 h-1 bg-gradient-to-r rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                                    style={{ background: `linear-gradient(to right, ${stat.color.split(' ')[1]}, ${stat.color.split(' ')[3]})` }} />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WorkStatus;
