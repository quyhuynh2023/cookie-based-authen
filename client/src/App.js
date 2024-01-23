import React, { useState } from "react";
import axios from "axios";

function App() {
  const [formData, setFormData] = useState({});
  const [jobs, setJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(null);

  const handleGetJobs = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/jobs", {
        withCredentials: true,
      });
      setJobs(res.data);
      setErr(null);
    } catch (error) {
      setErr(error?.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/login", formData, {
        withCredentials: true,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(jobs);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <fieldset>
          <legend>login form:</legend>
          <p>
            <label htmlFor="username">username: </label>
            <input
              onChange={handleChange}
              id="username"
              name="username"
              type="text"
              placeholder="enter username"
            />
          </p>
          <p>
            <label htmlFor="password">password: </label>
            <input
              onChange={handleChange}
              id="password"
              name="password"
              type="text"
              placeholder="enter password"
            />
          </p>
          <button type="submit">submit</button>
        </fieldset>
      </form>
      <hr />
      <button onClick={handleGetJobs}>get jobs</button>
      {isLoading && <div>loading...</div>}
      {err ? (
        <h2>{err}</h2>
      ) : isLoading ? (
        <div>loading...</div>
      ) : (
        <div>{JSON.stringify(jobs)}</div>
      )}
    </div>
  );
}

export default App;
