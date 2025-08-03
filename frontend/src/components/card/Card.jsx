// eslint-disable-next-line react/prop-types
// const Card = ({ click, icon, title, para }) => {

//     return (
//         <section className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
//             <div className="flex items-center justify-between">
//                 <i className={`${icon} text-[#de5044] text-4xl`} />
//             </div>
//             <h2 className="text-2xl font-semibold text-gray-800 mt-6">{title}</h2>
//             <p className="text-gray-600 mt-4">{para}</p>
//             <button
//                 onClick={click}
//                 aria-label={`Start writing for ${title}`}  // More accessible button
//                 className="mt-6 cursor-pointer text-white bg-[#de5044] py-2 px-4 rounded-lg hover:bg-[#bb3b2b] transition duration-300"
//             >
//                 Start Writing
//             </button>
//         </section>

//     )
// }

// export default Card;

import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Card = ({ click, icon, title, para }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="group relative bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 cursor-pointer border border-[#de5044]/10 hover:border-[#de5044]/30"
            onClick={click}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Subtle background pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#de5044]/5 to-[#6595ac]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Card Header with Icon */}
            <div className="relative z-10 mb-6">
                <div className={`inline-flex p-4 rounded-xl transition-all duration-300 ${isHovered
                    ? 'bg-[#de5044] text-white shadow-lg'
                    : 'bg-[#de5044]/15 text-[#de5044]'
                    }`}>
                    <i className={`${icon}`} size={28} strokeWidth={1.5} />
                </div>
            </div>

            {/* Card Content */}
            <div className="relative z-10">
                <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#de5044] transition-colors duration-300">
                    {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                    {para}
                </p>

                {/* Start Writing Button */}
                <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${isHovered
                    ? 'bg-[#de5044] text-white shadow-lg transform scale-105'
                    : 'bg-[#de5044]/10 text-[#de5044] hover:bg-[#de5044]/20'
                    }`}>
                    Start Writing
                </button>
            </div>
        </div>
    );
};

export default Card