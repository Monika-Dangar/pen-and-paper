/* eslint-disable react/prop-types */
import { lazy, Suspense } from "react";
const CommentSection = lazy(() => import("./CommentSection"))

const CommentCard = ({ openDrawer, toggleDrawer, writing, writer }) => {
    return (
        <section aria-labelledby="comments-section">
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
