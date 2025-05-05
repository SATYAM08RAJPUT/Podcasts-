import { useEffect, useState } from "react";

const Podcasts = () => {
  const [podcasts, setPodcast] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await fetch("http://localhost:6062/api/podcasts");
      console.log("Response:-", response);
      const result = await response.json();
      console.log(result);
      setPodcast(result);
    };
    fetchApi();
  }, []);
  return (
    <>
      <div className="podcast-container">
        <h2>Welcome to Podcast</h2>
        {podcasts.map((itm) => (
          <div key={itm.id}>{itm.title}</div>
        ))}
      </div>
    </>
  );
};
export default Podcasts;
