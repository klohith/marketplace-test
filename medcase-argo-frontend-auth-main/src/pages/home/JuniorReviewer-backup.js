import { useState, Fragment } from "react"
import { Card, Button, message, Spin, Radio, Form, Input } from "antd"
import { useAuth0 } from "@auth0/auth0-react"
import {
  CheckOutlined,
  FlagOutlined,
  PlayCircleTwoTone,
  LogoutOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons"
import axios from "axios"

function JuniorReviewer() {
  const [loading, setLoading] = useState(false)
  const [task, setTask] = useState(null)
  const [geoInformation, setGeoInformation] = useState("")
  const [informationChanged, setInformationChanged] = useState("")
  const [whatChanged, setWhatChanged] = useState("")
  const [channel, setChannel] = useState("")
  const [youtube, setYoutube] = useState("")
  const [teamMembder, setTeamMember] = useState("")
  const [channelMethod, setChannelMethod] = useState("")
  const [comments, setComments] = useState("")

  const validate = () => {
    const validationRes = { error: false, message: "" }
    if (geoInformation === "" || geoInformation === -1) {
      validationRes.error = true
      validationRes.message = "Please select a value for Geo Information Field"
      return validationRes
    }

    if (informationChanged === "" || informationChanged === -1) {
      validationRes.error = true
      validationRes.message =
        "Please select a value for Has the organizational informtion changed? Field"
      return validationRes
    }

    if (informationChanged !== "No") {
      if (whatChanged === "" || whatChanged === -1) {
        validationRes.error = true
        validationRes.message =
          "Please select a value for what did you change? Field"
        return validationRes
      }
    }

    if (channel === "" || channel === -1) {
      validationRes.error = true
      validationRes.message =
        "Please select a value for is Primary Health Care Related? Field"
      return validationRes
    }

    if (youtube === "" || youtube === -1) {
      validationRes.error = true
      validationRes.message =
        "Please select a value for Youtube channel ID Field"
      return validationRes
    }

    if (teamMembder === "" || teamMembder === -1) {
      validationRes.error = true
      validationRes.message =
        "Please select a value for Medcase Team Meamber Field"
      return validationRes
    }

    if (channelMethod === "" || channelMethod === -1) {
      validationRes.error = true
      validationRes.message =
        "Please select a value for Channel Selection Method Field"
      return validationRes
    }

    if (comments === "" || comments === -1) {
      validationRes.error = true
      validationRes.message = "Please select a value for Comments Field"
      return validationRes
    }

    return validationRes
  }

  const handleGetTask = async () => {
    const validationResult = validate()

    if (validationResult.error) {
      message.error(validationResult.message)
    }
    // address: "755 Scott Circle, Hickam AFB, Hawaii  96853-5399"
    // health authority name: "15th Medical Group"
    // health authority website: "https://pearlharborhickam.tricare.mil/"
    // id: "ID2"
    // spreadsheet_ID: "1SmrEhn9A_jBbNTCWZTrz0Q1MqqxBa1bU0XwlhlIcJuM"
    // subcategory: "Hospital"
    // try {
    //   setLoading(true)
    //   const taskRes = await axios({
    //     method: "POST",
    //     url:
    //       "https://nwld2cgpj8.execute-api.us-east-1.amazonaws.com/Prod/getTask",
    //     data: JSON.stringify({
    //       country: "US",
    //       email: "franco@ahoradoctor.com",
    //     }),
    //   })
    //   setTask({
    //     address: taskRes.data.address,
    //     website: taskRes.data["health authority website"],
    //     subcategory: taskRes.data.subcategory,
    //     authorityName: taskRes.data["health authority name"],
    //   })
    // } catch (err) {
    //   console.log(err)
    // } finally {
    //   setLoading(false)
    // }
  }

  return (
    <Card
      title={`Welcome Franco`}
      extra={
        <div>
          <Button onClick={handleGetTask} type="primary">
            <PlayCircleTwoTone /> Start Task
          </Button>
        </div>
      }
    >
      <div>
        {loading ? (
          <Spin size="large" />
        ) : (
          <Fragment>
            <Form layout="vertical">
              <h1>Junior Reviwer</h1>
              <label className="label-one">
                <b> Subcategory: {task !== null ? task.subcategory : ""}</b>
              </label>

              <label className="label-one">
                <b>Name: {task !== null ? task.authorityName : ""}</b>
              </label>
              <a className="label-one">
                <b> Website: {task !== null ? task.website : ""}</b>
              </a>
              <label className="label-one">
                <b>Address: {task !== null ? task.address : ""}</b>
              </label>
              <label className="dropdown-one">
                Geo information (select verified if Geo is listed in column N
                after verifying info)
              </label>
              <Form.Item
                label="Field A"
                required
                tooltip="This is a required field"
              >
                <Input placeholder="input placeholder" />
              </Form.Item>
              <select
                id="dropdown"
                className="dropdown-one"
                onChange={(e) => setGeoInformation(e.target.value)}
              >
                <option value="-1">-- SELECT --</option>
                <option value="Verifed">Verifed</option>
                <option value="Unable to Verify">Unable to Verify</option>
              </select>
              <label className="label-two">
                Has the organizational informtion changed?
              </label>
              <select
                id="dropdown"
                className="dropdown-one"
                onChange={(e) => setInformationChanged(e.target.value)}
              >
                <option value="-1">-- SELECT --</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>

              <label className="label-two">
                If Y(info changed) what did you change?
              </label>
              <select
                id="dropdown"
                className="dropdown-one"
                onChange={(e) => setWhatChanged(e.target.value)}
              >
                <option value="-1">-- SELECT --</option>
                <option value="website">website</option>
                <option value="address">address</option>
                <option value="health authority name">
                  health authority name
                </option>
                <option value="website 	&#38; address">
                  website &#38; address
                </option>
                <option value="website &#38; name">website &#38; name</option>
                <option value="all 3">all 3</option>
              </select>

              <div style={{ display: "block", width: 700, padding: 30 }}>
                <h4> is Primary Health Care Related?</h4>
                <Radio.Group
                  onChange={(e) => {
                    setChannel(e.target.value)
                  }}
                  value={channel}
                >
                  <Radio value={"Yes"}>
                    Channel is Primary Health Care Related
                  </Radio>
                  <Radio value={"No"}>
                    Channel is NOT Primary Health Care Related
                  </Radio>
                </Radio.Group>{" "}
              </div>
              <label className="label-two">Youtube channel ID:</label>
              <input
                className="textbox"
                type="text"
                onChange={(e) => setYoutube(e.target.value)}
              />
              <label className="label-two">Medcase Team Meamber:</label>
              <select
                id="dropdown-two"
                onChange={(e) => setTeamMember(e.target.value)}
              >
                <option value="-1">-- SELECT --</option>
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
                Channel Selection Method (pick the lowest number that applies):
              </label>

              <select
                id="dropdown"
                className="dropdown-one"
                onChange={(e) => setChannelMethod(e.target.value)}
              >
                <option value="-1">-- SELECT --</option>
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
              <label className="label-two">Comments:</label>

              <input
                className="textbox"
                type="text"
                onChange={(e) => setComments(e.target.value)}
              />
              <Form.Item>
                <Button type="primary">Submit</Button>
              </Form.Item>
            </Form>
          </Fragment>
        )}
      </div>
    </Card>
  )
}

export default JuniorReviewer
