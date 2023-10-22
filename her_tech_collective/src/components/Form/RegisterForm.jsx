import { useState } from "react";
import postRegister from "../../api/post-register.js";
import "./Form.css"

function RegisterForm({ onSuccess }) {


    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null);

    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
        email: "",
    });


    const handleChange = (e) => {
        setCredentials({
        ...credentials, 
        [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        postRegister(credentials)
            .then(() => {
                onSuccess();
            })
            .catch((err) => {
                setError(err.message);
                setIsLoading(false);
            });
    };



    return (
        <div className="form-container">
            <form>
                <div>
                    <label htmlFor="username" className="form-label"></label>
                    <input type="text" id="username" placeholder="Enter Username" onChange={handleChange} value={credentials.username} className="form-input"/>
                </div>
                
                <div>
                    <label htmlFor="password" className="form-label"></label>
                    <input type="password" id="password" placeholder="Enter Password" onChange={handleChange} value={credentials.password} className="form-input"/>
                </div>
                <div>
                    <label htmlFor="email" className="form-label"></label>
                    <input type="text" id="email" placeholder="Enter Email Address" onChange={handleChange} value={credentials.email} className="form-input" />
                </div>
                {isLoading && <p>Loading</p>}
                {error && <p>Error: {error}</p>} {/* Display error if it exists */}
                <button type="submit" onClick={handleSubmit} className="submit-button">Register</button>
            </form>
        </div>
    );
}

export default RegisterForm;
