import React, { useEffect, useState, createContext } from "react";
import { useAuth0 } from "@auth0/auth0-react";
const axios = require("axios").default;

export const UserContext = createContext();

export const UserProvider = (props) => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  var initialData;
  const [userMetadata, setUserMetadata] = useState();
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
        var languages = user_metadata["Language proficiency"];
        // console.log(languages, "languages");
        var name = user_metadata["Workflow Name"];
        // console.log(name, "name");
        initialData = JSON.stringify({ languages: languages, name: name });
        console.log(initialData, "hello0");
        console.log(process.env.REACT_APP_API);
        // initialData = {
        //   language: [
        //     "en",
        //     "fr",
        //     "de",
        //     "id",
        //     "nl",
        //     "ar",
        //     "pt",
        //     "ia",
        //     "gh",
        //     "da",
        //   ],
        //   name: ["NEWS", "SNIPPETS", "EVERGREEN", "REVETTING"],
        // };
        // var config = {
        //   method: "POST",
        //   url: "https://n5krtt2kbl.execute-api.us-east-1.amazonaws.com/Stage/getHighestPriorityTaskForUser",
        //   headers: {
        //     "Access-Control-Allow-Origin": "*",
        //     "x-api-key": "8PUQOm6mDS2jEzPQx9kmBGlQoqDxPzc89uI9S3c4",
        //   },
        //   data: initialData,
        // };

        // var response = await axios(config);
        // console.log(response, "response");

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

  return (
    <UserContext.Provider value={[userMetadata]}>
      {props.children}
    </UserContext.Provider>
  );
};
