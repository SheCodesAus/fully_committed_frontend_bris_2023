async function getUserById(user_id) {
    // First we create the URL for the request by using the Vite environmentvariable and the API endpoint.
    const url =`https://hertechcollective.fly.dev/account/${user_id}`;
    // Next we call the fetch function and pass in the url and the method. The method is set to `GET` because we are fetching data. Fetch returns a"promise".
    // If the promise "resolves" (i.e., if the back end responds) we will getthe data we need in the `response` variable. If the back end fails to respondthen we'll get an error.

    const response = await fetch(url, { method:"GET" });
    // We can use the `ok` property on `response` to check if the request wassuccessful.
    // If the request was not successful then we will throw an error...
    if (!response.ok) {
        const fallbackError =`Error fetching user with id ${user_id}`;

    // Here we use the `await` keyword to signal to Javascript that it shouldn't run this code until `response` gets turned into JSON
    const data = await response.json().catch(() => {
        // If the response is not JSON then we will throw a generic error.`catch` will trigger if we try to turn `response` into JSON and fail
        throw new Error(fallbackError);
    });

    // If the error response *is* JSON, then we will include the info from that JSON in the error we throw.
    // Usually, the server will send the error message in the `detail`property.
    // You may have not configured the back end to use the `detail` property. If that is the case then you can change the code below to use a differentproperty, e.g.: `message`

    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
}
// ...on the other hand, if the request was successful then we will returnthe data from the response.
// Turing the response to JSON takes time so we need to use the `await`keyword again.

return await response.json();
}

export default getUserById;
