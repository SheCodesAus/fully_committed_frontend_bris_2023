async function postProfile(profileData) {
  //   const url = `${import.meta.env.VITE_API_URL}/profiles/`;
  const url = `http://127.0.0.1:8000/profiles/`;
  // Log the profileData before making the POST request
  console.log("Profile Data to be Posted:", profileData);
  const response = await fetch(url, {
    method: "POST",
    //tell the server that JSON data sending, so set the Content-type header to application/json
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${window.localStorage.getItem("token")}`,
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    const fallbackError = "Error trying to post a profile";
    const data = await response.json().catch(() => {
      throw new Error(fallbackError);
    });
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json();
}

export default postProfile;
