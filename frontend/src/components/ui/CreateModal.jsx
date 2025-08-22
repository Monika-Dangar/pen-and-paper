import { BookOpen, Quote, Lightbulb, FileText, BookMarked, X } from "lucide-react"
import { useState, useRef } from "react"
import { Editor } from "react-draft-wysiwyg"
import { EditorState, convertToRaw } from "draft-js"
import { categories } from "../../data/index";
import { handleUploadContent } from "../../services/contentService";
import htmlToDraft from "html-to-draftjs";
import draftToHtml from "draftjs-to-html";

const contentTypes = [
    { id: "poems", label: "Poem", icon: BookOpen, description: "Express through verse and rhythm" },
    { id: "quotes", label: "Quote", icon: Quote, description: "Share wisdom and inspiration" },
    { id: "thoughts", label: "Thought", icon: Lightbulb, description: "Quick insights and reflections" },
    { id: "essays", label: "Essay", icon: FileText, description: "Deep exploration of topics" },
    { id: "stories", label: "Story", icon: BookMarked, description: "Narrative creativity" },
]

const CreateModal = ({ closeModal }) => {
    const [selectedType, setSelectedType] = useState(contentTypes[0].id)
    const [title, setTitle] = useState("")
    const [titleError, setTitleError] = useState(false);
    const [content, setContent] = useState("");
    const [editorState, setEditorState] = useState(EditorState.createEmpty())
    const [contentError, setContentError] = useState(false)
    const scrollContainerRef = useRef(null);
    const [selectedTags, setSelectedTags] = useState([])
    const [tagInput, setTagInput] = useState("")
    const [showTagDropdown, setShowTagDropdown] = useState(false)
    const [isPublishing, setIsPublishing] = useState(false);

    const handleEditorChange = (state) => {
        setEditorState(state);
        const plainText = editorState.getCurrentContent().getPlainText();
        setContent(plainText)

        if (contentError) setContentError(false);

        // scroll to bottom
        setTimeout(() => {
            const container = scrollContainerRef.current;
            if (container) {
                container.scrollTop = container.scrollHeight;
            }
        }, 0); // small delay ensures DOM has updated
    };

    const addTag = (tag) => {
        if (!selectedTags.includes(tag) && selectedTags.length < 5) {
            setSelectedTags([...selectedTags, tag])
        }
    }

    const removeTag = (tagToRemove) => {
        setSelectedTags(selectedTags.filter((tag) => tag !== tagToRemove))
    }

    const handleTagInputFocus = () => {
        setShowTagDropdown(true)
    }

    const handleTagInputBlur = () => {
        setTimeout(() => setShowTagDropdown(false), 150)
    }

    const handleTagClick = (tag) => {
        addTag(tag)
        setTagInput("")
    }

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

        // if (!category) {
        //     setCategoryError(true);
        //     isValid = false;
        // }

        // Check for empty content
        if (!rawHtml || rawHtml.trim() === "<p></p>") {
            setContentError(true);
            isValid = false;
        }

        if (!isValid) {
            setIsPublishing(false)
            return;
        }

        let postData = {};

        // if (writingData && !isNewWriting) {
        // //     // Editing existing content
        //     postData = { writingId: writingData._id };
        //     if (title !== writingData.title) postData.title = title;
        //     if (rawHtml !== writingData.content) postData.content = rawHtml;
        //     if (category !== writingData.category) postData.category = category;
        // } 
        console.log('tags: ', selectedTags);
        console.log('selectedType: ', selectedType);

        try {
            postData = {
                writerId: null,
                title,
                content: rawHtml,
                selectedTags,
                selectedType,
            };

            console.log('post Content: ', postData);
            // setIsPublishing(false)
            const response = await handleUploadContent(selectedType, postData);

            console.log('response: ', response);
            if (response) {
                // Clear inputs after successful post
                setSelectedTags([])
                setSelectedType(contentTypes[0].id)
                setEditorState(EditorState.createEmpty());
                closeModal(false)
            }

        } catch (error) {
            console.log('Publish issue! ', error);

        } finally {
            setIsPublishing(false)

        }

    };

    return (
        <>
            <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center overflow-y-auto">
                <div className="w-[95%] max-w-2xl bg-background shadow-lg border p-2 md:p-4 rounded-md sm:rounded-lg my-6">

                    <div className="py-2 bg-background">
                        <div className="flex items-center justify-between mb-2">
                            <h2 className="text-2xl font-bold text-accent/60">Create Your Literary Piece</h2>
                            <button
                                onClick={() => closeModal(false)}
                                className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                                <X className="h-4 w-4" />
                                <span className="sr-only">Close</span>
                            </button>
                        </div>

                        {/* Content Type Selection - Fixed */}
                        <div>
                            <label className="text-sm font-medium text-foreground mb-3 block">Choose your style</label>
                            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                                {contentTypes.map((type) => {
                                    const IconComponent = type.icon
                                    return (
                                        <div
                                            key={type.id}
                                            onClick={() => setSelectedType(type.id)}
                                            className={`py-1 md:py-2 bg-accent/10 px-1 md:px-2 bg- rounded-lg border cursor-pointer transition-all hover:shadow-sm ${selectedType === type.id
                                                ? "border-accent bg-accent/ shadow-sm"
                                                : "border-border hover:border-accent/50"
                                                }`}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <IconComponent
                                                    className={`h-4 w-4 ${selectedType === type.id ? "text-accent" : "text-muted-foreground"}`}
                                                />
                                                <span className={`font-medium text-sm ${selectedType === type.id ? "text-accent" : "text-muted-foreground"}`}>{type.label}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="py-2 space-y-4">
                        {/* Title */}
                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Title</label>
                            <input
                                placeholder="Give your piece a captivating title..."
                                value={title}
                                onChange={(e) => {
                                    setTitle(e.target.value)
                                    if (titleError) setTitleError(false)
                                }}
                                className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground 
    ${titleError
                                        ? 'border-red-400 bg-red-50 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-red-400'
                                        : 'border-input bg-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent'}
  `}
                            />
                        </div>

                        {/* Editor - Main scrollable content */}
                        <div>
                            <label className="text-sm font-medium text-foreground mb-2 block">Your Content</label>
                            <div ref={scrollContainerRef} className="h-[33vh] overflow-y-auto">
                                <div
                                    className={`min-h-full rounded-lg border p-3 transition-all duration-200 ${contentError ? "border-red-400 bg-red-50" : "border-input focus-within:border-accent"
                                        }`}
                                >
                                    <Editor
                                        editorState={editorState}
                                        onEditorStateChange={handleEditorChange}
                                        placeholder="Write your content here..."
                                        toolbar={{
                                            options: ["inline", "list", "textAlign"],
                                            inline: {
                                                inDropdown: false,
                                                options: ["bold", "italic", "underline", "strikethrough"],
                                            },
                                            list: {
                                                inDropdown: false,
                                                options: ["unordered", "ordered"],
                                            },
                                            textAlign: {
                                                inDropdown: false,
                                                options: ["left", "center", "right"],
                                            },
                                        }}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="relative">
                            <label className="text-sm font-medium text-foreground mb-2 block">Tags</label>

                            {/* Selected Tags Display */}
                            <div className="min-h-[44px] w-full rounded-md border border-input bg-background px-3 py-2 mb-3 flex flex-wrap gap-2 items-center">
                                {selectedTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                                    >
                                        #{tag}
                                        <button onClick={() => removeTag(tag)} className="hover:bg-primary/20 rounded-full p-0.5">
                                            <X className="h-3 w-3" />
                                        </button>
                                    </span>
                                ))}
                                <input
                                    placeholder={selectedTags.length === 0 ? "Add tags (press Enter)" : ""}
                                    value={tagInput}
                                    onChange={(e) => setTagInput(e.target.value)}
                                    onFocus={handleTagInputFocus}
                                    onBlur={handleTagInputBlur}
                                    className="flex-1 min-w-[120px] bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                                />
                            </div>

                            {showTagDropdown && (
                                <div className="absolute top-full left-0 right-0 z-10 bg-background border border-input rounded-md shadow-lg max-h-48 overflow-y-auto">
                                    <div className="p-2">
                                        <p className="text-xs text-muted-foreground mb-2 px-2">Popular tags</p>
                                        <div className="flex flex-wrap gap-1">
                                            {categories.map((tag) => (
                                                <button
                                                    key={tag}
                                                    onClick={() => handleTagClick(tag)}
                                                    disabled={selectedTags.includes(tag)}
                                                    className={`px-2 py-1 rounded-full text-xs border transition-colors ${selectedTags.includes(tag)
                                                        ? "bg-primary/10 text-primary border-primary/20 cursor-not-allowed opacity-50"
                                                        : "bg-background hover:bg-accent hover:text-accent-foreground border-border"
                                                        }`}
                                                >
                                                    {tag}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}

                            <p className="text-xs text-muted-foreground mt-2">Add up to 5 tags to help readers discover your work</p>
                        </div>
                    </div>

                    <div className="py-2 bg-background rounded-b-lg">
                        <div className="flex justify-end space-x-3">
                            {/* <button className="px-4 py-2 text-sm font-medium border border-input rounded-md hover:bg-accent hover:text-accent-foreground">
                            Save Draft
                        </button> */}
                            <button
                                onClick={handlePublish}
                                className="px-4 py-2 text-sm font-medium bg-accent text-accent-foreground rounded-md hover:bg-accent/90 disabled:opacity-50"
                                disabled={!selectedType || titleError || contentError}
                            // disabled={isPublishing}
                            >
                                {isPublishing ? (
                                    <>
                                        <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        Publishing...
                                    </>
                                ) : (
                                    <>
                                        {/* <MdOutlineSaveAlt className="w-4 h-4 mr-2" /> */}
                                        Publish
                                    </>
                                )}

                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default CreateModal
