import { NavLink } from 'react-router-dom'
import booksImg from '../assets/home-page.png';

const Home = () => {
    return (
        // <main className="flex items-center bg-center bg-no-repeat bg-cover min-h-screen bg-[url('./assets/bg1.png')]">
        <main className="min-h-screen bg-[#f3e7dc] flex flex-col justify-between px-4 py-6">
            <div className="flex-1 flex items-center justify-center">
                <div className="max-w-4xl text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#de5044] leading-tight">
                        Pen & Paper
                        <i className="fas fa-pen-to-square ml-3" />
                    </h1>

                    <img src={booksImg} alt="Books" className="mx-auto" />

                    <p className="text-lg font-medium text-[#de5044]">
                        A platform where writers can share their work and readers can explore, enjoy, and engage with it.
                    </p>
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
                <NavLink
                    to="/login"
                    className="inline-flex w-full md:w-auto justify-center items-center py-2 px-4 text-base font-medium text-white rounded-md bg-[#6595ac] hover:bg-[#4c7c92]"
                >
                    I am a writer
                    <i className="fas fa-pen-clip ml-2" />
                </NavLink>

                <NavLink
                    to="/read"
                    className="inline-flex w-full md:w-auto justify-center items-center py-2 px-4 text-base font-medium text-white rounded-md bg-[#6595ac] hover:bg-[#4c7c92]"
                >
                    I am a reader
                    <i className="fas fa-book-open-reader ml-2" />
                </NavLink>
            </div>
        </main>
    )
}

export default Home