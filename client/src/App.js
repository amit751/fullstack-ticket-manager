import logo from "./logo.svg";
import "./App.css";
import Ticket from "./components/Ticket";
import Search from "./components/Search";
import { useState, useEffect } from "react";
import { set } from "mongoose";
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
  const [counter, setCounter] = useState(0);
  const [tickets, setTickets] = useState([]);
  useEffect(() => {
    console.log("didupdate");
    let newCounter = 0;
    tickets.forEach((ticket) => {
      if (ticket.hide) ++newCounter;
    });

    console.log(newCounter);
    setCounter(newCounter);
  });

  useEffect(() => {
    axios
      .get(`/api/tickets`)
      .then(({ data }) => {
        console.log(data);
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
  const onClick = (title) => {
    const newTickets = tickets.slice();
    const ticketToHide = newTickets.find((ticket) => {
      return ticket.title === title;
    });
    console.log(ticketToHide);
    ticketToHide.hide = true;
    console.log(newTickets);
    setTickets(newTickets);
  };
  const restore = () => {
    const newTickets = tickets.slice();
    newTickets.forEach((ticket) => {
      ticket.hide = false;
    });
    setTickets(newTickets);
  };

  return (
    <div className="App">
      <Search onChange={onChange} />
      <p id="hideTicketsCounter">{counter}</p>
      <button id="restoreHideTickets" onClick={restore}>
        restoreHideTickets
      </button>

      <div>
        {tickets.map((ticket) => {
          if (ticket.hide) {
            return;
          } else {
            return <Ticket ticket={ticket} onClick={onClick} />;
          }
        })}
      </div>
    </div>
  );
}

export default App;
