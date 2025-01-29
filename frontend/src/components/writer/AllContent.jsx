import { useEffect, useState } from "react";
import useGetWriterContent from '../../hook/useGetWriterContent';
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { Link, useParams } from 'react-router-dom';
import { handleDeleteContentById } from "../../services/contentService";
import CommentCard from "../comment/CommentCard";
import WorkStatus from "./WorkStatus";

const AllContent = () => {
    const { contentType } = useParams();
    const [writerData, setWriterData] = useState([]);
    const [isDeleted, setDeleted] = useState(false);
    const { data } = useGetWriterContent(isDeleted);
    const [openDrawer, setOpenDrawer] = useState(null); // Track the content ID for which comments should be visible

    const handleDeleteContent = async (contentId) => {
        const response = await handleDeleteContentById(contentId);
        if (response) {
            setDeleted(!isDeleted);
        }
    };

    useEffect(() => {
        if (data) {
            setWriterData(data);
        }
    }, [data, contentType, isDeleted]);

    const toggleDrawer = (contentId) => {
        // Toggle drawer visibility for the clicked content
        setOpenDrawer((prevId) => (prevId === contentId ? null : contentId));
    };

    return (
        <main>
            <WorkStatus contentType={contentType} length={writerData?.length} />
            <section className="p-6 rounded-lg shadow-md">
                <header className="mb-4">
                    <h2 className="text-2xl font-semibold text-gray-800">All {contentType} you've written</h2>
                </header>

                {/* Table for medium and larger screens */}
                <div className="hidden md:block">
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-center text-gray-500">
                            <thead className="bg-gray-200">
                                <tr>
                                    <th className="px-6 py-3">Title</th>
                                    <th className="px-6 py-3">Content Type</th>
                                    <th className="px-6 py-3">Date</th>
                                    <th className="px-6 py-3">Time</th>
                                    <th className="px-6 py-3">Delete</th>
                                    <th className="px-6 py-3">Edit</th>
                                    <th className="px-6 py-3">Likes</th>
                                    <th className="px-6 py-3">Reader's Comment</th>
                                </tr>
                            </thead>
                            <tbody>
                                {writerData.map((content) => (
                                    <tr key={content._id} className="border-t">
                                        <td className="px-6 py-4">{content.title}</td>
                                        <td className="px-6 py-4">{content.writingCategoryId.categoryType}</td>
                                        <td className="px-6 py-4">{new Date(content.contentTypeId.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{new Date(content.contentTypeId.createdAt).toLocaleTimeString()}</td>
                                        <td className="px-6 py-4">
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteContent(content._id)}
                                                aria-label="Delete this content"
                                            >
                                                <HiOutlineTrash className="w-5 h-5 text-red-400 hover:text-red-600" />
                                            </button>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link to={`/write/${contentType}/editor/${content._id}`} aria-label="Edit this content">
                                                <HiOutlinePencilAlt className="w-5 h-5 text-red-400 hover:text-red-600" />
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-blue-500">{content?.likes}</td>

                                        <td className="px-6 py-4 text-gray-500">
                                            {content.comments && content.comments.length > 0 ? (
                                                <>
                                                    <button
                                                        onClick={() => toggleDrawer(content._id)}
                                                        aria-label="View comments"
                                                    >
                                                        <i className="fas fa-comment-dots text-blue-500 p-4" />
                                                    </button>{content?.comments.length}
                                                    {/* Conditionally rendering CommentCard only for the content ID that has been toggled */}
                                                    {openDrawer === content._id && (
                                                        <CommentCard
                                                            openDrawer={openDrawer === content._id}
                                                            toggleDrawer={() => toggleDrawer(content._id)}
                                                            writing={content}
                                                            writer={true}
                                                        />
                                                    )}
                                                </>
                                            ) : (
                                                <p className="text-gray-500">No comments yet.</p>
                                            )}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Card layout for small screens */}
                <div className="md:hidden">
                    {writerData.map((content) => (
                        <article key={content._id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                            <header>
                                <h3 className="font-semibold text-lg text-gray-800">{content.title}</h3>
                                <p className="text-sm text-gray-600">{content.writingCategoryId.categoryType}</p>
                                <p className="text-sm text-gray-500">{new Date(content.contentTypeId.createdAt).toLocaleDateString()} - {new Date(content.contentTypeId.createdAt).toLocaleTimeString()}</p>
                            </header>

                            <div className="flex justify-between items-center mt-4">
                                <button
                                    type="button"
                                    onClick={() => handleDeleteContent(content._id)}
                                    aria-label="Delete this content"
                                    className="text-red-500 hover:text-red-700"
                                >
                                    <HiOutlineTrash className="w-5 h-5" />
                                </button>
                                <Link to={`/write/${contentType}/editor/${content._id}`} aria-label="Edit this content">
                                    <HiOutlinePencilAlt className="w-5 h-5 text-red-500 hover:text-red-700" />
                                </Link>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-blue-500">{content?.likes}</span>
                                {content.comments && content.comments.length > 0 ? (
                                    <button
                                        onClick={() => toggleDrawer(content._id)}
                                        className="text-blue-500"
                                        aria-label="View comments"
                                    >
                                        <i className="fas fa-comment-dots" />
                                    </button>
                                ) : (
                                    <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                                )}
                            </div>

                            {/* Conditionally rendering CommentCard only for the content ID that has been toggled */}
                            {openDrawer === content._id && (
                                <CommentCard
                                    openDrawer={openDrawer === content._id}
                                    toggleDrawer={() => toggleDrawer(content._id)}
                                    writing={content}
                                    writer={true}
                                />
                            )}
                        </article>
                    ))}
                </div>

            </section>
        </main>
    );
};

export default AllContent;
