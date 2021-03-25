import logo from "./logo.svg";
import "./App.css";
import Ticket from "./components/Ticket";
import Search from "./components/Search";
import { useState, useEffect } from "react";
import { set } from "mongoose";
import DisplayTicket from "./components/DisplayTicket";
import e from "cors";
const axios = require("axios");

function App() {
  //await axios.get(`/api/tickets`)
  const [ticketToDisplay, setticketToDisplay] = useState("");
  const [counter, setCounter] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(6);
  useEffect(() => {
    console.log("didupdate");
    console.log(tickets);
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
  const nextPage = () => {
    if (startIndex < tickets.length - 6) {
      setStartIndex(startIndex + 6);
      setLastIndex(lastIndex + 6);
    }
  };
  const prevPage = () => {
    if (startIndex >= 6) {
      setStartIndex(startIndex - 6);
      setLastIndex(lastIndex - 6);
    }
  };
  const exitDisplay = () => {
    setticketToDisplay("");
  };
  const displayTicket = (e, ticket) => {
    console.log(e.target.tagName);
    if (ticket !== "" && e.target.tagName !== "IMG") {
      const element = (
        <div id="displayed-ticket">
          <DisplayTicket ticket={ticket} exitDisplay={exitDisplay} />
        </div>
      );
      setticketToDisplay(element);
    }
  };
  // const ticketsElements = tickets.map((ticket, i) => {
  //   if (ticket.hide) {
  //     return;
  //   } else {
  //     return <Ticket key={i} ticket={ticket} onClick={onClick} />;
  //   }
  // });
  const ticketsElements = tickets
    .filter((ticket) => {
      return !ticket.hide;
    })
    .map((ticket, i) => {
      return (
        <Ticket
          key={i}
          ticket={ticket}
          onClick={onClick}
          displayTicket={displayTicket}
        />
      );
    });

  return (
    <div className="App">
      {ticketToDisplay}
      <div className="header">
        <h1>ticket Manager</h1>
        <Search onChange={onChange} />
        <p>
          {ticketsElements.length} are showen{" "}
          <span id="hideTicketsCounter">{counter}</span> are hidden
        </p>
        <button id="restoreHideTickets" onClick={restore}>
          restore
        </button>
      </div>

      <div id="nav-buttons">
        <button onClick={nextPage} id="next">
          next
        </button>
        <button onClick={prevPage} id="prev">
          prev
        </button>
      </div>
      <div className="tickets-container">
        {ticketsElements.slice(startIndex, lastIndex)}
      </div>
    </div>
  );
}

export default App;
