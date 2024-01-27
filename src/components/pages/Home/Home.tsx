import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import { fetchDemo } from "../../../server";

const Home = () => {
  const [data, setData] = useState<string>("no data"); // Replace 'any' with the actual type of your data
  const { authInstance } = useAuth();

  useEffect(() => {
    fetchDemo()
      .then((response) => {
        // Handle successful response
        if (response) setData(response);
      })
      .catch((error) => {
        // Handle error
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <button onClick={() => authInstance?.logout()}>Logout</button>
      <div> {data}</div>
    </>
  );
};

export default Home;
