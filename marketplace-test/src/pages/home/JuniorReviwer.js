// import React from "react";

// function JuniorReviwer() {
//   return (
//     <div>
//       <form>
//         <label className="label-one">
//           subcategory: {textBoxLabel1 ? textBoxLabel1 : taskLabel}
//         </label>

//         <label className="label-one">
//           name: {textBoxLabel2 ? textBoxLabel2 : taskLabel}
//         </label>
//         <a href={textBoxLabel3} className="label-one">
//           website: {textBoxLabel3 ? textBoxLabel3 : taskLabel}
//         </a>
//         <label className="label-one">
//           address: {textBoxLabel4 ? textBoxLabel4 : taskLabel}
//         </label>
//         <label className="dropdown-one">
//           Geo information (select verified if Geo is listed in column N after
//           verifying info)
//         </label>
//         <select
//           id="dropdown"
//           className="dropdown-one"
//           onChange={(input) => {
//             // menu = input;
//             setMenuThree(input.target.value);
//             // console.log(menu, input.target.value);
//           }}
//         >
//           {/* <option value="N/A">N/A</option> */}
//           <option value={null}>{""}</option>
//           <option value="Verifed">Verifed</option>
//           <option value="Unable to Verify">Unable to Verify</option>
//         </select>
//         <label className="label-two">
//           {textBoxLabel5 ? textBoxLabel5 : taskLabel}:
//         </label>
//         <input
//           className="textbox"
//           type="text"
//           value={textBox1}
//           onChange={(e) => {
//             setTextBox1(e.target.value);
//           }}
//         />

//         <label className="label-two">
//           {textBoxLabel6 ? textBoxLabel6 : taskLabel}:
//         </label>
//         <select
//           id="dropdown"
//           className="dropdown-one"
//           onChange={(input) => {
//             // menu = input;
//             setMenuFour(input.target.value);
//             // console.log(menu, input.target.value);
//           }}
//         >
//           <option value={null}>{""}</option>
//           <option value="website">website</option>
//           <option value="address">address</option>
//           <option value="health authority name">health authority name</option>
//           <option value="website 	&#38; address">website &#38; address</option>
//           <option value="website &#38; name">website &#38; name</option>
//           <option value="all 3">all 3</option>
//         </select>
//         <label className="label-two">
//           {textBoxLabel7 ? textBoxLabel7 : taskLabel}:
//         </label>
//         <input
//           className="textbox"
//           type="text"
//           value={textBox3}
//           onChange={(e) => {
//             setTextBox3(e.target.value);
//           }}
//         />
//         <label className="label-two">
//           {textBoxLabel8 ? textBoxLabel8 : taskLabel}:
//         </label>
//         <input
//           className="textbox"
//           type="text"
//           value={textBox4}
//           onChange={(e) => {
//             setTextBox4(e.target.value);
//           }}
//         />
//         <label className="label-two">
//           {textBoxLabel9 ? textBoxLabel9 : taskLabel}:
//         </label>
//         <input
//           className="textbox"
//           type="text"
//           value={textBox5}
//           onChange={(e) => {
//             setTextBox5(e.target.value);
//           }}
//         />
//         <label className="label-two">
//           {textBoxLabel11 ? textBoxLabel11 : taskLabel}:
//         </label>
//         <select
//           id="dropdown-two"
//           onChange={(input) => {
//             // menu = input;
//             setMenuTwo(input.target.value);
//             // console.log(input.target.value);
//           }}
//         >
//           <option value={null}>{""}</option>
//           <option value="rev1">rev1</option>
//           <option value="rev2">rev2</option>
//           <option value="rev3">rev3</option>
//           <option value="rev4">rev4</option>
//           <option value="rev5">rev5</option>
//           <option value="rev6">rev6</option>
//           <option value="rev7">rev7</option>
//           <option value="rev8">rev8</option>
//           <option value="rev9">rev9</option>
//           <option value="rev10">rev10</option>
//           <option value="rev11">rev11</option>
//           <option value="rev12">rev12</option>
//         </select>
//         <label className="label-two">
//           {textBoxLabel12 ? textBoxLabel12 : taskLabel}:
//         </label>

//         <select
//           id="dropdown"
//           className="dropdown-one"
//           onChange={(input) => {
//             // menu = input;
//             setMenuOne(input.target.value);
//             // console.log(menu, input.target.value);
//           }}
//         >
//           <option value={null}>{""}</option>
//           <option value="1 Channel link on website">
//             1 Channel link on website
//           </option>
//           <option value="2 Channel about section">
//             2 Channel about section
//           </option>
//           <option value="3 Channel logo and name">
//             3 Channel logo and name
//           </option>
//           <option value="4 Channel video content">
//             4 Channel video content
//           </option>
//           <option value="5 Other (please comment)">
//             5 Other (please comment)
//           </option>
//           <option value="6 Unsure (please comment)">
//             6 Unsure (please comment)
//           </option>
//         </select>
//         <label className="label-two">
//           {textBoxLabel10 ? textBoxLabel10 : taskLabel}:
//         </label>

//         <input
//           className="textbox"
//           type="text"
//           value={textBox6}
//           onChange={(e) => {
//             setTextBox6(e.target.value);
//           }}
//         />

//         {/*
//           <label className="label-two">
//             {textBoxLabel5 ? textBoxLabel5 : taskLabel}
//           </label>
//           <input
//             type="text"
//             value={textBox7}
//             onChange={(e) => {
//               setTextBox7(e.target.value);
//             }}
//           />
//           <label className="label-two">
//             {textBoxLabel6 ? textBoxLabel6 : taskLabel}
//           </label>
//           <input
//             type="text"
//             value={textBox8}
//             onChange={(e) => {
//               setTextBox8(e.target.value);
//             }}
//           /> */}
//       </form>
//       <Button onClick={() => popUpTrigger(false)}>Close</Button>
//       <Button
//         onClick={async () => {
//           // setID("");
//           // setspreadsheet_ID("");
//           // var config = {
//           //   method: "POST",
//           //   // headers: { "Access-Control-Allow-Origin": "*" },
//           //   url:
//           //     "https://nwld2cgpj8.execute-api.us-east-1.amazonaws.com/Prod/getTask",
//           //   data: JSON.stringify({
//           //     country: "US",
//           //     email: user.email,
//           //   }),
//           // };
//           // var response = await axios(config);
//           // console.log(response.data.name, "response");
//           // // var data = JSON.parse(response.data);
//           // setTextBoxLabel1(response.data["subcategory"]);
//           // setTextBoxLabel2(response.data["health authority name"]);
//           // setTextBoxLabel3(response.data["health authority website"]);
//           // setTextBoxLabel4(response.data["address"]);

//           var JSONOBJ = {
//             spreadsheet_id: spreadsheet_ID,
//             task_id: id,
//             // end_time: "17-11-2021 9:42",
//             geo_information: menuThree,
//             organization_info: textBox1,
//             changed_info: menuFour,
//             health_care: textBox3,
//             not_health_care: textBox4,
//             youtube_channelID: textBox5,
//             medcase_team_member: menuTwo,
//             channel_selection: menu,
//             comments: textBox6,
//           };
//           console.log(JSONOBJ);

//           var configOne = {
//             method: "POST",
//             // headers: { "Access-Control-Allow-Origin": "*" },
//             url:
//               "https://nwld2cgpj8.execute-api.us-east-1.amazonaws.com/Prod/setTaskValue",
//             data: JSON.stringify(JSONOBJ),
//           };

//           var responseOne = await axios(configOne);
//           console.log(responseOne);
//           popUpTrigger(false);

//           setTextBoxLabel1("");
//           setTextBoxLabel2("");
//           setTextBoxLabel3("");
//           setTextBoxLabel4("");
//           setTextBox1("");
//           setTextBox3("");
//           setTextBox4("");
//           setTextBox5("");
//           setTextBox6("");

//           var config = {
//             method: "POST",
//             // headers: { "Access-Control-Allow-Origin": "*" },
//             url:
//               "https://nwld2cgpj8.execute-api.us-east-1.amazonaws.com/Prod/getTask",
//             data: JSON.stringify({
//               country: "US",
//               email: user.email,
//             }),
//           };
//           var response = await axios(config);
//           console.log(response.data, "response");
//           // var data = JSON.parse(response.data);
//           setTextBoxLabel1(response.data["subcategory"]);
//           setTextBoxLabel2(response.data["health authority name"]);
//           setTextBoxLabel3(response.data["health authority website"]);
//           setTextBoxLabel4(response.data["address"]);
//           setID(response.data["id"]);
//           setspreadsheet_ID(response.data["spreadsheet_ID"]);

//           // textBoxLabel1 = response.data.name;`
//           popUpTrigger(true);
//         }}
//       >
//         Next
//       </Button>
//     </div>
//   );
// }

// export default JuniorReviwer;
