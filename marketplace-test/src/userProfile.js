import React, { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const axios = require('axios').default;

const Profile = () => {
  var data;
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(true);
  var initialData = useRef(null);
  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;

      try {
        const accessToken = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
        console.log(accessToken);
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
        console.log(user_metadata, "tqwery");
        var languages = user_metadata['Language proficiency'];
        // console.log(languages, "languages");
        var name = user_metadata['Workflow Name'];
        // console.log(name, "name");
        initialData = JSON.stringify({ 'languages': languages, 'name': name });
        console.log(initialData, "hello0");
        console.log(process.env.REACT_APP_API);
        var config = {
            method: 'POST',
          url: process.env.REACT_APP_API,
          headers: {
          'Access-Control-Allow-Origin':'*',
          'Content-Type': 'application/json'
        },
        data : initialData
        };

        var response = await axios(config);
        console.log(response, 'response');


        setUserMetadata(user_metadata);
      } catch (e) {
        console.log(e.message);
      }
    };
    // useEffect(async () => {

    // });

    getUserMetadata();
    
    // console.log(JSON.stringify(userMetadata));

    

    // await sendData(userMetadata);
  }, [getAccessTokenSilently, user?.sub]);

  

  // var usermeta = JSON.stringify(userMetadata['Language proficiency']);
  // var languages = userMetadata['Language proficiency'];
  // var name = (userMetadata[' '])
//   var config = {
//       method: 'post',
//       url: 'https://c8odz568u4.execute-api.us-east-1.amazonaws.com/dev/getHighestPriorityTaskForUser',
//       headers: {
//           'Content-Type': 'application/json'
// },
// data : data
// };
// axios(config)
// .then(function (response) {
// console.log(JSON.stringify(response.data));
// })
// .catch(function (error) {
// console.log(error);
// });

  return (
    isAuthenticated && (
      
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <h3>User Metadata</h3>
        {userMetadata ? (

          <pre>{JSON.stringify(user, null,2)}</pre>
        ) : (
          "No user metadata defined"
        )}
        </div>
    )
  );
};

export default Profile;