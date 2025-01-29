import { NavLink } from 'react-router-dom'

const Home = () => {
    return (
        <main className="flex items-center bg-center bg-no-repeat bg-cover min-h-screen bg-[url('./assets/bg1.png')]">
            <div className="px-4 mx-auto max-w-screen-xl text-center">
                <h1 className="mb-4 text-3xl font-extrabold tracking-tight leading-none text-[#de5044] md:text-5xl lg:text-6xl">
                    Welcome to Pen & Paper
                    <i className='fas fa-pen-to-square ml-3' />
                </h1>

                <p className="text-1xl font-medium mt-2 text-[#de5044]">
                    A platform where writers can share their work and readers can explore, enjoy, and engage with it.
                </p>

                <p className="mb-8 mt-2 font-bold text-lg text-[#6595ac] sm:px-16 lg:px-48">
                    The goal of this project is to create Pen & Paper, a platform for writers to share essays, poems, short stories, and thoughts. Readers can explore, like, comment, and interact with these works without needing an account. Writers can authenticate and manage their work while readers can freely explore.
                </p>

                <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0">
                    <NavLink to={'/login'} className="inline-flex justify-center items-center py-2 px-2 text-base font-medium text-center text-white rounded-md bg-[#6595ac] hover:bg-[#9dc5d8] focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900" aria-label="Login as Writer">
                        I am a writer
                        <i className='fas fa-pen-clip ml-3' />
                    </NavLink>
                    <NavLink to={'/read'} className="inline-flex justify-center items-center py-2 px-2 sm:ms-4 text-base font-medium text-center text-white rounded-md bg-[#6595ac] hover:bg-[#9dc5d8] focus:ring-4 focus:ring-gray-400" aria-label="Login as Reader">
                        I am a reader
                        <i className='fas fa-book-open-reader ml-2' />
                    </NavLink>
                </div>
            </div>
        </main>

    )
}

export default Home