async function getLocations() {
    const url = `https://hertechcollective.fly.dev/location/`;
    const response = await fetch(url, { method: "Get" });
    if (!response.ok) {
        const fallbackError = "Error to fetch all locations";
        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        })
        const errorMessage = data?.detail ?? fallbackError
        throw new Error(errorMessage)
    }
    

    return await response.json();

}

export default getLocations;