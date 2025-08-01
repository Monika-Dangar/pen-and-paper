import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { handleUploadContent } from "../../services/contentService";
import useGetContentById from "../../hook/useGetContentById";
import FroalaEditor from "react-froala-wysiwyg";
import "froala-editor/css/froala_editor.pkgd.min.css";
import "froala-editor/css/froala_style.min.css";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { ContentState, EditorState, convertToRaw } from "draft-js";

const TextEditor = () => {
  const navigate = useNavigate();
  const { contentType, contentId } = useParams();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [isNewWriting, setIsNewWriting] = useState(false); // Track whether it's new writing or editing
  const editorRef = useRef(null);
  const [titleError, setTitleError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [contentError, setContentError] = useState("");

  const categories = [
    "Love",
    "Faith",
    "Loss",
    "Youth",
    "Fiction",
    "Dreams",
    "Nature",
    "Sad",
    "Spiritual",
    "Family",
    "Friendship",
    "Philosophy",
    "Fantasy",
    "Life",
    "Inspirational",
    "Freedom",
    "Hope",
    "Grief",
    "Mystery",
    "Happiness",
  ];

  // Fetch content for editing based on contentId
  const { writingData } = useGetContentById({ contentId });

  // Effect to load existing content when editing
  useEffect(() => {
    if (writingData) {
      setTitle(writingData.title);
      setCategory(writingData.writingCategoryId.categoryType);
      editorRef.current?.editor?.html.set(writingData.content);
      setIsNewWriting(false); // We're editing, not creating new content

    content = writingData?.content
    ? convertFromRaw(JSON.parse(writingData?.content))
    : ContentState.createFromText("");
    }
  }, [writingData]);

  const handlePublish = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const editorContent = editorRef.current?.editor?.html.get();
    // Reset previous errors
    setTitleError("");
    setCategoryError("");
    setContentError("");

    // Validate title, category, and content
    let isValid = true;

    if (!title) {
      setTitleError("Title is required");
      isValid = false;
    }

    if (!category) {
      setCategoryError("Category is required");
      isValid = false;
    }

    // Check for empty content
    if (
      !editorContent ||
      editorContent.trim() === "" ||
      editorContent === "Please writer here."
    ) {
      setContentError("Content is required");
      const editor = editorRef.current.editor;
      editor.opts.placeholderText = contentError
        ? "Content is required"
        : "Write your content here!";

      isValid = false;
    }

    if (!isValid) {
      return;
    }

    let postData = {};

    if (writingData && !isNewWriting) {
      // Editing existing content
      postData = { writingId: writingData._id };
      if (title !== writingData.title) postData.title = title;
      if (editorContent !== writingData.content)
        postData.content = editorContent;
      if (category !== writingData.category) postData.category = category;
    } else {
      // Creating new content
      postData = {
        writerId: null,
        title,
        content: editorContent,
        category,
        contentType,
      };
    }

    const response = await handleUploadContent(contentType, postData);

    if (response) {
      // Clear inputs after successful post
      setTitle("");
      setCategory("");
      editorRef.current?.editor?.html.set("");
    }
  };

  const handleCreateNew = (e) => {
    e.preventDefault();

    // Reset everything to create new content
    setTitle("");
    setCategory("");
    editorRef.current?.editor?.html.set(""); // Clear the editor content

    // Set new writing state
    setIsNewWriting(true);

    // Optionally, navigate if you want to navigate to a fresh editor view (optional)
    navigate(`/write/${contentType}/editor`);
  };

    const [editorState, setEditorState] = useState(
    EditorState.createWithContent(writingData.content)
  );
  const _contentState = ContentState.createFromText("Sample content state");
  const raw = convertToRaw(_contentState);
  const [contentState, setContentState] = useState(raw);
  const toolbar = {
    options: ["inline", "blockType", "list", "history"],
  };

  useEffect(() => {
    if (setStatus) {
      const jsonContent = convertToRaw(editorState.getCurrentContent());
      const stringedData = JSON.stringify(jsonContent);
      setDescription("description", stringedData);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setStatus]);

  useEffect(() => {
    if (editorState != EditorState.createWithContent(content)) {
      setEditorState(EditorState.createWithContent(content));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [description]);


  return (
    <>
      <section>
        <form className="flex flex-col md:flex-row justify-between items-center space-x-3 space-y-4 md:space-y-0">
          <div className="w-full md:w-3/5">
            <label htmlFor="title" className="sr-only">
              Title
            </label>
            <input
              id="title"
              type="text"
              name="title"
              className={`px-5 py-2 w-full rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                titleError ? "border-red-500" : ""
              }`}
              placeholder={`${titleError ? "Title is required" : "Title here"}`}
              value={title}
              required
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="w-full text-center md:w-2/5">
            <label htmlFor="category" className="sr-only">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              className={`px-5 py-2 rounded-md border border-gray-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                categoryError ? "border-red-500" : ""
              }`}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>{`${
                categoryError ? "Category is required" : "Select category"
              }`}</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <button
            type="button"
            onClick={handlePublish}
            className="w-3/5 md:w-1/5 md:inline-flex items-center justify-around py-2 px-5 bg-[#6595ac] hover:bg-[#9dc5d8] text-white rounded-md"
          >
            <i className="fas fa-arrow-up-from-bracket mr-2" />
            <span>Publish</span>
          </button>

          <button
            type="button"
            onClick={handleCreateNew}
            className="w-3/5 md:w-1/5 md:inline-flex items-center justify-around py-2 px-5 bg-[#6595ac] hover:bg-[#9dc5d8] text-white rounded-md"
          >
            <i className="fas fa-plus w-5 h-5" />
            <span>Create new</span>
          </button>
        </form>

        <div id="froala-editor" className="relative z-0 mt-4">
          <FroalaEditor
            ref={editorRef}
            config={{
              placeholderText: contentError
                ? "Content is required"
                : "Write your content here!",
              heightMin: 500,
              heightMax: "100vh",
            }}
          />
        </div>
      </section>

      <Editor
        editorState={editorState}
        onEditorStateChange={setEditorState}
        defaultContentState={contentState}
        onContentStateChange={setContentState}
        toolbar={toolbar}
        wrapperStyle={{
          maxHeight: "20rem",
          overflowY: "scroll",
        }}
        editorStyle={{
          paddingLeft: "0.3rem",
          paddingRight: "0.3rem",
          height: "83%",
          overflowY: "auto",
          marginTop: "0",
        }}
      />
    </>
  );
};

export default TextEditor;
