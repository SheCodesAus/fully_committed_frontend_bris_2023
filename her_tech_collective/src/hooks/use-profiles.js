import { useState, useEffect } from "react";

import getProfiles from "../api/get-profiles";

export default function useProfiles() {

    // Here we use the useState hook to create a state variable called projects and a function to update it called setProjects. We initialize the state variable with an empty array.
    const [profiles, setProfiles] = useState([]);

    // We also create a state variable called isLoading and error to keep track ofthe loading state an d any errors that might occur.

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    // We use the useEffect hook to fetch the projects from the API and update the state variables accordingly.// This useEffect will only run once, when the component this hook is used inis mounted.
    useEffect(() => {
        const fetchData = async () => {
            try {
                const profilesData = await getProfiles();
                setProfiles(profilesData);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

// Finally, we return the state variables and the error. As the state in thishook changes it will update these values and the component using this hookwill re-render.

    return { profiles, isLoading, error };

}