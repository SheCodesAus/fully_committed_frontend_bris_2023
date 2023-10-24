import { useParams } from "react-router-dom";
import { useState } from "react";
import UpdateProfile from "../components/UpdateProfileForm";
import useProfile from "../hooks/use-profile";



function UpdateProfilePage() {

    const { id } = useParams();
    const { profile, isLoading, error } = useProfile(id);
    
    const [success, setSuccess] = useState(false);

    const handleSuccess = () => {
        setSuccess(true);
    };


    return (
        <div>
            {success ? (
                <h1>The profile has been successfully updated</h1>
            ) : profile ? (
                <div>
                    <h2 className="update-profile-header"></h2>
                    <UpdateProfile profile={profile} onSuccess={handleSuccess} /> {/* Pass the project prop */}
                </div>
            ) : isLoading ? (
                    <p>Loading profile details...</p>
                ) : (
                        <p>{error ? error.message : "Profile not found"}</p>
                    )}
        </div>
);
}

export default UpdateProfilePage;