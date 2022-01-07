import React, { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Card, Button, Table, message, Alert } from "antd";
import { useHistory, Redirect } from "react-router-dom";
import {
  claimHighest,
  completeTask,
  reviewComplete,
  unClaimTask,
  // parkTaskForreviewer,
} from "./service";
import { useRequest } from "@umijs/hooks";
import {
  CheckOutlined,
  FlagOutlined,
  PlayCircleTwoTone,
  LogoutOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons";
import moment from "moment";
import PopUp from "../components/PopUp";
import { validate } from "@babel/types";
import "./css/homepage.css";
import JuniorReviwer from "./JuniorReviwer";
// import HistoryButton form "./HistoryButton.js";
import RoutesHandler from "./RoutesHandler";
import { Route } from "react-router";
// import History from "./pages/history/History.js";
import History from "../history/History";

const axios = require("axios").default;

function Homepage({ props }) {
  // if (props.authorized) {
  //   <Redirect to="/login" />;
  // }
  // var isSeniorReviwer = true;
  const [accessToken, setToken] = useState("");
  const { user, logout, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(true);
  const [isClaimed, setIsClaimed] = useState(false);
  const [initialDataFromAuth, setInitialDataFromAuth] = useState({});
  const [workflow, setWorkflow] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  var initialData = useRef(null);

  const completeTaskAdmin = useRequest(completeTask, {
    manual: true,
    formatResult: (response) => {
      message.success("Claimed");
      setIsClaimed(false);
    },
    onError: (error) => {
      console.log(error);
      //message.error(error);
    },
  });

  const unClaimTaskAdmin = useRequest(unClaimTask, {
    manual: true,
    formatResult: (response) => {
      message.success("Unclaimed");
      setWorkflow([]);
    },
    onError: (error) => {
      message.error(error);
    },
  });

  const review = useRequest(reviewComplete, {
    manual: true,
    formatResult: (response) => {
      message.success("Complete");
      setWorkflow([]);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  // const parkTask = useRequest(parkTaskForreviewer, {
  //   manual: true,
  //   formatResult: (response) => {
  //     message.success("Task sheet Parked");
  //     setWorkflow([]);
  //   },
  //   onError: (error) => {
  //     console.log(error);
  //   },
  // });

  const claimHighestAdmin = useRequest(claimHighest, {
    manual: true,
    formatResult: (response) => {
      setWorkflow(response);
      if (response.length === 0) {
        setShowNotification(true);
      } else {
        setShowNotification(false);
      }
      completeTaskAdmin.run({
        reviewerEmail: initialDataFromAuth["Teraneuro Email"], // "sai.allumalla@medcase.health",
        timeStampClaimed: moment(
          new Date().toLocaleString("en-US", {
            timeZone: "America/Los_Angeles",
          })
        ).format("YYYY-MM-DD HH:mm:ss"),
        idWorkflowMaster: response[0].id_workflow_master,
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    const getUserMetadata = async () => {
      const domain = process.env.REACT_APP_AUTH0_DOMAIN;

      try {
        var token = await getAccessTokenSilently({
          audience: `https://${domain}/api/v2/`,
          scope: "read:current_user",
        });
        setToken(token);
        console.log(accessToken, token);

        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        // console.log(await metadataResponse.json());

        const { user_metadata, app_metadata } = await metadataResponse.json();
        setInitialDataFromAuth(user_metadata);
        console.log(app_metadata, "tqwerytttt");
        if (app_metadata.role === "sr_reviewer") {
          setSeniorCheck(true);
          console.log(true);
        } else console.log(false);

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
        console.log(user_metadata, "user_metadata");

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

  const columns = [
    {
      title: "Workflow Name",
      dataIndex: "workflow_name",
      key: "workflow_name",
      width: "15%",
    },
    {
      title: "Language",
      dataIndex: "workflow_language",
      key: "workflow_language",
      width: "10%",
    },
    {
      title: "URL",
      dataIndex: "workflow_url",
      key: "workflow_url",

      render: (text) => (
        <a href={`${text}`} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",

      width: 500,
      fixed: "right",
      render: (text, record) => (
        <>
          {isClaimed === false && (
            <Button
              onClick={() => {
                unClaimTaskAdmin.run({
                  idWorkflowMaster: record.id_workflow_master,
                });
              }}
              type="primary"
            >
              <FlagOutlined /> Unclaim
            </Button>
          )}
          &nbsp;&nbsp;
          {isClaimed === false && (
            <Button
              onClick={() => {
                review.run({
                  timeStampComplete: moment(
                    new Date().toLocaleString("en-US", {
                      timeZone: "America/Los_Angeles",
                    })
                  ).format("YYYY-MM-DD HH:mm:ss"),
                  idWorkflowMaster: record.id_workflow_master,
                });
              }}
              type="primary"
            >
              <CheckOutlined /> Complete
            </Button>
          )}
          &nbsp;&nbsp;
          {/* {isClaimed === false && (
            <Button
              onClick={() => {
                parkTask.run({
                  idWorkflowMaster: record.id_workflow_master,
                });
              }}
              type="primary"
            >
              <CloseSquareOutlined /> Task Error
            </Button>
          )} */}
        </>
      ),
    },
  ];

  const loadingService = () => {
    if (claimHighestAdmin.loading) {
      return true;
    }

    if (completeTaskAdmin.loading) {
      return true;
    }

    if (review.loading) {
      return true;
    }

    return false;
  };

  const openUrl = () => {
    window.open("https://hume.google.com/assignments");
  };
  const [trigger, popUpTrigger] = useState(true);
  const [isSeniorReviwer, setSeniorCheck] = useState(false);

  const [textBox1, setTextBox1] = useState("");
  const [textBox2, setTextBox2] = useState("");
  const [textBox3, setTextBox3] = useState("");
  const [textBox4, setTextBox4] = useState("");
  const [textBox5, setTextBox5] = useState("");
  const [textBox6, setTextBox6] = useState("");
  const [textBox7, setTextBox7] = useState("");
  const [textBox8, setTextBox8] = useState("");

  const [textBoxLabel1, setTextBoxLabel1] = useState("");
  const [textBoxLabel2, setTextBoxLabel2] = useState("");
  const [textBoxLabel3, setTextBoxLabel3] = useState("");
  const [textBoxLabel4, setTextBoxLabel4] = useState("");
  const [textBoxLabel5, setTextBoxLabel5] = useState(
    "Has the organizational informtion changed?"
  );
  const [textBoxLabel6, setTextBoxLabel6] = useState(
    "If Y(info changed) what did you change?"
  );
  const [textBoxLabel7, setTextBoxLabel7] = useState(
    "Channel is Primary Health Care Related"
  );
  const [textBoxLabel8, setTextBoxLabel11] = useState(
    "Channel is NOT Primary Health Care Related"
  );
  const [textBoxLabel12, setTextBoxLabel12] = useState(
    "Channel Selection Method (pick the lowest number that applies)"
  );
  const [textBoxLabel11, setTextBoxLabel8] = useState("Medcase Team Meamber");
  const [textBoxLabel9, setTextBoxLabel9] = useState("Youtube channel ID");
  const [textBoxLabel10, setTextBoxLabel10] = useState("Comments");
  const [menu, setMenuOne] = useState("");
  const [menuTwo, setMenuTwo] = useState("");
  const [menuThree, setMenuThree] = useState("");
  const [menuFour, setMenuFour] = useState("");
  const [menuFive, setMenuFive] = useState("");
  const [menuSix, setMenuSix] = useState("");
  const [menuSeven, setMenuSeven] = useState("");
  const [id, setID] = useState("");
  const [spreadsheet_ID, setspreadsheet_ID] = useState("");
  const [currentid, setcurrentid] = useState(0);
  const [taskIds, setTaskIds] = useState([]);

  // console.log(userMetadata, "userMetadata");

  const taskLabel = "Task Name";

  let history = useHistory();

  const handleClick = () => {
    // state = { redirect: null };
    // render();
    // {
    //   if (this.state.redirect) {
    //     return <Redirect to={this.state.redirect} />;
    //   }
    //   return;
    // }
    // state = { redirect: null };
    // render() {
    // if (this.state.redirect) {
    //   return <Redirect to={this.state.redirect} />
    // }
    //   return (this.setState({ redirect: "/history" }))
    // }
  };

  function dataSet(val) {
    setTextBox1(val);
    console.log(textBox1);
  }

  // let openFrame = () => {
  //   const uri = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?response_type=token&connection=google-oauth2&client_id=TcsU556BBXOTGilwFdsXKzqqqsv9wB7G&redirect_uri=https://arge-hes.ue.r.appspot.com/&scope=read:current_user update:current_user_metadata&nonce=NONCE&prompt=none&audience=https://medcase-dev.eu.auth0.com/api/v2/`;

  //   let iframe = document.createElement("iframe");
  //   // window.top.postMessage("I am Iframe", "iframe");
  //   // window.onmessage = (event) => {
  //   //   if (event.data === "GOT_YOU_IFRAME") {
  //   //     console.log("Parent received successfully.");
  //   //   }
  //   // };
  //   iframe.src = uri;
  //   iframe.csp = "none";
  //   iframe.frameBorder = "0";
  //   iframe.id = "iframe";
  //   iframe.style.position = "absolute";
  //   iframe.style.zIndex = "999";
  //   iframe.style.height = "100%";
  //   iframe.style.width = "100%";
  //   iframe.style.top = "0";
  //   iframe.style.backgroundColor = "white";
  //   iframe.style.border = "none";
  //   document.body.prepend(iframe);
  //   document.body.style.overflow = "hidden";
  //   // var interval = setInterval(() => {
  //   //   iframe.contentWindow.postMessage(
  //   //     accessToken,
  //   //     "https://arge-hes.ue.r.appspot.com"
  //   //   );
  //   // clearInterval(interval);
  //   // }, 5000);
  //   // clear;
  //   // console.log("Hi");
  // };
  let openFrame = () => {
    const uri = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?response_type=token&connection=google-oauth2&client_id=TcsU556BBXOTGilwFdsXKzqqqsv9wB7G&redirect_uri=https://arge-hes.ue.r.appspot.com/&scope=read:current_user update:current_user_metadata&nonce=NONCE&prompt=none&audience=https://medcase-dev.eu.auth0.com/api/v2/`;

    let iframe = document.createElement("iframe");
    // window.top.postMessage("I am Iframe", "iframe");
    // window.onmessage = (event) => {
    //   if (event.data === "GOT_YOU_IFRAME") {
    //     console.log("Parent received successfully.");
    //   }
    // };
    iframe.src = "http://localhost:3000/";
    iframe.csp = "none";
    iframe.frameBorder = "0";
    iframe.id = "iframe";
    iframe.style.position = "absolute";
    iframe.style.zIndex = "999";
    iframe.style.height = "100%";
    iframe.style.width = "100%";
    iframe.style.top = "0";
    iframe.style.backgroundColor = "white";
    iframe.style.border = "none";
    document.body.prepend(iframe);
    document.body.style.overflow = "hidden";
    // var interval = setInterval(() => {
    //   iframe.contentWindow.postMessage(
    //     accessToken,
    //     "https://arge-hes.ue.r.appspot.com"
    //   );
    // clearInterval(interval);
    // }, 5000);
    // clear;
    // console.log("Hi");
  };
  return (
    <Card
      title={`Welcome ${user.name}`}
      loading={loadingService()}
      extra={
        <div>
          <Button
            onClick={async () => {
              // var config = {
              //   method: "POST",
              //   // headers: { "Access-Control-Allow-Origin": "*" },
              //   url:
              //     "https://nwld2cgpj8.execute-api.us-east-1.amazonaws.com/Prod/getTask",
              //   data: isSeniorReviwer
              //     ? JSON.stringify({
              //         country: "US",
              //         email: user.email,
              //         role: "sr_reviewer",
              //       })
              //     : JSON.stringify({
              //         country: "US",
              //         email: user.email,
              //       }),
              // };
              // var response = await axios(config);
              // // console.log(user);
              // console.log(response.data, "response");
              // // var data = JSON.parse(response.data);
              // setTextBoxLabel1(response.data["subcategory"]);
              // setTextBoxLabel2(response.data["health authority name"]);
              // setTextBoxLabel3(response.data["health authority website"]);
              // setTextBoxLabel4(response.data["address"]);
              // setID(response.data["id"]);
              // setspreadsheet_ID(response.data["spreadsheet_ID"]);
              // // textBoxLabel1 = response.data.name;`
              // popUpTrigger(true);
              openFrame();
              // console.log(
              //   response.data["organization_info"],
              //   "response.data[organization_info]"
              // );
              // if (isSeniorReviwer) {
              //   setMenuThree(response.data["geo_info"]);
              //   setTextBox1(response.data["organization_info"]);
              //   // setTextBox2(response.data["organization_info"]);
              //   setTextBox3(response.data["channel_health"]);
              //   // setTextBox4(response.data["channel_health"]);
              //   setMenuOne(response.data["channel_selection"]);
              //   setMenuTwo(response.data["medcase_team_member"]);
              //   setTextBox5(response.data["youtube_channelId"]);
              //   setTextBox6(response.data["comments"]);
              //   // console.log(response.data["organization_info"]);
              // }
              // // localStorage.setItem(
              // //   "workflowName",
              // //   initialDataFromAuth["Workflow Name"]
              // // );
              // // localStorage.setItem(
              // //   "currentLanguage",
              // //   initialDataFromAuth["Language proficiency"]
              // // );
              // // claimHighestAdmin.run();
            }}
            type="primary"
          >
            <PlayCircleTwoTone /> Start Task Argo
          </Button>
          {/* <Button
            onClick={() => handleClick()}
            // type="primary"
            email={user.email}
            isSeniorReviwer={isSeniorReviwer}
          >
            History
          </Button> */}
          {/* <HistoryButton /> */}
        </div>
      }
    >
      {/* <PopUp>
        <iframe
          src="https://google-hes-argo-frontend-test.s3.amazonaws.com/build/index.html"
          height="300"
          width="300"
          id="medcaseIframe"
        ></iframe>
      </PopUp> */}
      {/* {showNotification === true && (
        <Alert
          style={{ marginBottom: "1.5rem" }}
          message={
            <div>
              No tasks currently available in Evergreen,News,revetting or
              Snippets
              <br />
              Please Check for other work as appropriate:
              <br /> Hume workflow
              <Button size="small" type="text" onClick={openUrl}>
                https://hume.google.com/assignments
              </Button>
              <br />
              Vaccine Tracker
              <br />
              RaterHub
            </div>
          }
          type="info"
          showIcon
        />
      )}
      <Table columns={columns} dataSource={workflow} scroll={{ x: 800 }} /> */}
    </Card>
  );
}
export default Homepage;
