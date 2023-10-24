import { useParams } from "react-router-dom";
import useUser from "../hooks/use-user";
import useProfiles from "../hooks/use-profiles";
import ProfileCard from "../components/ProfileCard/ProfileCard";


function AccountPage() {

    // Here we use a hook that comes for free in react router called `useParams`to get the id from the URL so that we can pass it to our useProfile hook.
    const { user_id } = useParams();
    
     // useProfile returns three pieces of info, so we need to grab them all here
    const {user, isUserLoading, userError} = useUser(user_id);

    
        if (isUserLoading) {
            return <div>I am still loading user information</div>;
        }

        if (userError) {
            return (<p>{userError.message}</p>);
            }


    const {profiles, isLoading, error } = useProfiles();



        if (isLoading) {
            return <div>I am still loading</div>;
        }

        if (error) {
            return (<p>{error.message}</p>);
            }

    const userProfiles = profiles.filter((profileData) => profileData.owner.id === user.id);

    const dateString = user.date_joined

    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric"}
        return new Date(dateString).toLocaleDateString(undefined, options)
        }

    return (
    <main>
        <div id="account-info">
            <h1>Welcome to your account! Here are your details:</h1>
            <h4 className="account-page">Username: {user.username}</h4>
            <h4 className="account-page">Email address: <span className="font-weight-normal">{user.email}</span> </h4>
            <h4 className="account-page">Date joined: <span className="font-weight-normal">{formatDate(dateString)}</span></h4>
                <div id="profile-list">
                    {userProfiles.map((profileData, key) => {
                        return <ProfileCard key={key} profileData={profileData} />;
                    })}
                </div>
        </div>
    </main>
    );
}


export default AccountPage;