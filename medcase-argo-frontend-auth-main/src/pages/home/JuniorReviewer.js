import { useState, Fragment, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import {
  Card,
  Button,
  message,
  Radio,
  Form,
  Input,
  Select,
  Row,
  Col,
  Modal,
} from "antd";
import { PlayCircleTwoTone, SmileTwoTone } from "@ant-design/icons";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

import Spinner from "../../components/Spinner";

const { Option } = Select;

function JuniorReviewer() {
  let history = useHistory();
  // var interval;
  var time;

  const { user } = useAuth0();
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState(null);
  const [interval, setTImeInterval] = useState(null);
  const [startTime, setStartTime] = useState(new Date().getTime());
  const [authorityName, setAuthorityName] = useState("");
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [geoInformation, setGeoInformation] = useState("");
  const [informationChanged, setInformationChanged] = useState("No");
  const [whatChanged, setWhatChanged] = useState("");
  const [channel, setChannel] = useState("");
  const [youtube, setYoutube] = useState("");
  const [teamMembder, setTeamMember] = useState(user.name);
  const [channelMethod, setChannelMethod] = useState("");
  const [comments, setComments] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showGetTask, setShowGetTask] = useState(true);
  const [originalValues, setOriginalValues] = useState(null);
  const [firstEnter, setFirstEnter] = useState(true);
  const [websiteAux, setWebsiteAux] = useState("");
  const [authorityNameAux, setAuthorityNameAux] = useState("");
  const [addressAux, setAddressAux] = useState("");
  const [checkTaskTime, setCheckTaskTime] = useState(false);
  useEffect(() => {
    window.addEventListener("message", (event) => {
      console.log(event.data);
    });
    if (firstEnter) return;

    if (
      authorityName !== originalValues.authorityName ||
      address !== originalValues.address ||
      website !== originalValues.website
    ) {
      setInformationChanged("Yes");
    } else {
      setInformationChanged("No");
    }

    if (website !== originalValues.website) {
      setWebsiteAux("website");
    } else {
      setWebsiteAux("");
    }

    if (address !== originalValues.address) {
      setAddressAux("address");
    } else {
      setAddressAux("");
    }

    if (authorityName !== originalValues.authorityName) {
      setAuthorityNameAux("authority name");
    } else {
      setAuthorityNameAux("");
    }
  }, [authorityName, address, website]);

  useEffect(() => {
    if (firstEnter) return;
    let aux;
    if (authorityNameAux !== "" && websiteAux != "" && addressAux !== "") {
      aux = "all 3";
    } else {
      aux = `${authorityNameAux} ${websiteAux} ${addressAux}`;
    }
    setWhatChanged(aux.trim());
  }, [websiteAux, authorityNameAux, addressAux]);

  const validate = () => {
    const validationRes = { error: false, message: "" };
    if (geoInformation === "" || geoInformation === -1) {
      validationRes.error = true;
      validationRes.message = "Please select a value for Geo Information Field";
      return validationRes;
    }

    if (channel === "" || channel === -1) {
      validationRes.error = true;
      validationRes.message =
        "Please select a value for is Primary Health Care Related? Field";
      return validationRes;
    }

    if (youtube === "" || youtube === -1) {
      validationRes.error = true;
      validationRes.message =
        "Please select a value for Youtube channel ID Field";
      return validationRes;
    }

    if (channelMethod === "" || channelMethod === -1) {
      validationRes.error = true;
      validationRes.message =
        "Please select a value for Channel Selection Method Field";
      return validationRes;
    }

    return validationRes;
  };

  const componentDidMount = (startTime) => {
    console.log(startTime, "time");
    // https://api.dev-marketplace.medcase.app/clinicians/:clinicianID/projects/:projectID/track
    // body : {startTime, endTime, isDone}
    // post
    // apiKey in header
    setStartTime(startTime);
    console.log(startTime, "startTime");

    setTImeInterval(
      setInterval(() => {
        var data = JSON.stringify({
          startTime: startTime,
          endTime: new Date().getTime(),
          isDone: false,
        });
        var config = {
          method: "post",
          url:
            "https://api.dev-marketplace.medcase.app/tracking/clinicians/testClient/projects/test/track",
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ilc2RGhGN2FvNW9MWmNWZjF0bUpmVyJ9.eyJpc3MiOiJodHRwczovL21lZGNhc2UtZGV2LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJJVUc5WVVuSVRTNUpia2djU2xDRWMyNDYzRlp2NFdJeUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9tZWRjYXNlLWRldi5ldS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY0MTIxNzYwNiwiZXhwIjoxNjQxMzA0MDA2LCJhenAiOiJJVUc5WVVuSVRTNUpia2djU2xDRWMyNDYzRlp2NFdJeSIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.npaAm0SODXJ9inIeZsCaK-DJ2fl77-HKr7M0_X2-JfZDeCsrj8K_nlgAWdKpSTs_T3jp7emh-2KYsdYzFQWfVanwSQR6nzPNykEFW2l9uhEd78TjbR2L7L-LQiGukw6j3KyjdYJebYKFR1U-BpoAcRplC95QyRQyG0IJUHr4CJcfBk_hAFSu3khnse4u97r9DrsNd_w8xg47upjB8TF0-sUmQr_tEGWvwusy00CSOrsAOO9FeFzxXJ-vzx0ulDklaKFPyf-bYx7U5jxJ9YUSSQE6Ieewp2UzfjkOiugoat-c9Y81eljrGx2KJi-kZWivpZDqEI2l23Ul_Pd_TH4Gnw",
            "Content-Type": "application/json",
          },
          data: data,
        };
        axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data), "interval executed");
          })
          .catch(function (error) {
            console.log(error);
          });
        console.log("check interval");
      }, 5000)
    );
  };

  const componentWillUnmount = (startTime) => {
    console.log(startTime, "over");
    setTImeInterval(clearInterval(interval));

    var data = JSON.stringify({
      startTime: startTime,
      endTime: new Date().getTime(),
      isDone: true,
    });
    var config = {
      method: "post",
      url:
        "https://api.dev-marketplace.medcase.app/tracking/clinicians/testClient/projects/test/track",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ilc2RGhGN2FvNW9MWmNWZjF0bUpmVyJ9.eyJpc3MiOiJodHRwczovL21lZGNhc2UtZGV2LmV1LmF1dGgwLmNvbS8iLCJzdWIiOiJJVUc5WVVuSVRTNUpia2djU2xDRWMyNDYzRlp2NFdJeUBjbGllbnRzIiwiYXVkIjoiaHR0cHM6Ly9tZWRjYXNlLWRldi5ldS5hdXRoMC5jb20vYXBpL3YyLyIsImlhdCI6MTY0MTIxNzYwNiwiZXhwIjoxNjQxMzA0MDA2LCJhenAiOiJJVUc5WVVuSVRTNUpia2djU2xDRWMyNDYzRlp2NFdJeSIsInNjb3BlIjoicmVhZDpjbGllbnRfZ3JhbnRzIGNyZWF0ZTpjbGllbnRfZ3JhbnRzIGRlbGV0ZTpjbGllbnRfZ3JhbnRzIHVwZGF0ZTpjbGllbnRfZ3JhbnRzIHJlYWQ6dXNlcnMgdXBkYXRlOnVzZXJzIGRlbGV0ZTp1c2VycyBjcmVhdGU6dXNlcnMgcmVhZDp1c2Vyc19hcHBfbWV0YWRhdGEgdXBkYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSBkZWxldGU6dXNlcnNfYXBwX21ldGFkYXRhIGNyZWF0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgcmVhZDp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfY3VzdG9tX2Jsb2NrcyBkZWxldGU6dXNlcl9jdXN0b21fYmxvY2tzIGNyZWF0ZTp1c2VyX3RpY2tldHMgcmVhZDpjbGllbnRzIHVwZGF0ZTpjbGllbnRzIGRlbGV0ZTpjbGllbnRzIGNyZWF0ZTpjbGllbnRzIHJlYWQ6Y2xpZW50X2tleXMgdXBkYXRlOmNsaWVudF9rZXlzIGRlbGV0ZTpjbGllbnRfa2V5cyBjcmVhdGU6Y2xpZW50X2tleXMgcmVhZDpjb25uZWN0aW9ucyB1cGRhdGU6Y29ubmVjdGlvbnMgZGVsZXRlOmNvbm5lY3Rpb25zIGNyZWF0ZTpjb25uZWN0aW9ucyByZWFkOnJlc291cmNlX3NlcnZlcnMgdXBkYXRlOnJlc291cmNlX3NlcnZlcnMgZGVsZXRlOnJlc291cmNlX3NlcnZlcnMgY3JlYXRlOnJlc291cmNlX3NlcnZlcnMgcmVhZDpkZXZpY2VfY3JlZGVudGlhbHMgdXBkYXRlOmRldmljZV9jcmVkZW50aWFscyBkZWxldGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGNyZWF0ZTpkZXZpY2VfY3JlZGVudGlhbHMgcmVhZDpydWxlcyB1cGRhdGU6cnVsZXMgZGVsZXRlOnJ1bGVzIGNyZWF0ZTpydWxlcyByZWFkOnJ1bGVzX2NvbmZpZ3MgdXBkYXRlOnJ1bGVzX2NvbmZpZ3MgZGVsZXRlOnJ1bGVzX2NvbmZpZ3MgcmVhZDpob29rcyB1cGRhdGU6aG9va3MgZGVsZXRlOmhvb2tzIGNyZWF0ZTpob29rcyByZWFkOmFjdGlvbnMgdXBkYXRlOmFjdGlvbnMgZGVsZXRlOmFjdGlvbnMgY3JlYXRlOmFjdGlvbnMgcmVhZDplbWFpbF9wcm92aWRlciB1cGRhdGU6ZW1haWxfcHJvdmlkZXIgZGVsZXRlOmVtYWlsX3Byb3ZpZGVyIGNyZWF0ZTplbWFpbF9wcm92aWRlciBibGFja2xpc3Q6dG9rZW5zIHJlYWQ6c3RhdHMgcmVhZDppbnNpZ2h0cyByZWFkOnRlbmFudF9zZXR0aW5ncyB1cGRhdGU6dGVuYW50X3NldHRpbmdzIHJlYWQ6bG9ncyByZWFkOmxvZ3NfdXNlcnMgcmVhZDpzaGllbGRzIGNyZWF0ZTpzaGllbGRzIHVwZGF0ZTpzaGllbGRzIGRlbGV0ZTpzaGllbGRzIHJlYWQ6YW5vbWFseV9ibG9ja3MgZGVsZXRlOmFub21hbHlfYmxvY2tzIHVwZGF0ZTp0cmlnZ2VycyByZWFkOnRyaWdnZXJzIHJlYWQ6Z3JhbnRzIGRlbGV0ZTpncmFudHMgcmVhZDpndWFyZGlhbl9mYWN0b3JzIHVwZGF0ZTpndWFyZGlhbl9mYWN0b3JzIHJlYWQ6Z3VhcmRpYW5fZW5yb2xsbWVudHMgZGVsZXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRzIGNyZWF0ZTpndWFyZGlhbl9lbnJvbGxtZW50X3RpY2tldHMgcmVhZDp1c2VyX2lkcF90b2tlbnMgY3JlYXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgZGVsZXRlOnBhc3N3b3Jkc19jaGVja2luZ19qb2IgcmVhZDpjdXN0b21fZG9tYWlucyBkZWxldGU6Y3VzdG9tX2RvbWFpbnMgY3JlYXRlOmN1c3RvbV9kb21haW5zIHVwZGF0ZTpjdXN0b21fZG9tYWlucyByZWFkOmVtYWlsX3RlbXBsYXRlcyBjcmVhdGU6ZW1haWxfdGVtcGxhdGVzIHVwZGF0ZTplbWFpbF90ZW1wbGF0ZXMgcmVhZDptZmFfcG9saWNpZXMgdXBkYXRlOm1mYV9wb2xpY2llcyByZWFkOnJvbGVzIGNyZWF0ZTpyb2xlcyBkZWxldGU6cm9sZXMgdXBkYXRlOnJvbGVzIHJlYWQ6cHJvbXB0cyB1cGRhdGU6cHJvbXB0cyByZWFkOmJyYW5kaW5nIHVwZGF0ZTpicmFuZGluZyBkZWxldGU6YnJhbmRpbmcgcmVhZDpsb2dfc3RyZWFtcyBjcmVhdGU6bG9nX3N0cmVhbXMgZGVsZXRlOmxvZ19zdHJlYW1zIHVwZGF0ZTpsb2dfc3RyZWFtcyBjcmVhdGU6c2lnbmluZ19rZXlzIHJlYWQ6c2lnbmluZ19rZXlzIHVwZGF0ZTpzaWduaW5nX2tleXMgcmVhZDpsaW1pdHMgdXBkYXRlOmxpbWl0cyBjcmVhdGU6cm9sZV9tZW1iZXJzIHJlYWQ6cm9sZV9tZW1iZXJzIGRlbGV0ZTpyb2xlX21lbWJlcnMgcmVhZDplbnRpdGxlbWVudHMgcmVhZDphdHRhY2tfcHJvdGVjdGlvbiB1cGRhdGU6YXR0YWNrX3Byb3RlY3Rpb24gcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.npaAm0SODXJ9inIeZsCaK-DJ2fl77-HKr7M0_X2-JfZDeCsrj8K_nlgAWdKpSTs_T3jp7emh-2KYsdYzFQWfVanwSQR6nzPNykEFW2l9uhEd78TjbR2L7L-LQiGukw6j3KyjdYJebYKFR1U-BpoAcRplC95QyRQyG0IJUHr4CJcfBk_hAFSu3khnse4u97r9DrsNd_w8xg47upjB8TF0-sUmQr_tEGWvwusy00CSOrsAOO9FeFzxXJ-vzx0ulDklaKFPyf-bYx7U5jxJ9YUSSQE6Ieewp2UzfjkOiugoat-c9Y81eljrGx2KJi-kZWivpZDqEI2l23Ul_Pd_TH4Gnw",
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleGetTask = async () => {
    // address: "755 Scott Circle, Hickam AFB, Hawaii  96853-5399"
    // health authority name: "15th Medical Group"
    // health authority website: "https://pearlharborhickam.tricare.mil/"
    // id: "ID2"
    // spreadsheet_ID: "1SmrEhn9A_jBbNTCWZTrz0Q1MqqxBa1bU0XwlhlIcJuM"
    // subcategory: "Hospital"
    time = new Date().getTime();
    console.log(time, "time: ");

    // console.log(typeof refTime, refTime);
    setStartTime(new Date().getTime());
    console.log(startTime, "startTime");

    componentDidMount(time);
    try {
      setLoading(true);
      setShowGetTask(false);

      const taskRes = await axios.post(
        "https://us-central1-arge-hes.cloudfunctions.net/get-task-values",
        {
          country: "US",
          email: user.email,
        }
      );
      console.log("website :" + taskRes.data.body["health_authority_name"]);
      console.log("website :" + taskRes.data.body["health_authority_website"]);
      setTask({
        address: taskRes.data.body.address,
        website: taskRes.data.body["health_authority_website"],
        subcategory: taskRes.data.body.subcategory,
        authorityName: taskRes.data.body["health_authority_name"],
        spreadsheetId: taskRes.data.body.spreadsheet_ID,
        id: taskRes.data.body.id,
      });

      setAddress(taskRes.data.body.address);
      setWebsite(taskRes.data.body["health_authority_website"]);
      setAuthorityName(taskRes.data.body["health_authority_name"]);

      setOriginalValues({
        address: taskRes.data.body.address,
        website: taskRes.data.body["health_authority_website"],
        authorityName: taskRes.data.body["health_authority_name"],
      });
      setFirstEnter(false);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = async () => {
    try {
      setLoading(true);

      const skipRes = await axios.post(
        "https://us-central1-arge-hes.cloudfunctions.net/skip-task",
        {
          task_id: task.id,
          spreadsheet_id: task.spreadsheetId,
          role: "jr_reviewer",
        }
      );

      clearTask();
    } catch (err) {
      message.error("Error skipping the task");
    } finally {
      setLoading(false);
      handleGetTask();
    }
  };

  const handleSubmit = async () => {
    const validationResult = validate();

    if (validationResult.error) {
      message.error(validationResult.message);
      return;
    }

    try {
      setLoading(true);
      if (channel == "yes") {
        var health_care = "yes";
        var not_health_care = null;
      } else {
        var health_care = null;
        var not_health_care = "Yes";
      }
      const setTaskRes = await axios.post(
        "https://us-central1-arge-hes.cloudfunctions.net/set-task-values",
        {
          spreadsheet_id: task.spreadsheetId,
          task_id: task.id,
          geo_information: geoInformation,
          changed_info: informationChanged,
          health_care: health_care,
          not_health_care: not_health_care,
          youtube_channelID: youtube,
          medcase_team_member: teamMembder,
          channel_selection: channelMethod,
          comments: comments,
        }
      );

      // Check response
      if (setTaskRes.data.statusCode === 200) {
        clearTask();
        setLoading(false);
        setShowModal(true);
      }
    } catch (err) {
      message.error("Please Try Again");
    }
  };

  const clearTask = () => {
    setTask(null);
    setOriginalValues(null);
    setFirstEnter(true);
    setWebsiteAux("");
    setAuthorityNameAux("");
    setAddressAux("");
  };

  if (loading) {
    return (
      <Row>
        <Col align="middle" span={24}>
          <Spinner />
        </Col>
      </Row>
    );
  }

  return (
    <Card
      title={`Welcome ${user.name}`}
      extra={
        <div>
          {showGetTask && (
            <Button onClick={handleGetTask} type="primary">
              <PlayCircleTwoTone /> Start Task
            </Button>
          )}
          <span>{"  "}</span>
          <Button onClick={() => history.push("/history")} type="primary">
            <PlayCircleTwoTone />
            History
          </Button>
        </div>
      }
    >
      <div>
        <Form layout="vertical">
          <label className="label-one">
            <b> Subcategory: {task !== null ? task.subcategory : ""}</b>
          </label>

          <Form.Item label="Name">
            <Input
              value={authorityName !== null && authorityName}
              onChange={(e) => setAuthorityName(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Website">
            <Input
              value={website !== null && website}
              onChange={(e) => setWebsite(e.target.value)}
            />
          </Form.Item>

          <Form.Item label="Address">
            <Input
              value={address !== null && address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            label="Geo information (select verified if Geo is listed in column N after verifying info)"
            required
            tooltip="This is a required field"
          >
            <Select onChange={(e) => setGeoInformation(e)}>
              <Option value="-1">-- SELECT --</Option>
              <Option value="Verifed">Verifed</Option>
              <Option value="Unable to Verify">Unable to Verify</Option>
            </Select>
          </Form.Item>

          <Form.Item label="Has the organizational informtion changed?">
            <Input disabled={true} value={informationChanged} />
          </Form.Item>

          <Form.Item label="If Y(info changed) what did you change?">
            <Input disabled={true} value={whatChanged} />
          </Form.Item>

          <div style={{ display: "block", width: 700, padding: 30 }}>
            <h4> is Primary Health Care Related?</h4>
            <Radio.Group
              onChange={(e) => {
                setChannel(e.target.value);
              }}
            >
              <Radio value={"Yes"}>
                Channel is Primary Health Care Related
              </Radio>
              <Radio value={"No"}>
                Channel is NOT Primary Health Care Related
              </Radio>
            </Radio.Group>{" "}
          </div>

          <Form.Item
            label="Youtube channel ID"
            required
            tooltip="This is a required field"
          >
            <Input onChange={(e) => setYoutube(e.target.value)} />
          </Form.Item>

          <Form.Item label="Medcase Team Meamber">
            <Input disabled={true} value={teamMembder} />
          </Form.Item>

          <Form.Item
            label="Channel Selection Method (pick the lowest number that applies)"
            required
            tooltip="This is a required field"
          >
            <Select onChange={(e) => setChannelMethod(e)}>
              <Option value="-1">-- SELECT --</Option>
              <Option value="1 Channel link on website">
                1 Channel link on website
              </Option>
              <Option value="2 Channel about section">
                2 Channel about section
              </Option>
              <Option value="3 Channel logo and name">
                3 Channel logo and name
              </Option>
              <Option value="4 Channel video content">
                4 Channel video content
              </Option>
              <Option value="5 Other (please comment)">
                5 Other (please comment)
              </Option>
              <Option value="6 Unsure (please comment)">
                6 Unsure (please comment)
              </Option>
            </Select>
          </Form.Item>

          <Form.Item label="Comments">
            <Input onChange={(e) => setComments(e.target.value)} />
          </Form.Item>

          {task !== null && (
            <Form.Item>
              <Row>
                <Col lg={{ span: 2 }}>
                  <Button type="primary" onClick={handleSubmit}>
                    Submit
                  </Button>
                </Col>
                <Col lg={{ span: 2 }}>
                  <Button type="primary" danger onClick={handleSkip}>
                    Skip Task
                  </Button>
                </Col>
              </Row>
            </Form.Item>
          )}
        </Form>

        <Modal
          title="Task Completed"
          visible={showModal}
          footer={null}
          closable={false}
        >
          <Row>
            <Col>
              <div
                style={{
                  borderColor: "#c3e6cb",
                  backgroundColor: "#d4edda",
                  color: "#155724",
                }}
              >
                <span style={{ fontSize: "30px" }}>
                  <SmileTwoTone />
                </span>
                {"       "}Task has been completed. Please select an option
                below:
              </div>
            </Col>
          </Row>

          <Row style={{ marginTop: 50 }}>
            <Col span={5}>
              <Button
                type="primary"
                style={{ background: "orange", border: "none" }}
                onClick={() => {
                  componentWillUnmount(startTime);
                  setShowModal(false);
                  window.location.href = "http://localhost:3000/";
                }}
              >
                Stop Task
              </Button>
            </Col>
            <Col span={5}>
              <Button
                type="primary"
                onClick={() => {
                  setShowModal(false);
                  handleGetTask();
                }}
              >
                Next Task
              </Button>
            </Col>
          </Row>
        </Modal>
      </div>
    </Card>
  );
}

export default JuniorReviewer;
