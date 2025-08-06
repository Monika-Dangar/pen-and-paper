import { useState, useEffect } from "react";
import { loginWriter } from "../services/loginService";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../slices/authSlice";
import { HiArrowLeft } from "react-icons/hi";
import Loader from "../components/loader/Loader";

const Login = () => {
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const authStatus = localStorage.getItem("authToken");
    const navigate = useNavigate();

    useEffect(() => {
        if (authStatus) {
            navigate('/dashboard');
        }
    }, [navigate, authStatus]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await loginWriter(username, password);
            if (response) {
                localStorage.setItem("authToken", response.data.token); // Store token in localStorage
                dispatch(login());
                navigate('/dashboard');
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError('Login failed. Please check your username and password.');
        } finally {
            setLoading(false);
        }
    };

    const handleBackToHome = () => {
        navigate('/')
    }

    const togglePasswordVisibility = (e) => {
        e.preventDefault()
        setIsPasswordVisible((prev) => !prev)
    }
    return (
        <>
            <main className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover bg-[url('./assets/login1.png')]">
                {loading && (
                    <div className="absolute inset-0 bg-white/60 flex items-center justify-center z-50">
                        <Loader />
                    </div>
                )}
                <div className="fixed top-0 left-0">
                    <button
                        onClick={handleBackToHome}
                        className="flex items-center text-[#de5044] font-bold bg-transparent py-2 px-6 rounded-md hover:text-white hover:bg-[#de5044] transition duration-300 sm:self-start mb-4 sm:mb-0"
                    >
                        <HiArrowLeft className="w-5 h-5 mr-2" />
                        Back to Home
                    </button>
                </div>
                <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md mx-4">

                    <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Writer Login</h1>

                    <form id="loginForm" onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-600">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <div className="flex justify-between">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                                <button onClick={togglePasswordVisibility}><i className={` fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`} /></button>
                            </div>

                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div className="flex items-center justify-between mb-6">
                            <button
                                type="submit"
                                className="w-full bg-[#6595ac] text-white py-3 rounded-md hover:bg-[#4c849d]"
                            >
                                Login
                            </button>
                        </div>

                        <NavLink to={"/signup"}>
                            <p className="text-center hover:text-gray-400">
                                Do not have an account? Signup
                            </p>
                        </NavLink>
                    </form>

                    {error && <aside className="text-red-500 text-center mt-4">{error}</aside>}
                </div>
            </main>
        </>
    );
};

export default Login;
