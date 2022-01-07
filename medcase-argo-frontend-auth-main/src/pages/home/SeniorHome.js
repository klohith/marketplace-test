import React, { useEffect, useState, useRef } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { Card, Button, Table, message, Alert } from "antd";
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

const axios = require("axios").default;

function SeniorHome() {
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
        setInitialDataFromAuth(user_metadata);
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
  const [id, setID] = useState("");
  const [spreadsheet_ID, setspreadsheet_ID] = useState("");

  const taskLabel = "Task Name";

  function dataSet(val) {
    setTextBox1(val);
    console.log(textBox1);
  }
  return (
    <Card
      title={`Welcome ${initialDataFromAuth?.Name}`}
      loading={loadingService()}
      extra={
        <div>
          <Button
            onClick={async () => {
              var config = {
                method: "POST",
                // headers: { "Access-Control-Allow-Origin": "*" },
                url:
                  "https://nwld2cgpj8.execute-api.us-east-1.amazonaws.com/Prod/getTask",
                data: JSON.stringify({
                  country: "US",
                  email: user.email,
                }),
              };
              var response = await axios(config);
              // console.log(user);

              // console.log(response.data.name, "response");
              // var data = JSON.parse(response.data);
              setTextBoxLabel1(response.data["subcategory"]);
              setTextBoxLabel2(response.data["health authority name"]);
              setTextBoxLabel3(response.data["health authority website"]);
              setTextBoxLabel4(response.data["address"]);
              setID(response.data["id"]);
              setspreadsheet_ID(response.data["spreadsheet_ID"]);

              // textBoxLabel1 = response.data.name;`
              popUpTrigger(true);

              // localStorage.setItem(
              //   "workflowName",
              //   initialDataFromAuth["Workflow Name"]
              // );
              // localStorage.setItem(
              //   "currentLanguage",
              //   initialDataFromAuth["Language proficiency"]
              // );
              // claimHighestAdmin.run();
            }}
            type="primary"
          >
            <PlayCircleTwoTone /> Start Task
          </Button>
        </div>
      }
    >
      <PopUp trigger={trigger} setTrigger={popUpTrigger}>
        {/* <h1>Pop Up</h1> */}
        <form>
          <label className="label-one">
            subcategory: {textBoxLabel1 ? textBoxLabel1 : taskLabel}
          </label>

          <label className="label-one">
            name: {textBoxLabel2 ? textBoxLabel2 : taskLabel}
          </label>
          <a href={textBoxLabel3} className="label-one">
            website: {textBoxLabel3 ? textBoxLabel3 : taskLabel}
          </a>
          <label className="label-one">
            address: {textBoxLabel4 ? textBoxLabel4 : taskLabel}
          </label>
          <label className="dropdown-one">
            Geo information (select verified if Geo is listed in column N after
            verifying info)
          </label>
          <select
            id="dropdown"
            className="dropdown-one"
            onChange={(input) => {
              // menu = input;
              setMenuThree(input.target.value);
              // console.log(menu, input.target.value);
            }}
          >
            {/* <option value="N/A">N/A</option> */}
            <option value={null}>{""}</option>
            <option value="Verifed">Verifed</option>
            <option value="Unable to Verify">Unable to Verify</option>
          </select>
          <label className="label-two">
            {textBoxLabel5 ? textBoxLabel5 : taskLabel}:
          </label>
          <input
            className="textbox"
            type="text"
            value={textBox1}
            onChange={(e) => {
              setTextBox1(e.target.value);
            }}
          />

          <label className="label-two">
            {textBoxLabel6 ? textBoxLabel6 : taskLabel}:
          </label>
          <select
            id="dropdown"
            className="dropdown-one"
            onChange={(input) => {
              // menu = input;
              setMenuFour(input.target.value);
              // console.log(menu, input.target.value);
            }}
          >
            <option value={null}>{""}</option>
            <option value="website">website</option>
            <option value="address">address</option>
            <option value="health authority name">health authority name</option>
            <option value="website 	&#38; address">website &#38; address</option>
            <option value="website &#38; name">website &#38; name</option>
            <option value="all 3">all 3</option>
          </select>
          <label className="label-two">
            {textBoxLabel7 ? textBoxLabel7 : taskLabel}:
          </label>
          <input
            className="textbox"
            type="text"
            value={textBox3}
            onChange={(e) => {
              setTextBox3(e.target.value);
            }}
          />
          <label className="label-two">
            {textBoxLabel8 ? textBoxLabel8 : taskLabel}:
          </label>
          <input
            className="textbox"
            type="text"
            value={textBox4}
            onChange={(e) => {
              setTextBox4(e.target.value);
            }}
          />
          <label className="label-two">
            {textBoxLabel9 ? textBoxLabel9 : taskLabel}:
          </label>
          <input
            className="textbox"
            type="text"
            value={textBox5}
            onChange={(e) => {
              setTextBox5(e.target.value);
            }}
          />
          <label className="label-two">
            {textBoxLabel11 ? textBoxLabel11 : taskLabel}:
          </label>
          <select
            id="dropdown-two"
            onChange={(input) => {
              // menu = input;
              setMenuTwo(input.target.value);
              // console.log(input.target.value);
            }}
          >
            <option value={null}>{""}</option>
            <option value="rev1">rev1</option>
            <option value="rev2">rev2</option>
            <option value="rev3">rev3</option>
            <option value="rev4">rev4</option>
            <option value="rev5">rev5</option>
            <option value="rev6">rev6</option>
            <option value="rev7">rev7</option>
            <option value="rev8">rev8</option>
            <option value="rev9">rev9</option>
            <option value="rev10">rev10</option>
            <option value="rev11">rev11</option>
            <option value="rev12">rev12</option>
          </select>
          <label className="label-two">
            {textBoxLabel12 ? textBoxLabel12 : taskLabel}:
          </label>

          <select
            id="dropdown"
            className="dropdown-one"
            onChange={(input) => {
              // menu = input;
              setMenuOne(input.target.value);
              // console.log(menu, input.target.value);
            }}
          >
            <option value={null}>{""}</option>
            <option value="1 Channel link on website">
              1 Channel link on website
            </option>
            <option value="2 Channel about section">
              2 Channel about section
            </option>
            <option value="3 Channel logo and name">
              3 Channel logo and name
            </option>
            <option value="4 Channel video content">
              4 Channel video content
            </option>
            <option value="5 Other (please comment)">
              5 Other (please comment)
            </option>
            <option value="6 Unsure (please comment)">
              6 Unsure (please comment)
            </option>
          </select>
          <label className="label-two">
            {textBoxLabel10 ? textBoxLabel10 : taskLabel}:
          </label>

          <input
            className="textbox"
            type="text"
            value={textBox6}
            onChange={(e) => {
              setTextBox6(e.target.value);
            }}
          />

          {/*
          <label className="label-two">
            {textBoxLabel5 ? textBoxLabel5 : taskLabel}
          </label>
          <input
            type="text"
            value={textBox7}
            onChange={(e) => {
              setTextBox7(e.target.value);
            }}
          />
          <label className="label-two">
            {textBoxLabel6 ? textBoxLabel6 : taskLabel}
          </label>
          <input
            type="text"
            value={textBox8}
            onChange={(e) => {
              setTextBox8(e.target.value);
            }}
          /> */}
        </form>
        <Button onClick={() => popUpTrigger(false)}>Close</Button>
        <Button
          onClick={async () => {
            // setID("");
            // setspreadsheet_ID("");
            // var config = {
            //   method: "POST",
            //   // headers: { "Access-Control-Allow-Origin": "*" },
            //   url:
            //     "https://nwld2cgpj8.execute-api.us-east-1.amazonaws.com/Prod/getTask",
            //   data: JSON.stringify({
            //     country: "US",
            //     email: user.email,
            //   }),
            // };
            // var response = await axios(config);
            // console.log(response.data.name, "response");
            // // var data = JSON.parse(response.data);
            // setTextBoxLabel1(response.data["subcategory"]);
            // setTextBoxLabel2(response.data["health authority name"]);
            // setTextBoxLabel3(response.data["health authority website"]);
            // setTextBoxLabel4(response.data["address"]);

            var JSONOBJ = {
              spreadsheet_id: spreadsheet_ID,
              task_id: id,
              // end_time: "17-11-2021 9:42",
              geo_information: menuThree,
              organization_info: textBox1,
              changed_info: menuFour,
              health_care: textBox3,
              not_health_care: textBox4,
              youtube_channelID: textBox5,
              medcase_team_member: menuTwo,
              channel_selection: menu,
              comments: textBox6,
            };
            console.log(JSONOBJ);

            var configOne = {
              method: "POST",
              // headers: { "Access-Control-Allow-Origin": "*" },
              url:
                "https://nwld2cgpj8.execute-api.us-east-1.amazonaws.com/Prod/setTaskValue",
              data: JSON.stringify(JSONOBJ),
            };

            var responseOne = await axios(configOne);
            console.log(responseOne);
            popUpTrigger(false);

            setTextBoxLabel1("");
            setTextBoxLabel2("");
            setTextBoxLabel3("");
            setTextBoxLabel4("");
            setTextBox1("");
            setTextBox3("");
            setTextBox4("");
            setTextBox5("");
            setTextBox6("");

            var config = {
              method: "POST",
              // headers: { "Access-Control-Allow-Origin": "*" },
              url:
                "https://nwld2cgpj8.execute-api.us-east-1.amazonaws.com/Prod/getTask",
              data: JSON.stringify({
                country: "US",
                email: user.email,
              }),
            };
            var response = await axios(config);
            console.log(response.data, "response");
            // var data = JSON.parse(response.data);
            setTextBoxLabel1(response.data["subcategory"]);
            setTextBoxLabel2(response.data["health authority name"]);
            setTextBoxLabel3(response.data["health authority website"]);
            setTextBoxLabel4(response.data["address"]);
            setID(response.data["id"]);
            setspreadsheet_ID(response.data["spreadsheet_ID"]);

            // textBoxLabel1 = response.data.name;`
            popUpTrigger(true);
          }}
        >
          Next
        </Button>
      </PopUp>
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
export default SeniorHome;
