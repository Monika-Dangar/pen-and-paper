import { lazy, Suspense } from "react";
const CommentSection = lazy(() => import("./CommentSection"))

const CommentCard = ({ openDrawer, toggleDrawer, writing, writer }) => {
    return (
        <section aria-labelledby="comments-section">
            <header>
                <h3 id="comments-section" className="text-xl font-semibold text-gray-800 mb-4">
                    Comments on {writing?.title}
                </h3>
            </header>


            <Suspense fallback={<div>Loading CommentSection...</div>}>

                <CommentSection
                    openDrawer={openDrawer}
                    toggleDrawer={toggleDrawer}
                    writing={writing}
                    writer={writer}
                />
            </Suspense>
        </section>
    );
};

export default CommentCard;
