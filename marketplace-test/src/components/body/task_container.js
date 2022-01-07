import React, { useContext } from "react";
import styles from "./task_container.css";
import { useAuth0 } from "@auth0/auth0-react";
import { UserProvider, UserContext } from "../../user/UserContext";

const axios = require("axios").default;

const onClickEvent = async () => {
  var initialData = {
    language: ["en", "fr", "de", "id", "nl", "ar", "pt", "ia", "gh", "da"],
    name: ["NEWS", "SNIPPETS", "EVERGREEN", "REVETTING"],
  };

  var config = {
    method: "POST",
    url: "https://n5krtt2kbl.execute-api.us-east-1.amazonaws.com/Stage/getHighestPriorityTaskForUser",
    headers: {
      "Access-Control-Allow-Headers": "*",
      "x-api-key": "8PUQOm6mDS2jEzPQx9kmBGlQoqDxPzc89uI9S3c4",
    },
    data: initialData,
  };

  var response = await axios(config);
  console.log(response, "response");
};
const TaskPane = () => {
  const userMetadata = useContext(UserContext);
  return (
    <UserProvider>
      <div className="container">
        <div className="task" styles={styles}>
          <header className="task-header">
            <h className="task-head">Tasks</h>
            <button
              className="task-claim"
              onClick={() => {
                onClickEvent();
              }}
            >
              Claim Hieghst Priority Task
            </button>
          </header>
          <hr className="task-hr"></hr>
          <div className="task-table-header-container">
            <table className="task-table">
              <tr>
                <th className="task-th thOne">Workflow Name</th>
                {/* <div className="vl"></div> */}
                <th className="task-th thTwo">Language</th>
                {/* <div className="vl"></div> */}
                <th className="task-th thThree">URL</th>
                {/* <div className="vl"></div> */}
                <th className="task-th thFour">Action</th>
              </tr>
              {/* <hr className="task-hr" /> */}
              <tr className="task-table-data">
                <td className="task-td tdOne">
                  {JSON.stringify(userMetadata)}
                </td>
                {/* <div className="vl"></div> */}
                <td className="task-td tdTwo">Language</td>
                {/* <div className="vl"></div> */}
                <td className="task-td tdThree">URL</td>
                {/* <div className="vl"></div> */}
                <td className="task-td tdFour">Action</td>
              </tr>
            </table>
          </div>

          {/* <div className="task-table-data-container">
          <table className="task-table"></table>
        </div> */}
          <hr className="task-hr"></hr>
          <p className="">{JSON.stringify(userMetadata)}</p>

          <footer className="task-footer">
            <div> </div>
          </footer>
        </div>
      </div>
    </UserProvider>
  );
};

export default TaskPane;
