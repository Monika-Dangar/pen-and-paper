import { Editor } from "react-draft-wysiwyg";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import useGetContentById from "../../hook/useGetContentById";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";
import { categories } from "../../data/index";
import { handleUploadContent } from "../../services/contentService";
import { MdOutlineSaveAlt, MdEdit } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
// import { FiFileText } from "react-icons/fi";
import { IoAlertCircleOutline } from "react-icons/io5";


const EditorComponent = () => {
    const { contentType, contentId } = useParams();
    const navigate = useNavigate();
    const [titleError, setTitleError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);
    const [contentError, setContentError] = useState(false);
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [isNewWriting, setIsNewWriting] = useState(false); // Track whether it's new writing or editing
    const [isPublishing, setIsPublishing] = useState(false);

    // Fetch content for editing based on contentId
    const { writingData } = useGetContentById({ contentId });
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    // Effect to load existing content when editing
    useEffect(() => {
        if (writingData?.content) {
            setTitle(writingData.title);
            setCategory(writingData.writingCategoryId.categoryType);

            const blocksFromHtml = htmlToDraft(writingData.content);
            if (blocksFromHtml) {
                const { contentBlocks, entityMap } = blocksFromHtml;
                const contentState = ContentState.createFromBlockArray(
                    contentBlocks,
                    entityMap
                );
                const newEditorState = EditorState.createWithContent(contentState);
                setEditorState(newEditorState);
                setIsNewWriting(false); // We're editing, not creating new content
            }
        }
    }, [writingData]);

    const handlePublish = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        // Reset previous errors
        // setTitleError(false);
        // setCategoryError(false);
        // setContentError(false);
        setIsPublishing(true)
        const rawHtml = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        console.log("HTML to send:", rawHtml);

        // Validate title, category, and content
        let isValid = true;

        if (!title) {
            setTitleError(true);
            isValid = false;
        }

        if (!category) {
            setCategoryError(true);
            isValid = false;
        }

        // Check for empty content
        if (!rawHtml || rawHtml.trim() === "<p></p>") {
            setContentError(true);
            // const contentState = ContentState.createFromText("Content is required");
            // const newEditorState = EditorState.createWithContent(contentState);

            // setEditorState(newEditorState);
            isValid = false;
        }

        if (!isValid) {
            setIsPublishing(false)
            return;
        }

        let postData = {};

        if (writingData && !isNewWriting) {
            // Editing existing content
            postData = { writingId: writingData._id };
            if (title !== writingData.title) postData.title = title;
            if (rawHtml !== writingData.content) postData.content = rawHtml;
            if (category !== writingData.category) postData.category = category;
        } else {
            // Creating new content
            postData = {
                writerId: null,
                title,
                content: rawHtml,
                category,
                contentType,
            };
        }

        const response = await handleUploadContent(contentType, postData);

        if (response) {
            setIsPublishing(false)
            // Clear inputs after successful post
            setTitle('');
            setCategory(false);
            setEditorState(EditorState.createEmpty()); // ✅ Clear editor content
        }
    };

    const handleCreateNew = (e) => {
        e.preventDefault();
        // Reset everything to create new content
        setTitle("");
        setCategory("");
        setEditorState(EditorState.createEmpty()); // ✅ Clear editor content

        // Set new writing state
        setIsNewWriting(true);

        // Optionally, navigate if you want to navigate to a fresh editor view (optional)
        navigate(`/write/${contentType}/editor`);
    };

    return (
        <>
            <div className="h-full overflow-y-hidden">
                {/* Main Content */}
                <div className="bg-white p-4 rounded-xl shadow-lg">
                    {/* Title and Category Row */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
                        {/* Title Input */}
                        <div className="lg:col-span-2 space-y-2">
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <div className="relative">
                                <input
                                    id="title"
                                    type="text"
                                    name="title"
                                    className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-0 ${titleError
                                        ? "border-red-400 bg-red-50 focus:border-red-500"
                                        : "border-gray-200 focus:border-blue-500 bg-white"
                                        }`}
                                    placeholder="Enter your title here..."
                                    value={title}
                                    onChange={(e) => {
                                        setTitle(e.target.value);
                                        if (titleError) setTitleError(false);
                                    }}
                                />
                                {titleError && (
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <IoAlertCircleOutline className="h-5 w-5 text-red-500" />
                                    </div>
                                )}
                            </div>
                            {titleError && (
                                <p className="text-sm text-red-600 flex items-center space-x-1">
                                    <IoAlertCircleOutline className="w-4 h-4" />
                                    <span>Title is required</span>
                                </p>
                            )}
                        </div>

                        {/* Category Select */}
                        <div className="space-y-2">
                            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                                Category
                            </label>
                            <div className="relative">
                                <select
                                    id="category"
                                    name="category"
                                    className={`appearance-none w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-0 bg-white ${categoryError
                                        ? "border-red-400 bg-red-50 focus:border-red-500"
                                        : "border-gray-200 focus:border-blue-500"
                                        }`}
                                    value={category}
                                    onChange={(e) => {
                                        setCategory(e.target.value);
                                        if (categoryError) setCategoryError(false);
                                    }}
                                >
                                    <option value="" disabled>Select category</option>
                                    {categories.map((cat) => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                                {/* Custom dropdown arrow */}
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                    <svg
                                        className="w-5 h-5 text-gray-500"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>

                                {categoryError && (
                                    <div className="absolute inset-y-0 right-8 pr-3 flex items-center">
                                        <IoAlertCircleOutline className="h-5 w-5 text-red-500" />
                                    </div>
                                )}
                            </div>
                            {categoryError && (
                                <p className="text-sm text-red-600 flex items-center space-x-1">
                                    <IoAlertCircleOutline className="w-4 h-4" />
                                    <span>Category is required</span>
                                </p>
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div className="md:h-12 flex flex-col sm:flex-row sm:row-span-2 gap-3 sm:justify-end">
                            <button
                                type="button"
                                onClick={handleCreateNew}
                                disabled={!writingData?.content}
                                className={`inline-flex items-center justify-center px-6 py-3 border rounded-lg text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
        ${writingData?.content
                                        ? 'bg-white hover:bg-gray-50 text-gray-700 border-gray-300'
                                        : 'bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed'
                                    }`}
                            >
                                <FaPlus className="w-4 h-4 mr-2" />
                                Create New
                            </button>

                            <button
                                type="button"
                                onClick={handlePublish}
                                disabled={isPublishing}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-lg text-sm font-medium text-white bg-[#69abca] hover:bg-[#4c7c92] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
                            >
                                {isPublishing ? (
                                    <>
                                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Publishing...
                                    </>
                                ) : (
                                    <>
                                        <MdOutlineSaveAlt className="w-4 h-4 mr-2" />
                                        Publish
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Editor Section */}
                <div className="bg-white p-4 rounded-xl mt-4 shadow-lg flex-grow">
                    <div className="flex items-center space-x-2 mb-2">
                        <MdEdit className="w-5 h-5 text-gray-600" />
                        <h3 className="font-medium text-gray-900">Content Editor</h3>
                    </div>

                    {/* Editor Wrapper */}
                    <div className="p-2  overflow-y-auto">
                        <div className={`min-h-[300px] max-h-[500px] overflow-y-auto rounded-lg border-2 p-2 transition-all duration-200 h-full ${contentError
                            ? 'border-red-400 bg-red-50'
                            : 'border-gray-200 focus-within:border-blue-500'
                            }`}>
                            <Editor
                                editorState={editorState}
                                onEditorStateChange={(state) => {
                                    setEditorState(state);
                                    if (contentError) setContentError(false);
                                }}
                                placeholder="Write your content here..."
                                toolbar={{
                                    options: ['inline', 'list', 'textAlign'],
                                    inline: {
                                        inDropdown: false,
                                        options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                                    },
                                    list: {
                                        inDropdown: false,
                                        options: ['unordered', 'ordered'],
                                    },
                                    textAlign: {
                                        inDropdown: false,
                                        options: ['left', 'center', 'right', 'justify'],
                                    },
                                }}
                            />
                        </div>

                        {contentError && (
                            <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                                <IoAlertCircleOutline className="w-4 h-4" />
                                <span>Content is required</span>
                            </p>
                        )}
                    </div>
                </div>

            </div>
        </>
    );
};

export default EditorComponent;
