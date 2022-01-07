import request from "umi-request";

export async function claimHighest() {
  let language = localStorage.getItem("currentLanguage");
  let name = localStorage.getItem("workflowName");
  name = name.replace("Vaccine Tracker", "Vaccine");
  return request(
    "https://n5krtt2kbl.execute-api.us-east-1.amazonaws.com/Stage/getHighestPriorityTaskForUser",
    {
      method: "POST",
      headers: {
        "x-api-key": "8PUQOm6mDS2jEzPQx9kmBGlQoqDxPzc89uI9S3c4",
      },
      body: JSON.stringify({
        language: language.split(","),
        name: name.split(","),
      }),
    }
  );
}

export async function completeTask(payload: any) {
  console.log(payload);

  return request(
    "https://n5krtt2kbl.execute-api.us-east-1.amazonaws.com/Stage/claimTaskForReviewer",
    {
      method: "PUT",
      headers: {
        "x-api-key": "8PUQOm6mDS2jEzPQx9kmBGlQoqDxPzc89uI9S3c4",
      },
      body: JSON.stringify(payload),
    }
  );
}

export async function reviewComplete(payload: any) {
  console.log(payload);

  return request(
    "https://n5krtt2kbl.execute-api.us-east-1.amazonaws.com/Stage/reviewComplete",
    {
      method: "PUT",
      headers: {
        "x-api-key": "8PUQOm6mDS2jEzPQx9kmBGlQoqDxPzc89uI9S3c4",
      },
      body: JSON.stringify(payload),
    }
  );
}

export async function parkTaskForReviewer(payload: any) {
  console.log(payload);

  return request(
    "https://n5krtt2kbl.execute-api.us-east-1.amazonaws.com/Stage/parkTaskForReviewer",
    {
      method: "PUT",
      headers: {
        "x-api-key": "8PUQOm6mDS2jEzPQx9kmBGlQoqDxPzc89uI9S3c4",
      },
      body: JSON.stringify(payload),
    }
  );
}

export async function unClaimTask(payload: any) {
  console.log(payload);

  return request(
    "https://n5krtt2kbl.execute-api.us-east-1.amazonaws.com/Stage/unClaimTaskForReviewer",
    {
      method: "PUT",
      headers: {
        "x-api-key": "8PUQOm6mDS2jEzPQx9kmBGlQoqDxPzc89uI9S3c4",
      },
      body: JSON.stringify(payload),
    }
  );
}
