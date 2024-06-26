import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState(null);

  const token = localStorage.getItem("Taxposter");
  const number = localStorage.getItem("Taxposter/RegisterMobile");
  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:804/user/details?RegisterMobile=${number}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const userData = await fetchUserData();
      setData(userData);
    };

    getData();
  }, []);

  return (
    <>
      <h1 className="">home page</h1>
      {data ? (
        <div>
          <h2>User Details:</h2>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default Home;
