import DOMPurify from 'dompurify';

const WritingDetail = ({ writing }) => {
    // Sanitize content to prevent XSS attacks
    const sanitizedContent = DOMPurify.sanitize(writing.content);

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h1 className="text-3xl font-bold text-gray-900">{writing.title}</h1> {/* Use h1 for the main title of the page */}

            {/* Content */}
            <div
                className="text-gray-600 mt-4 text-sm"
                dangerouslySetInnerHTML={{ __html: sanitizedContent }} // Render sanitized content
            />

            <div className="mt-6">
                <p className="text-sm text-gray-500">
                    Written by <span className="font-semibold">{writing.author}</span>
                </p>
                <p className="text-sm text-gray-500">
                    Total Likes: <span className="font-semibold">{writing.likes}</span>
                </p>
            </div>
        </div>
    );
};

export default WritingDetail;
