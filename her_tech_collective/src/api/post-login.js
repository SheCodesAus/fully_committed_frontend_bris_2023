async function postLogin(username, password) {
    const url =`https://hertechcollective.fly.dev/api-token-auth/`;
    console.log("POST LOGIN FUNCTION")
    const response = await fetch(url, {
        method:"POST", // We need to tell the server that we are sending JSON dataso we set the Content-Type header to application/json
        headers:{
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "username": username,
            "password": password,
        }),
    });

    if (!response.ok) {
        const fallbackError = 'Error trying to login';

        const data = await response.json().catch(() => {
            throw new Error(fallbackError);
        });

        const errorMessage = data?.detail ?? fallbackError;
        thrownewError(errorMessage);
    }

    return await response.json();
}
    export default postLogin;
