// import { Heart, MessageCircle, Share2, BookOpen, TrendingUp } from "lucide-react";

// const trendingPosts = [
//     {
//         id: 1,
//         title: "The Fetter of Love",
//         excerpt: "Let only that little be left of me whereby I may name thee my all. Let only that little be left of my will whereby I may feel thee on every side...",
//         author: "John Williams",
//         authorInitials: "JW",
//         category: "Love",
//         type: "Poem",
//         likes: 142,
//         comments: 23,
//         // readTime: "2 min read",
//         timeAgo: "2h ago",
//         isPopular: true
//     },
//     {
//         id: 2,
//         title: "Under the Greenwood Tree",
//         excerpt: "Who loves to lie with me, And turn his merry note Unto the sweet bird's throat, Come hither, come hither, come hither...",
//         author: "Sarah Chen",
//         authorInitials: "SC",
//         category: "Nature",
//         type: "Poem",
//         likes: 89,
//         comments: 12,
//         // readTime: "1 min read",
//         timeAgo: "4h ago",
//         isPopular: false
//     },
//     {
//         id: 3,
//         title: "Echoes of Tomorrow",
//         excerpt: "In the silence between heartbeats, I find the rhythm of dreams yet to be born. Each moment carries the weight of infinite possibilities...",
//         author: "Marcus Rodriguez",
//         authorInitials: "MR",
//         category: "Philosophy",
//         type: "Thought",
//         likes: 203,
//         comments: 34,
//         // readTime: "3 min read",
//         timeAgo: "6h ago",
//         isPopular: true
//     },
//     {
//         id: 4,
//         title: "The Art of Letting Go",
//         excerpt: "Sometimes the most courageous thing we can do is release our grip on what we thought our life should look like and embrace what it actually is...",
//         author: "Emma Thompson",
//         authorInitials: "ET",
//         category: "Life",
//         type: "Essay",
//         likes: 156,
//         comments: 28,
//         // readTime: "5 min read",
//         timeAgo: "8h ago",
//         isPopular: false
//     }
// ];

// export const TrendingContent = () => {
//     return (
//         <section className="py-16 bg-background">
//             <div className="container mx-auto px-4">
//                 <div className="flex items-center justify-between mb-12">
//                     <div>
//                         <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
//                             <TrendingUp className="h-8 w-8 text-accent" />
//                             Trending
//                             <span className="text-accent">Now</span>
//                         </h2>
//                         <p className="text-muted-foreground text-lg">
//                             Most loved stories and thoughts from our community
//                         </p>
//                     </div>
//                     <button className="hidden md:flex">
//                         View All Trending
//                     </button>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     {trendingPosts.map((post) => (
//                         <div
//                             key={post.id}
//                             className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm"
//                         >
//                             <div className="flex items-center justify-between mb-4">
//                                 <div className="pb-3">
//                                     <div className="flex flex-col space-y-1.5 p-6">

//                                         <div className="flex items-start justify-between">
//                                             <div className="flex items-center space-x-3">
//                                                 <div className="h-10 w-10">
//                                                     <div className="shrink-0 h-10 w-10 overflow-hidden rounded-full">
//                                                         <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
//                                                             <div className="bg-gradient-to-r from-primary to-accent text-white text-sm font-medium">
//                                                                 {post.authorInitials}
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div>
//                                                     <p className="font-medium text-foreground">{post.author}</p>
//                                                     <p className="text-sm text-muted-foreground">{post.timeAgo}</p>
//                                                 </div>
//                                             </div>
//                                             <div className="flex items-center space-x-2">
//                                                 <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
//                                                     <span className="text-xs">
//                                                         {post.type}
//                                                     </span>
//                                                 </span>
//                                                 <span

//                                                     className="text-xs border-primary/30 text-primary"
//                                                 >
//                                                     {post.category}
//                                                 </span>
//                                                 {post.isPopular && (
//                                                     <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
//                                                         <span className="text-xs bg-gradient-to-r from-primary to-primary/80">
//                                                             Popular
//                                                         </span>
//                                                     </span>
//                                                 )}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="pt-0">
//                                         <div className="p-6 pt-0">


//                                             <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-accent transition-colors line-clamp-2">
//                                                 {post.title}
//                                             </h3>

//                                             <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed">
//                                                 {post.excerpt}
//                                             </p>

//                                             <div className="flex items-center justify-between">
//                                                 <div className="flex items-center space-x-4 text-sm text-muted-foreground">
//                                                     <div className="flex items-center space-x-1">
//                                                         <Heart className="h-4 w-4" />
//                                                         <span>{post.likes}</span>
//                                                     </div>
//                                                     <div className="flex items-center space-x-1">
//                                                         <MessageCircle className="h-4 w-4" />
//                                                         <span>{post.comments}</span>
//                                                     </div>
//                                                     {/* <div className="flex items-center space-x-1">
//                                                         <BookOpen className="h-4 w-4" />
//                                                         <span>{post.readTime}</span>
//                                                     </div> */}
//                                                 </div>


//                                             </div>

//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>

//                         </div>
//                     ))}
//                 </div>

//             </div >
//         </section >
//     );
// }

import { Heart, MessageCircle, Share2, TrendingUp } from "lucide-react"

const trendingPosts = [
    {
        id: 1,
        title: "The Fetter of Love",
        excerpt:
            "Let only that little be left of me whereby I may name thee my all. Let only that little be left of my will whereby I may feel thee on every side...",
        author: "John Williams",
        authorInitials: "JW",
        category: "Love",
        type: "Poem",
        likes: 142,
        comments: 23,
        timeAgo: "2h ago",
        isPopular: true,
    },
    {
        id: 2,
        title: "Under the Greenwood Tree",
        excerpt:
            "Who loves to lie with me, And turn his merry note Unto the sweet bird's throat, Come hither, come hither, come hither...",
        author: "Sarah Chen",
        authorInitials: "SC",
        category: "Nature",
        type: "Poem",
        likes: 89,
        comments: 12,
        timeAgo: "4h ago",
        isPopular: false,
    },
    {
        id: 3,
        title: "Echoes of Tomorrow",
        excerpt:
            "In the silence between heartbeats, I find the rhythm of dreams yet to be born. Each moment carries the weight of infinite possibilities...",
        author: "Marcus Rodriguez",
        authorInitials: "MR",
        category: "Philosophy",
        type: "Thought",
        likes: 203,
        comments: 34,
        timeAgo: "6h ago",
        isPopular: true,
    },
    {
        id: 4,
        title: "The Art of Letting Go",
        excerpt:
            "Sometimes the most courageous thing we can do is release our grip on what we thought our life should look like and embrace what it actually is...",
        author: "Emma Thompson",
        authorInitials: "ET",
        category: "Life",
        type: "Essay",
        likes: 156,
        comments: 28,
        timeAgo: "8h ago",
        isPopular: false,
    },
]

export const TrendingContent = () => {
    return (
        <section className="py-16 bg-background">
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between mb-12">
                    <div>
                        <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center gap-3">
                            <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-primary" />
                            Trending
                            <span className="text-primary">Now</span>
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                            Most loved stories and thoughts from our community
                        </p>
                    </div>
                    <button className="hidden md:flex text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        View All Trending
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                    {trendingPosts.map((post) => (
                        <div
                            key={post.id}
                            className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-border/50 hover:border-primary/20 bg-card/50 backdrop-blur-sm rounded-lg overflow-hidden"
                        >
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center space-x-3">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center text-primary-foreground text-sm font-medium">
                                            {post.authorInitials}
                                        </div>
                                        <div>
                                            <p className="font-medium text-foreground text-sm">{post.author}</p>
                                            <p className="text-xs text-muted-foreground">{post.timeAgo}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="inline-flex items-center rounded-full border border-border px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                                            {post.type}
                                        </span>
                                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                                            {post.category}
                                        </span>
                                        {post.isPopular && (
                                            <span className="inline-flex items-center rounded-full bg-gradient-to-r from-primary to-primary/80 px-2.5 py-0.5 text-xs font-medium text-primary-foreground">
                                                Popular
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <h3 className="font-serif text-lg sm:text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-2">
                                    {post.title}
                                </h3>

                                <p className="text-muted-foreground mb-4 line-clamp-3 leading-relaxed text-sm sm:text-base">
                                    {post.excerpt}
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                        <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                                            <Heart className="h-4 w-4" />
                                            <span>{post.likes}</span>
                                        </button>
                                        <button className="flex items-center space-x-1 hover:text-primary transition-colors">
                                            <MessageCircle className="h-4 w-4" />
                                            <span>{post.comments}</span>
                                        </button>
                                    </div>
                                    <button className="text-muted-foreground hover:text-primary transition-colors">
                                        <Share2 className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
