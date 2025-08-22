import { useState, useRef, useEffect } from "react";
import { Search, Filter, BookOpen, Quote, Lightbulb, FileText, BookText } from "lucide-react";
import { categories } from "../data/index";
import useGetContentByCategory from "../hook/useGetContentByCategory";
import WritingDetail from "../components/reader/WritingDetail";
import WritingPreview from "../components/reader/WritingPreview";
import { WritingPreviewSkeleton, WritingDetailSkeleton } from '../components/loader/ReaderSkeleton'
import _ from "lodash"
import { handleIncrementLikeOfContent } from '../services/contentService'

const contentTypes = [
    { id: "all", label: "All", icon: BookOpen },
    { id: "poems", label: "Poems", icon: BookText },
    { id: "quotes", label: "Quotes", icon: Quote },
    { id: "thoughts", label: "Thoughts", icon: Lightbulb },
    { id: "essays", label: "Essays", icon: FileText },
    { id: "stories", label: "Short Stories", icon: BookOpen },
];

// const sortOptions = [
//     { value: "popular", label: "Most Popular" },
//     { value: "recent", label: "Most Recent" },
//     { value: "liked", label: "Most Liked" },
//     { value: "commented", label: "Most Commented" },
//     { value: "trending", label: "Trending" },
// ];

const Discover = () => {
    // const [sortBy, setSortBy] = useState("popular");
    const [selectedWriting, setSelectedWriting] = useState(null);
    const [liked, setLiked] = useState(false);
    const [cmt, setComment] = useState(false);
    const [searchField, setSearchField] = useState("")
    const prevSearchRef = useRef(null);

    const [filter, setFilter] = useState({
        contentType: 'all',
        tag: '',
        search: '',
    })

    useEffect(() => {
        const debounceSetFilter = _.debounce(() => {
            setFilter((prev) => ({
                ...prev,
                search: searchField,
            }));
        }, 1000); // 500 ms delay
        if (searchField || (prevSearchRef?.current && searchField === "")) {
            debounceSetFilter();
        }
        prevSearchRef.current = searchField;
        // Cleanup function to cancel the debounce if component unmounts or the value changes
        return () => debounceSetFilter.cancel();
    }, [searchField, setFilter]);


    const { data: writings, loading } = useGetContentByCategory(filter, liked, cmt);
    const handleLikeClick = async (writingId) => {
        console.log({ writingId });
        const response = await handleIncrementLikeOfContent(writingId);
        if (response) {
            setLiked(!liked);
        }
    };

    const handleSendComment = async (comment, writingId) => {
        console.log({ comment, writingId });

        // const response = await handleCommentOfContent(comment, writingId);
        // if (response) {
        //     setComment(!cmt);
        // }
    };

    const cleatAllFilter = () => {
        setSearchField('')
        setFilter({
            contentType: 'all',
            tag: '',
            search: '',
        })
        prevSearchRef.current = "";

    }
    return (
        <div className="container mx-auto px-4 py-8 bg-background">
            <div className="flex flex-col lg:flex-row gap-8">

                {/* Filters in mobile */}
                {/* <div className="md:hidden p-4 space-y-4 bg-card rounded-lg border border-border shadow-sm"> */}
                <div className="md:hidden space-y-4">
                    {/* Search */}
                    <div>
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <input
                                placeholder="Search stories, poems..."
                                onKeyUp={(e) => {
                                    if (e.key === "Enter") {
                                        setFilter((prev) => {
                                            let updatedFilter = { ...prev };
                                            if (searchField === "") {
                                                updatedFilter = {
                                                    ...updatedFilter,
                                                };
                                                return updatedFilter;
                                            }
                                            updatedFilter = {
                                                ...updatedFilter,
                                                search: searchField,
                                            };
                                            return updatedFilter;
                                        });
                                    }
                                }}
                                onChange={(e) => setSearchField(e.target.value.trim())}
                                className="pl-10 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            />
                        </div>
                    </div>

                    {/* Popular Tags */}
                    <div>
                        <p className="text-xs text-muted-foreground mb-2">Popular Tags</p>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((tag) => (
                                <button
                                    key={tag}
                                    onClick={() =>
                                        setFilter((prev) => ({
                                            ...prev,
                                            tag: prev.tag === tag ? "" : tag,
                                        }))
                                    }
                                    className={`cursor-pointer rounded-full px-2 py-1 transition-colors text-xs
            ${tag === filter.tag
                                            ? 'bg-accent text-white font-semibold'
                                            : 'bg-accent/60 text-accent-foreground hover:bg-accent/40'}
          `}
                                >
                                    {tag}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Filters Sidebar */}
                <div className="w-full lg:w-80 space-y-6 lg:block hidden">
                    <div className="bg-card rounded-lg p-6 border border-border">
                        <div className="flex justify-between">
                            <div className="flex items-center gap-2 mb-4">
                                <Filter className="h-5 w-5 text-accent" />
                                <h3 className="font-semibold text-foreground">Filters</h3>
                            </div>
                            <button onClick={cleatAllFilter}
                                className="font-semibold px-1 rounded-md bg-accent/80 text-accent-foreground">Clear filters</button>
                        </div>

                        {/* Search */}
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">Search</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <input
                                        placeholder="Search stories, poems..."
                                        onKeyUp={(e) => {
                                            if (e.key === "Enter") {
                                                setFilter((prev) => {
                                                    let updatedFilter = { ...prev };
                                                    if (searchField === "") {
                                                        updatedFilter = {
                                                            ...updatedFilter,
                                                        };
                                                        return updatedFilter;
                                                    }
                                                    updatedFilter = {
                                                        ...updatedFilter,
                                                        search: searchField,
                                                    };
                                                    return updatedFilter;
                                                });
                                            }
                                        }}
                                        onChange={(e) => setSearchField(e.target.value.trim())}
                                        className="flex pl-10 h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

                                    />
                                </div>
                            </div>

                            {/* Content Type */}
                            <div>
                                <label className="text-sm font-medium text-foreground mb-3 block">Content Type</label>
                                <div className="space-y-2">
                                    {contentTypes.map((type) => {
                                        const Icon = type.icon;
                                        return (
                                            <button
                                                key={type.id}
                                                className={`w-full rounded-lg p-3 flex items-center justify-start ${filter.contentType === type.id
                                                    ? "text-accent font-bold"
                                                    : "text-foreground hover:text-accent"
                                                    }`}
                                                onClick={() =>
                                                    setFilter((prev) => ({
                                                        ...prev,
                                                        contentType: type.id,
                                                    }))
                                                }
                                            >
                                                <Icon className="h-4 w-4 mr-2" />
                                                {type.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Category */}
                            {/* <div>
                                    <label className="text-sm font-medium text-foreground mb-2 block">Category</label>
                                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="All categories" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All categories</SelectItem>
                                            {categories.map((category) => (
                                                <SelectItem key={category} value={category.toLowerCase()}>
                                                    {category}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div> */}

                            {/* Sort By */}
                            {/* <div>
                                    <label className="text-sm font-medium text-foreground mb-2 block">Sort By</label>
                                    <Select value={sortBy} onValueChange={setSortBy}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {sortOptions.map((option) => (
                                                <SelectItem key={option.value} value={option.value}>
                                                    {option.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div> */}

                            {/* Popular Tags */}
                            <div>
                                <label className="text-sm font-medium text-foreground mb-3 block">Popular Tags</label>
                                <div className="flex flex-wrap gap-2">
                                    {/* {categories.slice(0, 8).map((tag) => ( */}
                                    {categories.map((tag) => (
                                        <button
                                            key={tag}
                                            onClick={() =>
                                                setFilter((prev) => ({
                                                    ...prev,
                                                    tag: prev.tag === tag ? "" : tag,

                                                }))
                                            }
                                            className={`cursor-pointer rounded-full px-2 py-1 transition-colors
  ${tag === filter.tag
                                                    ? 'bg-accent text-white font-semibold'
                                                    : 'bg-accent/60 text-accent-foreground hover:bg-accent/40'}`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="mb-6">
                        <h1 className="text:md md:text-xl font-bold text-foreground mb-2">
                            Discover Literary Content
                        </h1>
                        <p className="text-muted-foreground">
                            Explore stories, poems, and thoughts from our community of writers
                        </p>

                        {loading ? (
                            <>
                                <WritingPreviewSkeleton />
                                <WritingDetailSkeleton />
                            </>
                        ) : (

                            writings.length === 0 && !loading ? (
                                <div className="mt-52">
                                    <p className="text-center text-gray-500">No writings available in this category. Please check back later!</p>
                                </div>
                            ) : (
                                <>
                                    <section className="space-y-10 overflow-y-auto">
                                        {writings.map((writing) => (
                                            <WritingPreview
                                                key={writing._id}
                                                writing={writing}
                                                onClick={() => setSelectedWriting(writing)}
                                                likeClick={handleLikeClick}
                                                sendComment={handleSendComment}
                                            />
                                        ))}
                                    </section>

                                    {selectedWriting && (
                                        <section aria-labelledby="writing-details" className="mt-10">
                                            <WritingDetail writing={selectedWriting} />
                                        </section>
                                    )}
                                </>

                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );

}

export default Discover
