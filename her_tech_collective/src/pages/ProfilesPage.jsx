import useProfiles from "../hooks/use-profiles";
import ProfileCard from "../components/ProfileCard/ProfileCard";
import "./ProfilesPage.css";



function ProfilesPage() {

    const {profiles, isLoading, error } = useProfiles();


    console.log("I am still looking for the profile: ", isLoading, "!Right now I have", profiles, error)

    if (isLoading) {
        return <div>I am still loading</div>;
    }

    if (error) {
        return (<p>{error.message}</p>);
    }

    return (
    <>
    <div className="page-container">
        <div id="profile-list">
            {profiles.map((profileData, key) => {
                return <ProfileCard key={key} profileData={profileData} />;
            })}
        </div>
    </div>
    </>
    );
}




export default ProfilesPage;