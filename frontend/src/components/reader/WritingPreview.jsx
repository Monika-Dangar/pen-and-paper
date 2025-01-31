import DOMPurify from 'dompurify';
import { lazy, Suspense, useState } from 'react';
const CommentSection = lazy(() => import('../comment/CommentSection'))

const WritingPreview = ({ writing, likeClick, sendComment }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);  // State to control drawer visibility

    // Sanitize the HTML content before rendering
    const sanitizedContent = DOMPurify.sanitize(writing.content);

    const handleSendComment = (writingId, comment) => {
        sendComment(comment, writingId);
    };

    const handleLike = (writingId) => {
        setIsLiked(true);
        likeClick(writingId);
    };

    const toggleDrawer = () => {
        setOpenDrawer((prev) => !prev); // Toggle the drawer visibility
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <div className="flex justify-between items-start">
                <p className="text-xs text-gray-700 font-semibold bg-blue-100 py-1 px-2 rounded-full">
                    {writing?.writingCategoryId?.categoryType}
                </p>
                <h3 className="text-xl font-semibold text-gray-800 text-center">{writing.title}</h3>
                <p className="text-xs text-gray-500 mt-2">
                    Published on: {new Date(writing.createdAt).toLocaleDateString()}
                </p>
            </div>
            <p className="text-xs text-gray-500 mt-2">
                By <span className="font-semibold text-gray-800">{writing.writerId?.username}</span>
            </p>

            {/* Content Preview */}
            <div
                className="text-sm text-gray-600 mt-2"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />

            <div className="mt-2 flex flex-row justify-between items-center">
                {/* Like Button */}
                <button
                    onClick={() => handleLike(writing._id)}
                    className="flex items-center space-x-2 text-gray-500"
                    aria-label={isLiked ? 'Unlike this writing' : 'Like this writing'}
                >
                    <i
                        className={`fas fa-heart cursor-pointer ${isLiked ? 'text-[#b9413a]' : ''}`}
                    />
                    <span>{writing?.likes}</span>
                </button>

                {/* Comment Button */}
                <button
                    onClick={toggleDrawer}
                    aria-expanded={openDrawer}  // Indicates whether the comment section is expanded
                    aria-controls="comment-section"  // Reference to the comment section
                    className="flex items-center space-x-2"
                >
                    <i className="fas fa-comment-dots text-blue-500" />
                    <span>{writing.comments.length}</span>
                </button>
            </div>

            {/* Comment Section Drawer */}
            <div id="comment-section">
                <Suspense fallback={<div>Loading CommentSection...</div>}>
                    <CommentSection
                        openDrawer={openDrawer}
                        toggleDrawer={toggleDrawer}
                        writing={writing}
                        handleSendComment={handleSendComment}
                    />
                </Suspense>
            </div>
        </div>
    );
};

export default WritingPreview;
