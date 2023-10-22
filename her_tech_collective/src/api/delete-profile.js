async function deleteProfile(profile_id) {
    
    const url =`https://hertechcollective.fly.dev/profiles/${profile_id}`;
    const response = await fetch(url, { 
            method:"DELETE",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Token ${window.localStorage.getItem("token")}`,
            },
        });

    // Check if the request was successful

        if (!response.ok) {
            const fallbackError =`Error deleting profile with id ${profile_id}`;
            const data = await response.json().catch(() => {
                throw new Error(fallbackError);
        });

    
            const errorMessage = data?.detail ?? fallbackError;
            throw new Error(errorMessage);
        }

        // Return a success message or any other relevant data

        return "Profile deleted successfully";

}

export default deleteProfile;