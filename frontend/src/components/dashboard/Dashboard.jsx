import DashboardCard from "../card/DashboardCard"
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
    const navigate = useNavigate();
    const authStatus = localStorage.getItem("authToken");

    if (!authStatus) {
        navigate("/");  // If the user is not authenticated, redirect to the home page.
    }

    const handleOnClick = (contentType) => {
        navigate(`/write/${contentType}`);
    }

    return (
        <main className="px-6 text-center flex flex-col items-center justify-center">
            <section>
                <p className="text-[#de5044] text-md">What would you like to write today?</p>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <DashboardCard
                        click={() => handleOnClick('poem')}
                        icon={'fas fa-book'}
                        title={'Poem'}
                        para={'Unleash your creativity and write beautiful poems here.'}
                    />
                    <DashboardCard
                        click={() => handleOnClick('quote')}
                        icon={"fas fa-pen"}
                        title={'Quote'}
                        para={'Share your motivational thoughts and inspire the world.'}
                    />
                    <DashboardCard
                        click={() => handleOnClick('thought')}
                        icon={"fas fa-lightbulb"}
                        title={'Thought'}
                        para={'Write your deep, insightful thoughts and reflections.'}
                    />
                    <DashboardCard
                        click={() => handleOnClick('essay')}
                        icon={"fas fa-paperclip"}
                        title={'Essay'}
                        para={'Write structured essays to express your views on various topics.'}
                    />
                    <DashboardCard
                        click={() => handleOnClick('shortStory')}
                        icon={"fas fa-file-alt"}
                        title={'Short Story'}
                        para={'Create short stories that captivate readers’ imaginations.'}
                    />
                </div>
            </section>
        </main>
    );
}

export default Dashboard;
