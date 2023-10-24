import { Link } from "react-router-dom";
import "./ProfileCard.css";

function ProfileCard(props) {
    const { profileData } = props;

    const profileLink = `/profiles/${profileData.id}/`;

    console.log('profile data in profileCARD: ', profileData)


return (
    <div className="profile-card">
        <Link to={profileLink}>
        <img src={profileData.image_url} />
        <h3>{profileData.profile_name}</h3>
        <h4>{profileData.location.location_name}</h4>
        <ul>
                {profileData.skills.map((skill) => (
                    <li key={skill.id}>{skill.skill_name}</li>
                ))}
        </ul>
        </Link>
    </div>
);
}

export default ProfileCard;