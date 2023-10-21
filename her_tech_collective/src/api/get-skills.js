async function getSkills() {
    // const url = `${import.meta.env.VITE_API_URL}/skills`;
    const url = `https://hertechcollective.fly.dev/skills`;
    const response = await fetch(url, { request: "GET" });
    if (!response.ok) {
        const fallbackError = "Error fetching all skills";
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        })

        const errorMessage = data?.detail ?? fallbackError;
        throw new Error(errorMessage);

        
        
    }
    const jsonData = await response.json();
    console.log("get skills:", jsonData)
    return jsonData;
}

export default getSkills;
