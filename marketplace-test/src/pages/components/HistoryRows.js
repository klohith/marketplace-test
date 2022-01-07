import React, { useEffect, useState } from "react";
import "../../components/body/task_container.css";
import PopUp from "../components/PopUp";
const axios = require("axios").default;

function HistoryRows(props) {
  const [trigger, popUpTrigger] = useState(false);

  useEffect(async () => {
    console.log(props, "props");
    // var response = await axios({
    //   method: "POST",
    //   url:
    //     "https://43pjd7lzti.execute-api.us-east-1.amazonaws.com/Prod/HESTask",
    //   data: JSON.stringify({
    //     country: "US",
    //   }),
    // });
    // console.log(response.data);
    // const data = response.data;
    // const length = data.length;
    // console.log(length);
    // setTaskName(props.historyData.name);
    // setTaskSubcategory(props.historyData.subcategory);
    // setTaskAddress(props.historyData.address);
    // setTaskWebsite(props.historyData.website);
  }, []);
  //   const [taskName, setTaskName] = useState("taskName");
  //   const [taskSubcategory, setTaskSubcategory] = useState("taskSubcategory");
  //   const [taskWebsite, setTaskWebsite] = useState("taskWebsite");
  //   const [taskAddress, setTaskAddress] = useState("taskAddress");
  //   const [taskNumber, setTaskNumber] = useState("taskNumber");

  return (
    <tr className="task-table-data">
      {/* <td className="task-td tdOne">{props.ids.id}</td> */}
      <td className="task-td tdOne">{props.id}</td>
      {/* <div className="vl"></div> */}
      <td className="task-td tdTwo">{props["health authority name"]}</td>
      {/* <div className="vl"></div> */}
      <td className="task-td tdThree">{props.subcategory}</td>
      {/* <div className="vl"></div> */}
      <td className="task-td tdFour">{props["health authority website"]}</td>
      <td className="task-td tdFour">{props.address}</td>
      <td className="task-td tdFiveButton">
        <button onClick={() => popUpTrigger(true)}>Edit</button>
      </td>
      <PopUp trigger={trigger} setTrigger={popUpTrigger}>
        <p>Pop Up</p>
      </PopUp>
      {/* // ICON BUTTON */}
    </tr>
    // </div>
    // </div>
  );
}

export default HistoryRows;
