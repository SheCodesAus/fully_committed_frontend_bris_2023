// import { Link } from "react-router-dom";

import "./ProfileCard.css";

// import useProfile from "../../hooks/use-profile";

function ProfileCard(props) {
    const { profileData } = props;
    // const profileLink = `profiles/${profileData.id}/`;

    // console.log('profile data in profileCARD: ', profileData)
// const {profile, isLoading, error} = useProfile(profileData.id)
// const skills = profile?.skills || []
// const location = profile?.location || []


return (
    <div className="profile-card">
        {/* <Link to={profileLink}> */}
        <img src={profileData.image_url} />
        <h3>{profileData.profile_name}</h3>
        <h4>{profileData.location}</h4>
        <h4>{profileData.skills}</h4>
        {/* </Link> */}
    </div>
);
}

export default ProfileCard;