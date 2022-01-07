import { useState, Fragment, useEffect } from "react";
import { Table, Spin, message } from "antd";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

function History() {
  const { user } = useAuth0();
  const [tasks, setTasks] = useState([]);
  // const [tasks, setTasks] = useState([
  //   {
  //     spreadsheet_ID: "1SmrEhn9A_jBbNTCWZTrz0Q1MqqxBa1bU0XwlhlIcJuM",
  //     id: "ID17",
  //     subcategory: "Pharmacies",
  //     "health authority name":
  //       "Auburn University Harrison School of Pharmacy (PharmD)",
  //     "health authority website": "http://pharmacy.auburn.edu/",
  //     address: "2316 Walker Building, Auburn University, AL 36849-5501",
  //   },
  //   {
  //     spreadsheet_ID: "1SmrEhn9A_jBbNTCWZTrz0Q1MqqxBa1bU0XwlhlIcJuM",
  //     id: "ID18",
  //     subcategory: "Hospital",
  //     "health authority name":
  //       "87th Medical Group - McGuire Ambulatory Care Facility",
  //     "health authority website": "https://mcguiredixlakehurst.tricare.mil/",
  //     address: "3458 Neely Road, JB MDL, New Jersey                     08641",
  //   },
  // ])
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const historyRes = await axios.post(
          "https://us-central1-arge-hes.cloudfunctions.net/get-history-task",
          {
            email: user.email,
            country: "US",
            role: "jr_reviewer",
          },
          {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          }
        );
        console.log(historyRes);
        setTasks(historyRes.data.body.tasks);
        setLoading(false);
      } catch (err) {
        message.error("Not possible to obtain data");
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  const columns = [
    {
      title: "Subcategory",
      dataIndex: "subcategory",
      key: "subcategory",
    },
    {
      title: "Health Authority Name",
      dataIndex: "health_authority_name",
      key: "health_authority_name",
    },
    {
      title: "Health Authority Website",
      dataIndex: "health_authority_website",
      key: "health_authority_website",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Link className="btn btn-pink" role="button" to={`/edit/${record.id}`}>
          Edit
        </Link>
      ),
    },
  ];

  //if (loading || tasks.length === 0) return <Spin size="large" />

  return (
    <Fragment>
      <Table columns={columns} dataSource={tasks} />
    </Fragment>
  );
}

export default History;
