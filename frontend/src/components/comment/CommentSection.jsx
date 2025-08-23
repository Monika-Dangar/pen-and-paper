import { useState } from "react";

const CommentSection = ({ openDrawer, toggleDrawer, writing, handleSendComment, writer }) => {
    const [comment, setComment] = useState('');

    const handleComment = (writingId) => {
        handleSendComment(writingId, comment);
        setComment('');
    }

    if (!openDrawer) return null; // Don't render anything if the drawer is closed

    return (
        <>
            {/* Background overlay */}
            <div
                className="fixed inset-0 bg-black opacity-50 z-60"
                onClick={toggleDrawer} // Close drawer when clicking outside
                aria-label="Close comment section"
            ></div>

            <div
                id="drawer-swipe"
                className="fixed z-50 w-full bg-white border-t border-gray-200 rounded-t-lg transition-transform transform bottom-0 left-0 right-0"
                style={{ transform: openDrawer ? 'translateY(0)' : 'translateY(100%)' }}
            >
                <div className="p-4 flex justify-between">
                    <h5 className="text-base font-medium text-gray-500">Comments</h5>
                    <button onClick={toggleDrawer} className="hover:text-gray-400" aria-label="Close comments">
                        <i className="fas fa-xmark" />
                    </button>
                </div>

                {/* Comments and input section */}
                <div className="p-4 space-y-4 overflow-y-auto max-h-[400px]">
                    {/* Display existing comments */}
                    {writing?.comments && writing?.comments.length > 0 ? (
                        writing?.comments.map((comment) => (
                            <div key={comment._id} className="bg-gray-100 p-2 rounded-lg flex justify-between">
                                <p className="text-gray-600">{comment.comment}</p>
                                <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}

                    {/* Only show this part if the user is not the writer */}
                    {!writer && (
                        <div className="mt-2 flex items-center space-x-2">
                            {/* Comment input */}
                            <input
                                type="text"
                                placeholder="Write a comment..."
                                className="border border-gray-300 p-2 rounded-md flex-1"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                aria-label="Write a comment"
                            />
                            {/* Submit button */}
                            <button
                                onClick={() => handleComment(writing?._id)} // handle submit
                                className="p-2 bg-[#6595ac] text-white rounded-md"
                                aria-label="Send comment"
                            >
                                <i className="fas fa-paper-plane w-8 h-5" />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default CommentSection;
