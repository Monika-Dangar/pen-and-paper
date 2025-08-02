/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom"; // For navigation to the profile
import profileImg from "../../assets/profile.png"; // Adjust the relative path accordingly


const SearchListCard = ({ searchUserData }) => {
    // console.log(searchUserData.username);

    return (
        <div className="p-1 mr-3 border-b">
            {/* <div className="flex items-center space-x-4"> */}
            <div className="flex items-center space-x-4 sm:flex-row flex-col">
                {/* Profile Picture */}
                <img
                    src={searchUserData.profileImagePath || profileImg}
                    alt="Writer Avatar"
                    // className="w-12 h-12 rounded-full object-cover"
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20"
                />

                {/* Username */}
                <div className="flex-1">
                    {/* <span className="font-semibold text-sm text-gray-800"> */}
                    <span className="font-semibold text-sm sm:text-base">
                        {searchUserData.username}
                    </span>
                </div>

                {/* View Profile Link */}
                <NavLink
                    to={`/writer/account/${searchUserData.username}`}
                    state={{ writerData: searchUserData }} // Passing writerData to Account component
                    className="text-blue-500 hover:text-blue-700 font-medium text-sm"
                >
                    View Profile
                </NavLink>
            </div>
        </div>
    );
};

export default SearchListCard;

