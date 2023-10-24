import { useState, useEffect } from "react";

import getUserById from "../api/get-user-by-id";

export default function useUser(user_id) {

    // Here we use the useState hook to create a state variable called projectsand a function to update it called setProjects. We initialize the state variable with an empty array.
    const [user, setUser] = useState([]);


    // We also create a state variable called isLoading and error to keep track of the loading state and any errors that might occur.

    const [userIsLoading, setUserIsLoading] = useState(true);
    const [userError, setUserError] = useState();

    // We use the useEffect hook to fetch the projects from the API and update the state variables accordingly.
    // This useEffect will only run once, when the component this hook is used in is mounted.

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserById(user_id);
                setUser(userData);
                setUserIsLoading(false);
            } catch (error) {
                setUserError(error);
                setUserIsLoading(false);
            }
        };
        fetchData();
    }, [user_id]); // Add id to the dependency array to ensure the effect is re-run when id changes


    return { user, userIsLoading, userError };

}