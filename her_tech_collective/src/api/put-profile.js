async function putProfile(profile_id, updatedProfileData, token) {
    const url = `https://hertechcollective.fly.dev/projects/${project_id}/`;

    const method = "PUT";

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Token ${window.localStorage.getItem("token")}`,
        };

    const body = JSON.stringify(updatedProfileData);

    try {
      // Send the PUT request to update the profile.
        const response = await fetch(url, {
        method,
        headers,
        body,
        });

      // Check if the request was successful.
        if (!response.ok) {
        const fallbackError = `Error updating project with ID ${profile_id}`;

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);
        }

      // If the request was successful, return the updated profile data.
        return await response.json();
    } catch (error) {
        throw new Error(`Error updating profile: ${error.message}`);
    }
    }

    export default putProfile;