import { useEffect, useState } from "react";
import { handleGetContentByCategory } from "../services/contentService";

const useGetContentByCategory = (category, liked, cmt) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await handleGetContentByCategory(category);
                if (response && response.data) {
                    // console.log('category: ' + JSON.stringify(response));
                    // console.log('category: ' + response.data.contents);

                    setData(response.data.contents);
                }
            } catch (error) {
                console.log("Error in fetching content by category:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchContent();
    }, [category, liked, cmt]);  // Re-fetch when category changes

    return { data, loading };
};

export default useGetContentByCategory;
