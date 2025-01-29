import { Link } from 'react-router-dom';

const SidebarLink = ({ icon, text, to, onClick }) => {
    return (
        <Link to={to}>
            <button
                onClick={onClick}
                className="text-lg font-semibold text-white hover:text-gray-300 w-full p-3 text-left flex items-center"
                aria-label={`Go to ${text} section`} // Added aria-label for accessibility
            >
                <i className={`${icon} inline-block mr-3`} /> {text}
            </button>
        </Link>
    );
};

export default SidebarLink;
