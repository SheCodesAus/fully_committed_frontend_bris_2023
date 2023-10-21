import { useParams } from "react-router-dom";
import useProfile from "../hooks/use-profile";
import "./ProfilePage.css";
import deleteProfile from "../api/delete-profile";

function ProfilePage() {

    // Here we use a hook that comes for free in react router called `useParams`to get the id from the URL so that we can pass it to our useProfile hook.
    const { id } = useParams();
    

     // useProfile returns three pieces of info, so we need to grab them all here
    const {profile, isLoading, error} = useProfile(id)

    // Setting up delete confirmation

    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

    // console.log("I am still looking for the profile: ", isLoading)
    console.log("Testing profile: ", profile)


    if (isLoading) {
        return <div>I am still loading</div>;
    }

    if (error) {
        return (<p>{error.message}</p>);
        }



    // Handle project deletion

    const handleDelete = () => {
        // Show the delete confirmation
        setShowDeleteConfirmation(true);
    };

    const handleConfirmDelete = () => {
        // delete profile
            deleteProfile(id)
            .then(() => {
                //Redirect to the homepage
                navigate("/");
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
        if (parseInt(auth.userId) == parseInt(profile.owner)) {
          // Authenticated user is the owner, render the buttons
            return (
                <>
                    <button className="delete-button" onClick={handleDelete}>
                    Delete Profile
                    </button>
                    <button className="update-button">
                        <Link to={`/update-profile/${profile.id}`}>Update Profile</Link>
                    </button>
                </>
            );
        }
        // Authenticated user is not the owner, do not render the buttons
        return null;
        };


    return (
    <main>
        <div id="profile-info">
            <h1>{profile.profile_name}</h1>
            <img className="profile-image" src={profile.image_url} />
            <h4>Job title: <span className="font-weight-normal">{profile.job_title}</span> </h4>
            <h4>LinkedIn profile: <a className="font-weight-normal" href="{profile.linkedin_url}">{profile.linkedin_url}</a></h4>
            <h4>Bio: <span className="font-weight-normal">{profile.bio}</span></h4>
            <h4>Location: <span className="font-weight-normal">{profile.location.location_name}</span></h4>
            <h4>Skills: 
                <ul>
                    {profile.skills.map((skill) => (
                        <li key={skill.id}>{skill.skill_name}</li>
                    ))}
                </ul>
            </h4>
            {showDeleteConfirmation && (
                    <div className="delete-confirmation">
                        <p>Are you sure you want to delete this profile?</p>
                        <button onClick={handleConfirmDelete}>Yes</button>
                        <button onClick={handleCancelDelete}>No</button>
                    </div>
                )}
                {renderUpdateAndDeleteButtons()}
        </div>
    </main>
    );
}


export default ProfilePage;