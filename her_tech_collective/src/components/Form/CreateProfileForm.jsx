import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getSkills from "../../api/get-skills";
import getLocations from "../../api/get-locations";
import postProfile from "../../api/post-profiles";
import "./CreateProfileForm.css";



function CreateProfileForm() {
    const [profileData, setProfileData] = useState({
      profile_name: "",
      job_title: "",
      linkedin_url: "",
      image_url: "",
      bio: "",
      is_active: false,
      location: null,
      skills: null,
      date_created: new Date().toISOString(),
    });
  const [skills, setSkills] = useState([]);
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);

  const navigate = useNavigate();
  
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
// const [skillsIsLoading, setSkillsIsLoading] = useState(true);
// const [locationsIsLoading, setLocationsIsLoading] = useState(true);

// useEffect(() => {
//   // Fetch skills
//   getSkills()
//     .then((skillsData) => {
//       setSkills(skillsData);
//       setSkillsIsLoading(false); // Set skillsIsLoading to false
//     })
//     .catch((error) => {
//       setError(error);
//       setSkillsIsLoading(false); // Set skillsIsLoading to false on error
//     });

//   // Fetch locations
//   getLocations()
//     .then((locationsData) => {
//       setLocations(locationsData);
//       setLocationsIsLoading(false); // Set locationsIsLoading to false
//     })
//     .catch((error) => {
//       setError(error);
//       setLocationsIsLoading(false); // Set locationsIsLoading to false on error
//     });
// }, []);

// if (skillsIsLoading || locationsIsLoading) {
//   return <p>Loading...</p>;
// }

  
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
  console.log(profileData);
  const handleSelected = (event) => {
    const { id, value, type, options, selectedOptions } = event.target;

    if (id === "location") {
      // Change location to an object
      const locationData = JSON.parse(value);
      setProfileData({ ...profileData, location: locationData });
    }
    
    // else if (id === "skills") {
    //   // Change skills to an array of integers
    //   const selectedSkills = Array.from(selectedOptions).map((option) =>
    //     JSON.parse(option.value)
    //   );
     
    //   setProfileData({ ...profileData, skills: selectedSkills });
      
    // }
    // setProfileData({ ...profileData });

  };




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



  
  
  
  
  const handleSubmit = (e) => {
    e.preventDefault();

    postProfile(profileData)
      .then(() => {
        setSuccessMessage("The profile has been created successfully");
        setFormSubmitted(true);

        setTimeout(() => {
          navigate("/profiles/");
        }, 2500);
      })
      .catch(() => {

        setError("Error creating the profile")
      });
  };


    return (
      <>
        {formSubmitted ? (
            <div className="success-message">{successMessage}</div>
        ) : (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
              <h1>Create Her Tech Collective Profile</h1>
              <div>
                  <label htmlFor="profile_name"></label>
                  <input
                id="profile_name"
                type="text"
                placeholder="Profile name"
                onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="job_title"></label>
              <input
                id="job_title"
                type="text"
                placeholder="Job Title"
                onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="linkedin_url"></label>
              <input
                id="linkedin_url"
                type="url"
                placeholder="LinkedIn URL"
                onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="image_url"></label>
              <input
                id="image_url"
                type="url"
                placeholder="Image URL"
                onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="bio"></label>
              <input
                id="bio"
                type="textarea"
                placeholder="Bio"
                onChange={handleChange}/>
            </div>
            <div className="isactive">
              <label htmlFor="is_active">Is_active</label>
              <input
                id="is_active"
                type="checkbox"
                onChange={handleChecked}/>
            </div>
            <div>
              <label htmlFor="location" style={{ marginRight: '20px' }}>Location</label>
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
                <option value="" disabled selected>Select a location</option>
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

              {/* <select id="skills" multiple required onChange={handleSelected}>
                {skills.map((item) => (
                  <option key={item.id} value={JSON.stringify(item)}>
                    {item.skill_name}
                  </option>
                ))}
              </select> */}
            </div>
            <input type="submit" value="Submit" className="submit-button"></input>
          </form>
          {error && <p>Error: {error}</p>}
        </div>
        )}
      </>
    );
}
export default CreateProfileForm;




