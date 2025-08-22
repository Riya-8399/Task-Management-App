// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const DefaultRoute = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/profile", {
//           withCredentials: true, // ensures cookies/session are sent
//         });
//         setProfile(response.data); // ✅ now we actually use res
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//         setProfile(null);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProfile();
//   }, []);

//   if (loading) {
//     return <h2>Loading...</h2>;
//   }

//   if (!profile) {
//     return <h2>No profile found. Please log in.</h2>;
//   }

//   return (
//     <div>
//       <h1>Welcome, {profile.fullName || "User"}!</h1>
//       <p>Email: {profile.email}</p>
//       <p>Username: {profile.username}</p>
//     </div>
//   );
// };

// export default DefaultRoute;

