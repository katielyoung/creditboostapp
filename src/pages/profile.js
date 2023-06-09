import { useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";

const Profile = () => {
  // const dummyData = {
  //   first_name: "user",
  //   last_name: "abc",
  //   date_of_birth: "11-30-2000",
  //   phone: "6504493399",
  //   ssn: "123-222-2222",
  //   ssn_last_four_digits: "2222",
  //   bank_account: 332222221,
  //   bank_routing: 1229211,
  //   bank_name: "Bank1",
  //   curr_credit_score: 600,
  //   total_num_open_loan: 6000,
  // };

  const { loginStatus } = useContext(AuthContext);
  const [data, setData] = useState("Loading...");
  const [gotData, setGotData] = useState(false);

  const getData = () => {
    if (loginStatus && !gotData) {
      const userId = localStorage.getItem("user");
      console.log(`UserId = ${userId}`)
      if (userId != null) {
        const url = `http://ec2-44-203-197-80.compute-1.amazonaws.com:8080/api/profiles/id?idUser=${userId}`;
        fetch(url)
          .then((response) => response.json())
          .then((json) => {
            setData(json);
            setGotData(true);
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  };

  useEffect(() => {
    getData();
  });

  window.addEventListener("beforeunload", (event) => {
    getData();
    console.log("API call before page reload");
  });

  window.addEventListener("unload", (event) => {
    getData();
    console.log("API call after page reload");
  });

  return (
    <div className="userprofile">
      <h1>User Profile</h1>
      {loginStatus === "true" ? (
        <div>
          {gotData ? (
            <div>
              <p>First Name: {data.first_name}</p>
              <p>Last Name: {data.last_name}</p>
              <p>Date of Birth: {data.date_of_birth}</p>
              <p>Phone Number: {data.phone}</p>
              <p>Last 4 digits of SSN: {data.ssn_last_four_digits}</p>
              <p>Bank Account Number: {data.bank_account}</p>
              <p>Bank Routing Number: {data.bank_routing}</p>
              <p>Bank Name: {data.bank_name}</p>
              <p>Current Credit Score: {data.curr_credit_score}</p>
              <p>Total Number of Open Loans: {data.total_num_open_loan}</p>
            </div>
          ) : (
            <h4>Loading...</h4>
          )}
        </div>
      ) : (
        <h4>Please login to view profile!</h4>
      )}
    </div>
  );
};

export default Profile;
