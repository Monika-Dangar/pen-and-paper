import { useState } from "react";
import { X } from "lucide-react";
import { useDispatch } from "react-redux";
import { login } from "../../slices/authSlice";
import { loginWriter } from "../../services/loginService";
import { handleCreateWriter } from '../../services/writerService';

export const AuthModal = ({ mode, onModeChange, closeAuthModal }) => {
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        bio: "",
    });

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();

    const togglePasswordVisibility = (e) => {
        e.preventDefault()
        setIsPasswordVisible((prev) => !prev)
    }
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);

        try {
            // console.log(userData);
            // console.log('mode: ', mode);

            let response = null
            if (mode === 'signup') {
                response = await handleCreateWriter(userData);

                if (response.success == true) {
                    // setLoading(false);
                    setUserData({ username: "", password: "", bio: "" });
                    onModeChange('login')
                } else {
                    setError(response.message);
                }

            } else {
                response = await loginWriter(userData.username, userData.password);


                if (response) {
                    localStorage.setItem("authToken", response.data.token); // Store token in localStorage
                    dispatch(login());
                    closeAuthModal(false)
                } else {

                    setError('Login failed. Please check your credentials.');
                }
            }
        } catch (error) {
            setError('Login failed. Please check your username and password.');
        } finally {
            // setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4 py-6 sm:px-0 overflow-y-auto">
            <div
                onClick={(e) => e.stopPropagation()}
                // className="relative w-full max-w-md mx-auto bg-background shadow-lg sm:rounded-lg border p-6"
                className="relative w-full max-w-md mx-auto bg-white shadow-xl rounded-xl p-8"

            >
                <div className="max-w-md">
                    <div className="flex items-center justify-center mb-4">
                        <h2 className="text-2xl font-bold text-center text-accent mx-auto">
                            {mode === 'login' ? 'Welcome Back' : 'Join Our Community'}
                        </h2>
                        <button
                            onClick={() => closeAuthModal(false)}
                            className="rounded-sm hover:text-black/50 focus:outline-none">
                            <X className="h-4 w-4" />
                            <span className="sr-only">Close</span>
                        </button>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="text-center text-muted-foreground">
                        {mode === 'login'
                            ? 'Sign in to continue your literary journey'
                            : 'Start sharing your thoughts and stories'
                        }
                    </div>

                    <form action="" onSubmit={handleSubmit}>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="username" className="text-sm font-medium">
                                    Username<span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Your username"
                                    value={userData.username}
                                    onChange={handleInputChange}

                                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>

                            <div>
                                <div className="flex justify-between">
                                    <label htmlFor="password" className="text-sm font-medium">Password</label>
                                    <button onClick={togglePasswordVisibility}><i className={` fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`} /></button>
                                </div>
                                <input
                                    id="password"
                                    type={isPasswordVisible ? 'text' : 'password'}
                                    name="password"
                                    placeholder="••••••••"
                                    value={userData.password}
                                    onChange={handleInputChange}
                                    className="mt-1 mb-2 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent"

                                />
                            </div>
                        </div>

                        {mode === 'signup' && (
                            <div className="mb-4">
                                <label htmlFor="bio" className="block text-sm font-medium text-gray-600">
                                    Bio (Optional)
                                </label>
                                <textarea
                                    id="bio"
                                    name="bio"
                                    value={userData.bio}
                                    onChange={handleInputChange}
                                    className="w-full p-3 border border-gray-300 rounded-md"
                                    rows="3"
                                    placeholder="Write a short bio..."
                                ></textarea>
                            </div>
                        )}

                        <button
                            className="w-full mt-4 p-2 rounded-md text-white font-semibold bg-accent hover:bg-accent/90 transition"

                        >
                            {mode === 'login' ? 'Sign In' : 'Create Account'}
                        </button>
                    </form>
                    {error && <aside className="text-red-500 text-center mt-4">{error}</aside>}

                    <div className="text-center">
                        <button

                            onClick={() => onModeChange(mode === 'login' ? 'signup' : 'login')}
                            // className="text-accent hover:text-accent/80"
                            className="text-sm text-gray-600 hover:text-accent font-medium"

                        >
                            {mode === 'login'
                                ? "Don't have an account? Sign up"
                                : "Already have an account? Sign in"
                            }
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}