import { Outlet } from 'react-router-dom'
import NavBar from '../navbar/NavBar'

const WriterDashboard = () => {
    return (
        <>
            <main className="bg-center bg-no-repeat bg-cover min-h-screen bg-[url('./assets/wd.png')]">
                <NavBar />
                <Outlet />
            </main>
        </>
    )
}

export default WriterDashboard