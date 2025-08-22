import { PenTool, Search, Menu, X, CircleUserRound } from "lucide-react"
import { useState } from "react"
import CreateModal from "./ui/CreateModal"
import { AuthModal } from "./ui/AuthModal"
import { Link } from "react-router-dom"
import { useLogout } from "../hook/useLogout";

const authType = [
    { type: 'login' },
    { type: 'signup' }
]

const Header = () => {
    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [isAuthOpen, setIsAuthOpen] = useState(false)
    const [authMode, setAuthMode] = useState(authType[0].type);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const authStatus = localStorage.getItem("authToken");
    const logoutWriter = useLogout();

    const openCreateModal = (flag) => {

        if (flag && authStatus) {
            setIsCreateOpen(true)
        } else {
            setIsAuthOpen(true)
        }

    }
    return (
        <>
            <header className="bg-card/80 backdrop-blur-lg border-b border-literary-sage/20 sticky top-0 z-50">
                <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                    {/* Logo */}
                    <Link to={'/'} className="flex items-center space-x-2">
                        <PenTool className="h-6 w-6 text-accent" />
                        <span className="text-lg md:text-2xl font-bold text-foreground">Pen & Paper</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8  mx-auto">
                        <Link to={'/discover'}
                            className="inline-flex items-center text-md font-medium hover:text-accent">
                            <Search className="h-4 w-4 mr-2" />
                            Discover
                        </Link>

                        <button
                            // onClick={() => setIsCreateOpen(true)}
                            onClick={() => openCreateModal(true)}
                            className="inline-flex items-center justify-center text-md font-medium hover:text-accent"
                        >
                            <PenTool className="h-4 w-4 mr-2" />
                            Create
                        </button>
                    </nav>

                    {/* Auth Buttons */}
                    {!authStatus && (
                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                onClick={() => {
                                    setIsAuthOpen(true)
                                    setAuthMode(authType[0].type);
                                }}
                                className="inline-flex items-center h-10 px-4 py-2 justify-center gap-2 rounded-md text-md font-medium border-none shadow-md bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground"
                            >
                                Sign in
                            </button>
                        </div>
                    )}

                    {authStatus && (
                        <div className="hidden md:flex items-center space-x-4">
                            <button
                                onClick={logoutWriter}
                                className="inline-flex items-center h-10 px-4 py-2 justify-center gap-2 rounded-md text-md font-medium border-none shadow-md bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground"
                            >
                                Sign out
                            </button>
                        </div>

                    )}


                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden inline-flex items-center justify-center gap-2 text-sm font-medium h-10 w-10"
                    >
                        {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {isMobileMenuOpen && (
                    <div className="md:hidden fixed top-15 right-0 w-3/5 bg-card/95 bg-lack backdrop-blur-lg border-literary-sage/20">
                        <div className="container mx-auto px-4 py-4 space-y-2">
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full flex items-center px-4 py-3 text-md font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
                            >
                                <Search className="h-4 w-4 mr-3" />
                                <span>Discover</span>
                            </button>

                            <button
                                onClick={() => {
                                    setIsCreateOpen(true)
                                    setIsMobileMenuOpen(false)
                                }}
                                className="w-full flex items-center px-4 py-3 text-md font-medium hover:bg-accent hover:text-accent-foreground rounded-md"
                            >
                                <PenTool className="h-4 w-4 mr-3" />
                                Create
                            </button>

                            {/* <div className="border-literary-sage/20"> */}
                            <button
                                onClick={() => {
                                    setIsAuthOpen(true)
                                    setIsMobileMenuOpen(false)
                                    setAuthMode(authType[0].type);
                                    setIsAuthOpen(true);

                                }}
                                // className="w-full flex items-center px-4 py-3 text-sm font-medium rounded-md bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70 text-accent-foreground mt-2"
                                className="w-full flex items-center px-4 py-3 text-md font-medium text-accent rounded-md"
                            >
                                <CircleUserRound className="h-4 w-4 mr-3" />
                                Sign in
                            </button>
                            {/* </div> */}
                        </div>
                    </div>
                )}
            </header>

            {/*Auth Modal */}
            {isAuthOpen && (
                <AuthModal mode={authMode} onModeChange={setAuthMode} closeAuthModal={setIsAuthOpen} />
            )}

            {/*Create Modal */}
            {isCreateOpen && (
                <div onClick={() => setIsCreateOpen(false)}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <CreateModal closeModal={setIsCreateOpen} />
                    </div>
                </div>
            )}
        </>
    )
}

export default Header
