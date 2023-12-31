import { useParams } from "react-router-dom";
import useProfile from "../hooks/use-profile";
import "./ProfilePage.css";
import ProfileActions from "../components/ProfileActions";



function ProfilePage() {

    // Here we use a hook that comes for free in react router called `useParams`to get the id from the URL so that we can pass it to our useProfile hook.
    const { id } = useParams();
    
     // useProfile returns three pieces of info, so we need to grab them all here
    const {profile, isLoading, error} = useProfile(id);



    if (isLoading) {
        return <div>I am still loading</div>;
    }

    if (error) {
        return (<p>{error.message}</p>);
        }


    return (
    <div className="page-container">
    <main>
        <div id="profile-info">
            <h1 className="profile-page">{profile.profile_name}</h1>
            <img src={profile.image_url} />
            <h4 className="profile-page">Job title: <span className="font-weight-normal">{profile.job_title}</span> </h4>
            <h4 className="profile-page">LinkedIn profile: <a className="linkedin_url" href="{profile.linkedin_url}">{profile.linkedin_url}</a></h4>
            <h4 className="profile-page">Bio: <span className="font-weight-normal">{profile.bio}</span></h4>
            <h4 className="profile-page">Location: <span className="font-weight-normal">{profile.location.location_name}</span></h4>
            <h4 className="profile-page">Skills: 
                <ul>
                    {profile.skills.map((skill) => (
                        <li key={skill.id}>{skill.skill_name}</li>
                    ))}
                </ul>
            </h4>
        </div>
        <ProfileActions profile={profile} />
    </main>
    </div>
    );
}


export default ProfilePage;