/* eslint-disable react/prop-types */
const DashboardCard = ({ click, icon, title, para }) => {
    return (
        <section className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
            <div className="flex items-center justify-between">
                <i className={`${icon} text-[#de5044] text-4xl`} />
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mt-6">{title}</h2>
            <p className="text-gray-600 mt-4">{para}</p>
            <button
                onClick={click}
                aria-label={`Start writing for ${title}`}  // More accessible button
                className="mt-6 text-white bg-[#de5044] py-2 px-4 rounded-lg hover:bg-[#bb3b2b] transition duration-300"
            >
                Start Writing
            </button>
        </section>
    )
}

export default DashboardCard;
