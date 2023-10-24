import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import deleteProfile from "../api/delete-profile";
import { useAuth } from "../hooks/use-auth";


function ProfileActions({ profile }) {


    const { id } = useParams();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    const {auth, setAuth} = useAuth();
    const navigate = useNavigate();
    


    // Handle project deletion

    const handleDelete = () => {
        // Show the delete confirmation
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = () => {
        // delete profile
            deleteProfile(id)
            .then(() => {
                navigate(`/profiles/`);
            })
            .catch ((error) => {
                console.log("Error deleting profile: ", error);
                // Handle error, e.g., display an error message to the user
            });
        };

    const handleCancelDelete = () => {
        // Hide the delete confirmation
        setShowDeleteConfirmation(false);
        };

    const renderUpdateAndDeleteButtons = () => {
        // Check if the authenticated user is the owner of the project

        console.log("PROFILEPAGE USERID:", auth.userId, "PROFILEPAGE OWNER", profile.owner)
        
        if (parseInt(auth.userId) == parseInt(profile.owner.id)) {
          // Authenticated user is the owner, render the buttons
            return (
                <>
                    <button className="delete-button" onClick={handleDelete}>
                    Delete Profile
                    </button>
                    <button className="update-button">
                        <Link to={`/update-profile/${profile.id}/`}>Update Profile</Link>
                    </button>
                </>
            );
        }
        // Authenticated user is not the owner, do not render the buttons
        return null;
        };

    return (
        <div>
            {showDeleteConfirmation && (
            <div className="delete-confirmation">
                <p>Are you sure you want to delete this profile?</p>
                <button onClick={handleConfirmDelete}>Yes</button>
                <button onClick={handleCancelDelete}>No</button>
            </div>
            )}
            {renderUpdateAndDeleteButtons()}
            </div>
        );
        }
        
        export default ProfileActions;