import logo from "./logo.svg";
import "./App.css";
import Ticket from "./components/Ticket";
import Search from "./components/Search";
import { useState, useEffect } from "react";
const axios = require("axios");

const test = [
  {
    title: "Need a Little Help with Your Site? Hire a Corvid Web Developer",
    content:
      "Here at Wix we strive to support you with this community forum, API references, articles, videos and code examples. But sometimes you might need a little extra help to get your site exactly the way you want it. \nHire a developer from the Wix Arena, an online marketplace with top Corvid web developers from around the world. Submit your project details here, and we’ll find the right professional for you.",
    userEmail: "jug@nesetal.af",
    done: false,
    creationTime: 1542111235544,
    labels: ["Corvid", "Api"],
  },
];

function App() {
  //await axios.get(`/api/tickets`)

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/tickets`)
      .then(({ data }) => {
        setTickets(data);
      })
      .catch((e) => {
        console.log(e.message);
      });
  }, []);

  const onChange = async (searchText) => {
    const { data } = await axios.get(`/api/tickets?searchText=${searchText}`);
    setTickets(data);
  };

  return (
    <>
      <Search onChange={onChange} />
      <div>
        {tickets.map((ticket) => {
          return <Ticket ticket={ticket} />;
        })}
      </div>
    </>
  );
}

export default App;
