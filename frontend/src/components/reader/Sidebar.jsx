import SidebarLink from './SidebarLink'; // Import the SidebarLink component

const Sidebar = ({ toggleSidebar, setSelectedCategory, sidebarRef, handleToggleSidebar }) => {
    return (
        <>
            <nav
                className={`fixed top-0 left-0 h-full w-64 bg-[#6595ac] text-white p-6 transition-transform transform ${toggleSidebar ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:block`}
                ref={sidebarRef}
                aria-label="Main navigation"
            >
                <button
                    onClick={handleToggleSidebar}
                    className="text-white text-xl md:hidden top-0 right-0 fixed mt-2 mr-2 z-10"
                    aria-label="Close Sidebar"
                >
                    <i className='fas fa-xmark' />
                </button>

                <div className="w-full text-white p-4">
                    <h2 className="text-xl font-bold mb-6 text-center">Dashboard</h2>

                    {/* Home Link */}
                    <SidebarLink
                        icon="fas fa-home"
                        text="Home"
                        to="/"
                        ariaLabel="Go to Home page"
                    />

                    {/* Poem Link */}
                    <SidebarLink
                        icon="fas fa-book"
                        text="Poems"
                        to="poem"
                        onClick={() => setSelectedCategory('poem')}
                        ariaLabel="Go to Poem section"
                    />

                    {/* Quote Link */}
                    <SidebarLink
                        icon="fas fa-pen"
                        text="Quotes"
                        to="quote"
                        onClick={() => setSelectedCategory('quote')}
                        ariaLabel="Go to Quote section"
                    />

                    {/* Short Story Link */}
                    <SidebarLink
                        icon="fas fa-paperclip"
                        text="Essays"
                        to="essay"
                        onClick={() => setSelectedCategory('essay')}
                        ariaLabel="Go to Essay section"
                    />

                    {/* Article Link */}
                    <SidebarLink
                        icon="fas fa-lightbulb"
                        text="Thoughts"
                        to="thought"
                        onClick={() => setSelectedCategory('thought')}
                        ariaLabel="Go to Thoughts section"
                    />

                    {/* Blog Link */}
                    <SidebarLink
                        icon="fas fa-file-alt"
                        text="Short Stories"
                        to="shortStory"
                        onClick={() => setSelectedCategory('shortStory')}
                        ariaLabel="Go to Short Stories section"
                    />
                </div>
            </nav>
        </>
    );
};

export default Sidebar;
