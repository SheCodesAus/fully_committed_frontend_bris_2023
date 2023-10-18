import { useState } from "react";
import RegisterForm from "../components/RegisterForm";

function RegisterPage() {
    
    const [success, setSuccess] = useState(false);

    const handleSuccess = () => {
        setSuccess(true);
    };



    return (
        <div>
            {success ? (
                <h2>You signed up successfully!</h2>
            ) :(
            <RegisterForm onSuccess={handleSuccess} />
            )}
        </div>
);
}

export default RegisterPage;