import { BookOpen, Quote, Lightbulb, FileText, BookMarked } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const categories = [
    {
        id: 'poems',
        title: 'Poems',
        description: 'Verses that touch the soul',
        icon: BookOpen,
        color: 'from-primary to-primary/80',
        count: '2.1k posts'
    },
    {
        id: 'quotes',
        title: 'Quotes',
        description: 'Wisdom in few words',
        icon: Quote,
        color: 'from-accent to-accent/80',
        count: '1.8k posts'
    },
    {
        id: 'thoughts',
        title: 'Thoughts',
        description: 'Deep reflections on life',
        icon: Lightbulb,
        color: 'from-literary-sage to-literary-sage/80',
        count: '3.2k posts'
    },
    {
        id: 'essays',
        title: 'Essays',
        description: 'Structured explorations',
        icon: FileText,
        color: 'from-literary-coral to-literary-coral/80',
        count: '924 posts'
    },
    {
        id: 'stories',
        title: 'Short Stories',
        description: 'Brief narrative adventures',
        icon: BookMarked,
        color: 'from-literary-teal to-literary-teal/80',
        count: '1.5k posts'
    }
];

export const ContentCategories = () => {
    const [selectedCategory, setSelectedCategory] = useState("poems");
    const navigate = useNavigate()

    const handleGetContentCategory = (category) => {
        console.log('cate: ', category);

        setSelectedCategory(category)
        navigate(`/discover`)
    }

    return (
        <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                        Explore Literary
                        <span className="text-accent"> Categories</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Discover content that resonates with your interests and explore different forms of creative expression
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
                    {categories.map((category) => {
                        const IconComponent = category.icon;
                        return (
                            <div
                                key={category.id}
                            >
                                <button onClick={() => handleGetContentCategory(category.id)}>
                                    <div
                                        className="hover:shadow-lg bg-white transition-all duration-300 cursor-pointer border-none rounded-lg bg-card/50 backdrop-blur-sm hover:bg-card"
                                    >

                                        <div className="p-6 text-center">
                                            <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}>
                                                <IconComponent className="h-8 w-8 text-white" />
                                            </div>
                                            <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                {category.title}
                                            </h3>
                                            <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                                            <div className="text-xs text-muted-foreground/80 font-medium">
                                                {category.count}
                                            </div>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}