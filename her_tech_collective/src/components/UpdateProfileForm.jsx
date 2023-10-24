import { useState, useEffect } from "react";
import { useAuth } from "../hooks/use-auth";
import putProfile from "../api/put-profile";
import getSkills from "../api/get-skills";
import getLocations from "../api/get-locations";
import { useParams, useNavigate } from "react-router-dom";
import getProfile from "../api/get-profile";


function UpdateProfile() {
        const { id } = useParams();
        const { auth } = useAuth();
        const [profileData, setProfileData] = useState({
            profile_name: "",
            job_title: "",
            linkedin_url: "",
            image_url: "",
            bio: "",
            is_active: false,
            location: null,
            skills: [],
            });
        const [skills, setSkills] = useState([]);
        const [locations, setLocations] = useState([]);
        const [isLoading, setIsLoading] = useState(true);
        const [error, setError] = useState(null);
        const [query, setQuery] = useState([]);
        const navigate = useNavigate();
        

        useEffect(() => {
            // Fetch profile data by ID and populate the form
            fetchProfileDataById(id);
            // Fetch skills and locations
            fetchSkills();
            fetchLocations();
        }, [id]);

        const fetchProfileDataById = (profileId) => {
            getProfile(profileId)
            .then((profileData) => {
            // Populate the form fields with the retrieved profile data
                setProfileData({
                    profile_name: profileData.profile_name,
                    job_title: profileData.job_title,
                    linkedin_url: profileData.linkedin_url,
                    image_url: profileData.image_url,
                    bio: profileData.bio,
                    is_active: profileData.is_active,
                    location: profileData.location,
                    skills: profileData.skills,
                    });
                setIsLoading(false);
            })
            .catch((error) => {
                setError(error);
                setIsLoading(false);
            });
        };

        const fetchSkills = () => {
            getSkills()
            .then((skillsData) => {
                setSkills(skillsData);
            })
            .catch((error) => {
            setError(error);
            });
        };


        const fetchLocations = () => {
            getLocations()
            .then((locationsData) => {
                setLocations(locationsData);
            })
            .catch((error) => {
            setError(error);
            });
        };

        const handleUpdate = (e) => {
            e.preventDefault();
            // Prepare the updated profile data
            const updatedProfileData = {
            // Populate with updated values from the form fields
                profile_name: profileData.profile_name,
                job_title: profileData.job_title,
                linkedin_url: profileData.linkedin_url,
                image_url: profileData.image_url,
                bio: profileData.bio,
                is_active: profileData.is_active,
                location: profileData.location,
                skills: profileData.skills,
                };

            // Call the API to update the profile
            putProfile(id, updatedProfileData, auth.token)
            .then(() => {
                navigate(`/profiles/${id}/`);
            })
            .catch((error) => {
                setError(error);
            });
        };

        const handleSelect = (event) => {
            const { id, value } = event.target;
            if (id === "location") {
              // Change location to an object
                const locationData = JSON.parse(value);
                setProfileData({ ...profileData, location: locationData });
            }
        };
    

        const handleChecked = (e) => {
            const { id, checked } = e.target;
            setProfileData({ ...profileData, [id]: checked });
        };

        
        
        // const handleSkillsChange = (event) => {
        //     const { id, checked } = event.target;
        //     const skillId = parseInt(id);
        
        //     if (checked) {
        //       // Add the skill to the list if it's checked
        //         setProfileData((prevData) => ({
        //         ...prevData,
        //         skills: [...prevData.skills, skillId],
        //         }));
        //     } else {
        //       // Remove the skill from the list if it's unchecked
        //         setProfileData((prevData) => ({
        //         ...prevData,
        //         skills: prevData.skills.filter((skill) => skill !== skillId),
        //         }));
        //     }
        // };




        const handleQueryChange = (event) => {
            const checkedSkill = JSON.parse(event.target.value);
            // console.log("Event:", event.target.value);
            const updatedQuery = [...query, checkedSkill]; // Update query
            // console.log("checked skills:", updatedQuery);
    
            setQuery(updatedQuery); // Update query state
    
            // Now update profileData with the updated skills
            setProfileData({
              ...profileData,
              skills: updatedQuery,
            });
          };



        

        const handleChange = (e) => {
            const { id, value} = e.target;
              // Handle other input fields
            setProfileData({ ...profileData, [id]: value });
            
        };





        if (isLoading) {
            return <div>Loading...</div>;
        }

        if (error) {
            return <p>Error: {error.message}</p>;
        }

        return (
            <div className="form-container">
                <form onSubmit={handleUpdate}>
                    <h1>Update Her Tech Collective Profile</h1>
                    <div>
                        <label htmlFor="profile_name">Profile Name</label>
                        <input
                        id="profile_name"
                        type="text"
                        value={profileData.profile_name}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="job_title">Job Title</label>
                        <input
                        id="job_title"
                        type="text"
                        value={profileData.job_title}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="linkedin_url">LinkedIn URL</label>
                        <input
                        id="linkedin_url"
                        type="url"
                        value={profileData.linkedin_url}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="image_url">Image URL</label>
                        <input
                        id="image_url"
                        type="url"
                        value={profileData.image_url}
                        onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="bio">Bio</label>
                        <input
                        id="bio"
                        type="textarea"
                        value={profileData.bio}
                        onChange={handleChange}
                        />
                    </div>
                    <div className="isactive">
                        <label htmlFor="is_active">Is_active</label>
                        <input
                        id="is_active"
                        type="checkbox"
                        checked={profileData.is_active}
                        onChange={handleChecked}
                        />
                    </div>
                    <div>
                        <label htmlFor="location">Location</label>
                        <select
                            id="location"
                            onChange={handleSelect}
                            value={JSON.stringify(profileData.location)}
                        >
                            <option value="" disabled>
                                Select a location
                            </option>
                            {locations.map((item) => (
                            <option
                                key={item.id}
                                value={JSON.stringify({
                                    id: item.id,
                                    location_name: item.location_name,
                                })}
                            >
                                {item.location_name}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="skills">Skills</label>
                        <div id="skills">
                        {skills.map((item) => (
                            <label key={item.id}>
                                <input
                                type="checkbox"
                                id={item.id}
                                name={item.skill_name}
                                value={JSON.stringify(item)}
                                onChange={handleQueryChange}
                                />

                                {item.skill_name}
                            </label>
                            ))}

                        </div>
                    </div>

                    <input type="submit" value="Update" className="submit-button" />
                </form>
            </div>
        );
}

export default UpdateProfile;
