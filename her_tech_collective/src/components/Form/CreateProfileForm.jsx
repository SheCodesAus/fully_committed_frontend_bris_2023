import { useState,useEffect } from "react";
import getSkills from "../../api/get-skills";
import getLocations from "../../api/get-locations";
import postProfile from "../../api/post-profiles";


function CreateProfileForm() {
    const [profileData, setProfileData] = useState({
      profile_name: "",
      job_title: "",
      linkedin_url: "",
      image_url: "",
      bio: "",
      is_active: false,
      location: null,
      skills: [],
      date_created: new Date().toISOString(),
    });
  const [skills, setSkills] = useState([]);
  const [locations, setLocations] = useState([]);
 const [isLoading, setIsLoading] = useState(true);
 const [error, setError] = useState(null);

  
  
 useEffect(() => {
   getSkills()
     .then((skillsData) => {
       setSkills(skillsData);
       setIsLoading(false);
     })
     .catch((error) => {
       setError(error);
       setIsLoading(false);
     });
   getLocations()
     .then((locationsData) => {
       setLocations(locationsData);
     })
     .catch((error) => {
       setError(error);
     });
 }, []);

 if (isLoading) {
   return <p>Loading...</p>;
 }

 if (error) {
   return <p>Error: {error.message}</p>;
 }

  const handleChange = (e) => {
    setProfileData({ ...profileData, [e.target.id]: e.target.value });
  }
  const handleChecked = (e) => {
    setProfileData({ ...profileData, [e.target.id]: e.target.checked });
  }
  //  const handleSelected = (event) => {
  //    const { id, value, type, options, selectedOptions } = event.target;

  //    if (type === "select-multiple") {
  //      // For multi-select elements (Skills)
  //      const selectedValues = Array.from(selectedOptions).map(
  //        (option) => option.value
  //      );
  //      setProfileData({ ...profileData, [id]: selectedValues });
  //    } else {
  //      // For single-select elements (Location)
  //      setProfileData({ ...profileData, [id]: value });
  //    }
  //  };
  const handleSelected = (event) => {
    const { id, value, type, options, selectedOptions } = event.target;

    if (id === "location") {
      // Change location to an object
      const locationData = JSON.parse(value);
      setProfileData({ ...profileData, location: locationData });
    } else if (id === "skills") {
      // Change skills to an array of integers
      const selectedSkills = Array.from(selectedOptions).map((option) =>
        parseInt(option.value)
      );
      setProfileData({ ...profileData, skills: selectedSkills });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    postProfile(profileData)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setIsLoading(false);
      });
  };

    return (
      <form onSubmit={handleSubmit}>
        <h1>Create Her Tech Collective Profile</h1>
        <div>
          <label htmlFor="profile_name">Profile Name</label>
          <input
            id="profile_name"
            type="text"
            placeholder="Enter profile name"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="job_title">Job Title</label>
          <input
            id="job_title"
            type="text"
            placeholder="Enter profile name"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="linkedin_url">LinkedIn URL</label>
          <input
            id="linkedin_url"
            type="url"
            placeholder="Enter LinkedIn URL"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="image_url">Image URL</label>
          <input
            id="image_url"
            type="url"
            placeholder="Enter Image URL"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="bio">Bio</label>
          <input
            id="bio"
            type="textarea"
            placeholder="Enter Bio"
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label htmlFor="is_active">Is_active</label>
          <input
            id="is_active"
            type="checkbox"
            onChange={handleChecked}
          ></input>
        </div>
        <div>
          <label htmlFor="location">Location</label>
          {/* <select id="location">
            <option value="Brisbane">Brisbane</option>
            <option value="Sydney">Sydney</option>
          </select> */}
          {/* <ul>
            {locations.map((item) => (
              <li key={item.id}>{item.location_name}</li>
            ))}
          </ul> */}
          <select id="location" onChange={handleSelected}>
            {locations.map((item) => (
              <option
                key={item.id}
                // value={item.id}
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
          {/* <select id="skills">
            <option value="Python">Python</option>
            <option value="React">React</option>
          </select> */}
          {/* <ul>
            {skills.map((skill) => (
              <li key={skill.id}>{skill.skill_name}</li>
            ))}
          </ul> */}
          <select id="skills" multiple onChange={handleSelected}>
            {skills.map((item) => (
              <option key={item.id} value={item.id}>
                {item.skill_name}
              </option>
            ))}
          </select>
        </div>
        <input type="submit" value="Submit"></input>
      </form>
    );
}
export default CreateProfileForm;




