import Table from "rc-table/lib/Table";
import React, { useEffect, useState } from "react";
// import "../history/History.css";
import HistoryRows from "../components/HistoryRows";
import HistoryRow from "./HistoryRow";
import "../../components/body/task_container.css";
import { useAuth0 } from "@auth0/auth0-react";
// import "../../components/body/History.css";
const axios = require("axios").default;
var rows = [];
var rowComp = [];
function History(props) {
  // const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  //43pjd7lzti.execute-api.us-east-1.amazonaws.com/Prod/HESTask
  useEffect(async () => {
    var response = await axios({
      method: "POST",
      url:
        "https://nwld2cgpj8.execute-api.us-east-1.amazonaws.com/Prod/getHistory",
      data: JSON.stringify({
        email: "lohith.kalavakunta@medcase.health",
        country: "US",
        role: "sr_riviewer",
      }),
    });
    console.log(response.data);
    setData(response.data.tasks);
    // const length = data.length;
    // console.log(length, "llegngth");
    // Object.entries(response.data).map((e) => rows.push(e[1]));
    // console.log(rowsComponent, "ooo");
    // setRows(() => {
    //   return rows.map((row, id) => {
    //     console.log(row, id);
    //     <HistoryRows historyData={row[id]} />;
    //   });
    // });
    // rowComp = <HistoryRows historyData={response.data} />;
    // setRows(() => {
    //   return arrayOfObj.map((task, id) => {
    //     console.log("task");
    //     // console.log(id, "id");
    //     return <HistoryRows historyData={task[id]} />;
    //   });

    // for (var i = 0; i < length; i++) {
    //   rows.push(<HistoryRows historyData={data[i]} />);
    // }
    // });
    // setTaskName(data.name);
    // setTaskSubcategory(data.subcategory);
    // setTaskAddress(data.address);
    // setTaskWebsite(data.website);
  }, []);
  // const [taskName, setTaskName] = useState("taskName");
  // const [taskSubcategory, setTaskSubcategory] = useState("taskSubcategory");
  // const [taskWebsite, setTaskWebsite] = useState("taskWebsite");
  // const [taskAddress, setTaskAddress] = useState("taskAddress");
  const [rowsComponent, setRows] = useState([]);
  const [data, setData] = useState([]);
  // const [arrayOfObj, setarrayOfObj] = useState("data");

  return (
    // {/*<div className="container">*/}
    //   {/* <p>{JSON.stringify(data, null, 2)}</p> */}
    //   {/* <HistoryRow historyData={data} /> */}
    //   {/* data.map((e)=>{ }) */}
    //   {/* {Object.entries(data).map((task) => { */}
    //   {/* <HistoryRows historyData={data} /> */}
    //   {/* <p>{typeof arrayOfObj}</p> */}
    //   {/* {rows.map((e) => (
    //     <HistoryRows historyData={e} />
    //   ))} */}
    <div className="task">
      <div className="task-table-header-container">
        <table className="task-table">
          <tr>
            {/* <th className="task-th thOne">ID</th> */}
            <th className="task-th thOne">Tasks Id</th>
            <th className="task-th thOne">Workflow Name</th>
            {/* <div className="vl"></div> */}

            <th className="task-th thTwo">Subcategory</th>
            {/* <div className="vl"></div> */}
            <th className="task-th thThree">URL</th>
            {/* <div className="vl"></div> */}
            <th className="task-th thFour">Address</th>
            <th className="task-th thFour">Action</th>
          </tr>
          {data.map((e, id) => (
            <HistoryRows key={id} {...e} />
          ))}
        </table>
      </div>
    </div>
    //   {/* {data.map((e) => (
    //     <HistoryRow historyData={e} />
    //   ))} */}
    //   {/* <p>{task}</p>; */}
    //   {/* {arrayOfObj.map((task, id) => {
    //     console.log("task");
    //     // console.log(id, "id");
    //     return <HistoryRows historyData={task[id]} />;
    //   })} */}
    //   {/* })} */}
    //   {/* {rowsComponent} */}
    //   {/* {rowComp} */}
    // {/* </div> */}
  );
}

export default History;
