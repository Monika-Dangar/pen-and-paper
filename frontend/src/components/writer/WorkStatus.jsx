const WorkStatus = ({ contentType, length }) => {
    return (
        <section aria-labelledby="work-status" className="mb-8">
            <header id="work-status">
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">Work Status</h2>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-gray-800">Published {contentType} </h3>
                    <p className="text-3xl font-bold text-green-500 mt-2">
                        {length} {contentType}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default WorkStatus;
