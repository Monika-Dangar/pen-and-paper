import booksImg from '../assets/bg6.png';
import { ContentCategories } from './ui/ContentCategories';
// import { TrendingContent } from './ui/TrendingContent';

const Home = () => {
    return (
        // <main className="flex items-center bg-center bg-no-repeat bg-cover min-h-screen bg-[url('./assets/bg1.png')]">
        <>
            <div className="min-h-screen bg-background">

                <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-literary-cream via-literary-warm to-background overflow-hidden">
                    {/* Background Image */}
                    <div className="absolute inset-0 z-0">
                        <img
                            src={booksImg}
                            alt="Literary books and butterflies"
                            className="w-full h-full object-cover opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/80" />
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="max-w-4xl mx-auto text-center">
                            {/* Main Heading */}
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
                                Where Stories
                                <span className="block text-transparent bg-gradient-to-r from-primary via-accent to-primary bg-clip-text">
                                    Come Alive
                                </span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
                                A platform where writers share their souls and readers explore boundless worlds.
                                Join our literary community of storytellers, poets, and dreamers.
                            </p>

                            {/* Stats */}
                            {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
                                    <div className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-primary mb-2">10K+</div>
                                        <div className="text-muted-foreground">Stories Shared</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-accent mb-2">5K+</div>
                                        <div className="text-muted-foreground">Active Writers</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl md:text-3xl font-bold text-literary-sage mb-2">50K+</div>
                                        <div className="text-muted-foreground">Engaged Readers</div>
                                    </div>
                                </div> */}
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-20 left-10 w-2 h-2 bg-primary rounded-full opacity-60 animate-pulse"></div>
                    <div className="absolute top-40 right-20 w-3 h-3 bg-accent rounded-full opacity-40 animate-pulse delay-300"></div>
                    <div className="absolute bottom-20 right-10 w-2 h-2 bg-primary rounded-full opacity-60 animate-pulse"></div>
                    <div className="absolute bottom-40 left-20 w-3 h-3 bg-accent rounded-full opacity-40 animate-pulse delay-300"></div>
                </section>
                <ContentCategories />
                {/* <TrendingContent /> */}
            </div>
        </>
    )
}

export default Home