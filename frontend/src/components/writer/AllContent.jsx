import { lazy, Suspense, useEffect, useState } from "react";
import useGetWriterContent from "../../hook/useGetWriterContent";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import { handleDeleteContentById } from "../../services/contentService";
const WriterSkeleton = lazy(() => import("../loader/WriterSkeleton"));
const CommentCard = lazy(() => import("../comment/CommentCard"));
import WorkStatus from "./WorkStatus";
import Loader from "../loader/Loader";
import {
    // HiOutlineEye,
    HiOutlineChat,
    HiOutlineHeart,
    HiOutlineDocumentText,
} from "react-icons/hi";

// Enhanced AllContent Component
const AllContent = () => {
    const [writerData, setWriterData] = useState([]);
    const [isDeleted, setDeleted] = useState(false);
    const { data, loading } = useGetWriterContent(isDeleted);
    const [openDrawer, setOpenDrawer] = useState(null);
    const { contentType } = useParams();
    const handleDeleteContent = async (contentId) => {
        const response = await handleDeleteContentById(contentId);
        if (response) {
            setDeleted(!isDeleted);
        }
    };

    const toggleDrawer = (contentId) => {
        setOpenDrawer((prevId) => (prevId === contentId ? null : contentId));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const formatTime = (dateString) => {
        return new Date(dateString).toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    useEffect(() => {
        try {
            if (data) {
                setWriterData(data);
            } else {
                setWriterData([])
            }

        } catch (error) {
            console.log('error: ', error);

        }
    }, [data, contentType, isDeleted]);

    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-6">

            {loading && (
                <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-50">
                    <Loader />
                </div>
            )}

            <div className="max-w-7xl mx-auto">
                <WorkStatus data={writerData} length={writerData?.length} />
                <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <header className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-100">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900 mb-1">
                                    Your {contentType} Collection
                                </h2>
                                <p className="text-sm text-gray-600">
                                    Manage and track all your published {contentType}s
                                </p>
                            </div>

                        </div>
                    </header>

                    {/* Desktop Table View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-200">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Content
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Category
                                    </th>
                                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Published
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Engagement
                                    </th>
                                    <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {loading ? (<WriterSkeleton />) : (
                                    writerData?.map((content, index) => (
                                        <tr
                                            key={content._id}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full mr-3" />
                                                    <div>
                                                        <h3 className="font-semibold text-gray-900 mb-1">
                                                            {content.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-500">
                                                            #{index + 1}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {content.writingCategoryId.categoryType}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm text-gray-900">
                                                    {formatDate(content.createdAt)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {formatTime(content.createdAt)}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-4">
                                                    <div className="flex items-center gap-1">
                                                        <HiOutlineHeart className="w-4 h-4 text-rose-500" />
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {content?.likes || 0}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <HiOutlineChat className="w-4 h-4 text-blue-500" />
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {content?.comments?.length || 0}
                                                        </span>
                                                    </div>
                                                    {/* <div className="flex items-center gap-1">
                                                        <HiOutlineEye className="w-4 h-4 text-purple-500" />
                                                        <span className="text-sm font-medium text-gray-700">
                                                            {content?.views || 0}
                                                        </span>
                                                    </div> */}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-center gap-3">
                                                    <button
                                                        onClick={() => handleDeleteContent(content._id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        aria-label="Delete content"
                                                    >
                                                        <HiOutlineTrash className="w-4 h-4" />
                                                    </button>
                                                    <Link to={`/write/${contentType}/editor/${content._id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" aria-label="Edit this content">
                                                        <HiOutlinePencilAlt className="w-4 h-4" />
                                                    </Link>
                                                    {/* {content.comments && content.comments.length > 0 && ( */}
                                                    <button
                                                        onClick={() => toggleDrawer(content._id)}
                                                        className="p-2 text-green-500 hover:bg-green-50 rounded-lg transition-colors"
                                                        aria-label="View comments"
                                                    >
                                                        <HiOutlineChat className="w-4 h-4" />
                                                    </button>
                                                    {/* )} */}
                                                    {openDrawer === content._id && (
                                                        <Suspense fallback={<div>Loading CommentCard...</div>}>
                                                            <CommentCard
                                                                openDrawer={openDrawer === content._id}
                                                                toggleDrawer={() => toggleDrawer(content._id)}
                                                                writing={content}
                                                                writer={true}
                                                            />
                                                        </Suspense>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View */}
                    <div className="md:hidden p-4">
                        <div className="space-y-4">
                            {writerData?.map((content, index) => (
                                <article
                                    key={content._id}
                                    className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <header className="mb-4">
                                        <div className="flex items-start justify-between mb-2">
                                            <h3 className="font-bold text-gray-900 text-lg leading-tight">
                                                {content.title}
                                            </h3>
                                            <span className="text-xs text-gray-400 ml-2">
                                                #{index + 1}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-100 text-blue-800">
                                                {content.writingCategoryId.categoryType}
                                            </span>
                                            <span className="text-xs text-gray-500">
                                                {formatDate(content.contentTypeId.createdAt)}
                                            </span>
                                        </div>
                                    </header>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="flex items-center gap-1">
                                                <HiOutlineHeart className="w-4 h-4 text-rose-500" />
                                                <span className="text-sm font-medium text-gray-700">
                                                    {content?.likes}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <HiOutlineChat className="w-4 h-4 text-blue-500" />
                                                <span className="text-sm font-medium text-gray-700">
                                                    {content?.comments?.length || 0}
                                                </span>
                                            </div>
                                            {/* <div className="flex items-center gap-1">
                                                <HiOutlineEye className="w-4 h-4 text-purple-500" />
                                                <span className="text-sm font-medium text-gray-700">
                                                    {content?.views || 0}
                                                </span>
                                            </div> */}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                onClick={() => handleDeleteContent(content._id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                aria-label="Delete content"
                                            >
                                                <HiOutlineTrash className="w-4 h-4" />
                                            </button>
                                            <Link to={`/write/${contentType}/editor/${content._id}`} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" aria-label="Edit this content">
                                                <HiOutlinePencilAlt className="w-4 h-4" />
                                            </Link>
                                        </div>
                                    </div>
                                    {content?.comments && content?.comments.length > 0 && (
                                        <div className="mt-4 pt-3 border-t border-gray-100">
                                            <button
                                                onClick={() => toggleDrawer(content._id)}
                                                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                                aria-label="View comments"
                                            >
                                                View {content?.comments?.length} comment
                                                {/* {content.comments.length !== 1 ? "s" : ""} */}
                                            </button>
                                        </div>
                                    )}
                                    {openDrawer === content._id && (
                                        <Suspense fallback={<div className="text-sm text-gray-500 p-2">Loading comments...</div>}>
                                            <CommentCard
                                                openDrawer={openDrawer === content._id}
                                                toggleDrawer={() => toggleDrawer(content._id)}
                                                writing={content}
                                                writer={true}
                                            />
                                        </Suspense>
                                    )}
                                </article>
                            ))}
                        </div>
                    </div>

                    {writerData?.length === 0 && (
                        <div className="text-center py-12">
                            <HiOutlineDocumentText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                No content yet
                            </h3>
                            <p className="text-gray-600">
                                Start writing your first {contentType} to see it here.
                            </p>
                        </div>
                    )}
                </section>
            </div>
        </main>
    );
};

export default AllContent;
