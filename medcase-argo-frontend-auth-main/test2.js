const axios = require("axios").default;

async function functionOne() {
  var initialData = {
    language: ["en", "fr", "de", "id", "nl", "ar", "pt", "ia", "gh", "da"],
    name: ["NEWS", "SNIPPETS", "EVERGREEN", "REVETTING"],
  };
  var config = {
    method: "POST",
    // headers: { "Access-Control-Allow-Origin": "*" },
    url:
      // "https://rg0tfq4v93.execute-api.us-east-1.amazonaws.com/default/TaskTestForAlpha",
      "http://127.0.0.1:3000/HESTask",
    data: {
      country: "US",
    },
  };
  var response = await axios(config);
  console.log(response.data, "response");
}

functionOne();
