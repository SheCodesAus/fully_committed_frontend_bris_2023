import { useState, useEffect } from "react";

import getProfile from "../api/get-profile";

export default function useProfile(id) {

    // Here we use the useState hook to create a state variable called projectsand a function to update it called setProjects. We initialize the state variable with an empty array.
    const [profile, setProfile] = useState([]);


    // We also create a state variable called isLoading and error to keep track of the loading state and any errors that might occur.

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    // We use the useEffect hook to fetch the projects from the API and update the state variables accordingly.
    // This useEffect will only run once, when the component this hook is used in is mounted.

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileData = await getProfile(id);
                setProfile(profileData);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                setIsLoading(false);
            }
        };
        fetchData();
    }, [id]); // Add id to the dependency array to ensure the effect is re-run when id changes




    
    // useEffect(() => {
    //     getProfile(profile_id)
    //     .then((profile) => {
    //         setProject(profile);
    //         setIsLoading(false);
    //     })
    //     .catch((error) =>{
    //         setError(error); 
    //         setIsLoading(false);
    //     });
    // }, []);

// Finally, we return the state variables and the error. As the state in this hook changes it will update these values and the component using this hook will re-render.

    return { profile, isLoading, error };

}