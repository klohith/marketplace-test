// import React, { useEffect, useState } from "react";
// import "../../components/body/task_container.css";
// import HistoryRows from "../components/HistoryRows";
// const axios = require("axios").default;
// var rows = [];

// function HistoryRow(props) {
//   useEffect(async () => {
//     Object.entries(props.historyData).map((e) => rows.push(e[1]));
//     console.log(rows, "roe");
//     // var response = await axios({
//     //   method: "POST",
//     //   url:
//     //     "https://43pjd7lzti.execute-api.us-east-1.amazonaws.com/Prod/HESTask",
//     //   data: JSON.stringify({
//     //     country: "US",
//     //   }),
//     // });
//     // console.log(response.data);
//     // const data = response.data;
//     // const length = data.length;
//     // console.log(length);
//     // setTaskName(props.historyData.name);
//     // setTaskSubcategory(props.historyData.subcategory);
//     // setTaskAddress(props.historyData.address);
//     // setTaskWebsite(props.historyData.website);
//   }, []);
//   //   const [taskName, setTaskName] = useState("taskName");
//   //   const [taskSubcategory, setTaskSubcategory] = useState("taskSubcategory");
//   //   const [taskWebsite, setTaskWebsite] = useState("taskWebsite");
//   //   const [taskAddress, setTaskAddress] = useState("taskAddress");
//   //   const [taskNumber, setTaskNumber] = useState("taskNumber");

//   return (
//     // <div className="task">
//     //   {/* <hr className="task-hr"></hr> */}
//     //   <div className="task-table-header-container">
//     //     <table className="task-table">
//     //       <tr>
//     //         {/* <th className="task-th thOne">ID</th> */}
//     //         <th className="task-th thOne">Workflow Name</th>
//     //         {/* <div className="vl"></div> */}
//     //         <th className="task-th thTwo">Language</th>
//     //         {/* <div className="vl"></div> */}
//     //         <th className="task-th thThree">URL</th>
//     //         {/* <div className="vl"></div> */}
//     //         <th className="task-th thFour">Action</th>
//     //       </tr>
//     //       {/* <hr className="task-hr" /> */}
//     //       <tr className="task-table-data">
//     //         {/* <td className="task-td tdOne">{props.ids.id}</td> */}
//     //         <td className="task-td tdOne">{props.historyData.subcategory}</td>
//     //         {/* <div className="vl"></div> */}
//     //         <td className="task-td tdTwo">{props.historyData.name}</td>
//     //         {/* <div className="vl"></div> */}
//     //         <td className="task-td tdThree">{props.historyData.website}</td>
//     //         {/* <div className="vl"></div> */}
//     //         <td className="task-td tdFour">{props.historyData.address}</td>
//     //       </tr>
//     //     </table>
//     //   </div>
//     // </div>
//     rows.map((e) => <HistoryRows historyData={e} />)
//   );
// }

// export default HistoryRow;
