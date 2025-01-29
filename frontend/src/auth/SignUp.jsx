import { useState } from "react";
import { NavLink } from "react-router-dom";
import { handleCreateWriter } from '../services/writerService';
import { useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi";  // Icons for buttons

const SignUp = () => {
    const [writerData, setWriterData] = useState({
        username: "",
        password: "",
        bio: "",
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setWriterData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission
        // console.log("Writer data:", writerData);

        const response = await handleCreateWriter(writerData);
        if (response) {
            // console.log("Writer created:", response);
            setWriterData({ username: "", password: "", bio: "" });  // Set initial values
            navigate('/login');
        }
    };
    const handleBackToHome = () => {
        navigate('/')
    }


    return (
        <main className="flex items-center justify-center min-h-screen bg-center bg-no-repeat bg-cover bg-[url('./assets/login1.png')]">
            <div className="fixed top-0 left-0">
                <button
                    onClick={handleBackToHome}
                    className="flex items-center text-[#de5044] font-bold bg-transparent py-2 px-6 rounded-md hover:text-white hover:bg-[#de5044] transition duration-300 sm:self-start mb-4 sm:mb-0"
                >
                    <HiArrowLeft className="w-5 h-5 mr-2" />
                    Back to Home
                </button>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
                <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Writer Sign Up</h1>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-medium text-gray-600">
                            Username<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={writerData.username}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                            Password<span className="text-red-500">*</span>
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={writerData.password}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            required
                        />
                    </div>

                    {/* Bio (Optional) */}
                    <div className="mb-4">
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-600">
                            Bio (Optional)
                        </label>
                        <textarea
                            id="bio"
                            name="bio"
                            value={writerData.bio}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md"
                            rows="3"
                            placeholder="Write a short bio..."
                        ></textarea>
                    </div>

                    <div className="flex items-center justify-between mb-6">
                        <button type="submit" className="w-full bg-[#6595ac] text-white py-3 rounded-md hover:bg-[#4c849d]">
                            Sign Up
                        </button>
                    </div>

                    <NavLink to={"/login"}>
                        <p className="text-center hover:text-gray-400">
                            Already have an account? Login
                        </p>
                    </NavLink>
                </form>
            </div>
        </main>

    );
};

export default SignUp;
