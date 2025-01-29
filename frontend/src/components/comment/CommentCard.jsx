import CommentSection from "./CommentSection";

const CommentCard = ({ openDrawer, toggleDrawer, writing, writer }) => {
    return (
        <section aria-labelledby="comments-section">
            {/* Optional: Add a header for context */}
            <header>
                <h3 id="comments-section" className="text-xl font-semibold text-gray-800 mb-4">
                    Comments on {writing?.title}
                </h3>
            </header>

            {/* Pass necessary props to CommentSection */}
            <CommentSection
                openDrawer={openDrawer}
                toggleDrawer={toggleDrawer}
                writing={writing}
                writer={writer}
            />
        </section>
    );
};

export default CommentCard;
