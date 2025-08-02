/* eslint-disable react/prop-types */
const ProfileCard = ({ type, data }) => {

    return (
        <>
            {type === "Profile" ? (
                <main className='flex justify-center mt-6 px-4'>
                    <div className='bg-slate-100 w-2/5 h-auto rounded-lg p-4'>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='flex flex-col items-center mb-4'>
                                <img src='https://img.freepik.com/premium-photo/colorful-lizard-with-red-eye-green-eye_924629-324416.jpg' alt='img' className='w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40' />
                                <span className='text-center text-lg mt-2'>{data?.username}</span>
                            </div>
                            <div className="flex justify-around w-4/5">
                                <div className='text-center'>
                                    <p className='text-sm sm:text-base'>Posts</p>
                                    <span>{data?.posts}</span>
                                </div>

                                <div className='text-center'>
                                    <p className='text-sm sm:text-base'>Followers</p>
                                    <span>0</span>
                                </div>

                                <div className='text-center'>
                                    <p className='text-sm sm:text-base'>Following</p>
                                    <span>0</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between mt-4'>
                            <p className='text-center sm:text-left text-sm sm:text-base'>{data?.bio}</p>
                            <i className="fas fa-pen text-[#de5044] text-lg sm:text-xl mt-2 cursor-pointer" />
                        </div>
                    </div>
                </main>
            ) : (
                <main className='flex justify-center mt-6 px-4'>
                    <div className='bg-slate-100 w-2/5 h-auto rounded-lg p-4'>
                        <div className='flex flex-col items-center justify-center'>
                            <div className='flex flex-col items-center mb-4'>
                                <img src='https://img.freepik.com/premium-photo/colorful-lizard-with-red-eye-green-eye_924629-324416.jpg' alt='img' className='w-32 h-32 rounded-full' />
                                <span className='text-center text-lg mt-2'>{data?.username}</span>
                            </div>
                            <div className="flex justify-around w-4/5">
                                <div className='text-center'>
                                    <p className='text-sm sm:text-base'>Posts</p>
                                    <span>{data?.posts}</span>
                                </div>

                                <div className='text-center'>
                                    <p className='text-sm sm:text-base'>Followers</p>
                                    <span>0</span>
                                </div>

                                <div className='text-center'>
                                    <p className='text-sm sm:text-base'>Following</p>
                                    <span>0</span>
                                </div>

                                <div className='text-center'>
                                    <button className="text-white ml-2 bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Follow</button>
                                    {/* <p className='text-sm sm:text-base'>Following</p> */}
                                </div>
                            </div>
                        </div>
                        <div className='flex justify-between mt-4'>
                            <p className='text-center sm:text-left text-sm sm:text-base'>{data?.bio}</p>
                            <i className="fas fa-pen text-[#de5044] text-lg sm:text-xl mt-2 cursor-pointer" />
                        </div>
                    </div>
                </main>
            )}
        </>
    )
}

export default ProfileCard