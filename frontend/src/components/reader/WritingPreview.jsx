import DOMPurify from 'dompurify';
import { lazy, Suspense, useState } from 'react';
const CommentSection = lazy(() => import('../comment/CommentSection'))
import { AuthModal } from "../ui/AuthModal"

const authType = [
    { type: 'login' },
    { type: 'signup' }
]

const WritingPreview = ({ writing, likeClick, sendComment }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [authMode, setAuthMode] = useState(authType[0].type);
    const [openDrawer, setOpenDrawer] = useState(false);  // State to control drawer visibility
    const authStatus = localStorage.getItem("authToken");

    // Sanitize the HTML content before rendering
    const sanitizedContent = DOMPurify.sanitize(writing.content);

    const handleSendComment = (writingId, comment) => {
        sendComment(comment, writingId);
    };

    // const handleLike = (writingId) => {
    //     setIsLiked(true);
    //     likeClick(writingId);
    // };

    const toggleDrawer = () => {
        setOpenDrawer((prev) => !prev); // Toggle the drawer visibility
    };

    const handleLike = () => {
        if (!authStatus) {
            setIsAuthOpen(true)
            setAuthMode(authType[0].type);
        } else {
            setIsLiked(true);
            likeClick(writingId);
        }
    }

    const handleCommnet = () => {
        if (!authStatus) {
            setIsAuthOpen(true)
            setAuthMode(authType[0].type);
        } else {
            toggleDrawer()
        }
    }

    return (
        <>
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="flex justify-between items-start ">

                    <div className='flex gap-1'>
                        {writing?.writingCategoryId?.map((tags) => (
                            <p key={tags?._id} className="text-xs text-gray-700 font-semibold bg-blue-100 py-1 px-2 rounded-full">
                                {tags?.categoryType}
                            </p>
                        ))}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 text-center">{writing?.title}</h3>
                    <p className="text-xs text-gray-500 mt-2">
                        Published on: {new Date(writing?.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    By <span className="font-semibold text-gray-800">{writing?.writerId?.username}</span>
                </p>

                {/* Content Preview */}
                <div
                    className="text-sm text-gray-600 mt-2"
                    dangerouslySetInnerHTML={{ __html: sanitizedContent }}
                />

                <div className="mt-2 flex flex-row justify-between items-center">
                    {/* Like Button */}
                    <button
                        // onClick={() => handleLike(writing._id)}
                        onClick={handleLike}
                        className="flex items-center space-x-2 text-gray-500"
                        aria-label={isLiked ? 'Unlike this writing' : 'Like this writing'}
                    >
                        <i
                            className={`fas fa-heart cursor-pointer text-[#b9413a]`}
                        />
                        <span>{writing?.likeCount}</span>
                    </button>

                    {/* Comment Button */}
                    <button
                        // onClick={toggleDrawer}
                        onClick={handleCommnet}
                        aria-expanded={openDrawer}  // Indicates whether the comment section is expanded
                        aria-controls="comment-section"  // Reference to the comment section
                        className="flex items-center space-x-2"
                    >
                        <i className="fas fa-comment-dots text-blue-500" />
                        <span>{writing?.comments?.length}</span>
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

            {/*Auth Modal */}
            {isAuthOpen && (
                <AuthModal mode={authMode} onModeChange={setAuthMode} closeAuthModal={setIsAuthOpen} />
            )}
        </>
    );
};

export default WritingPreview;
