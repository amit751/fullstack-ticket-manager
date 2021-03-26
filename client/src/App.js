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
        <p id="shown">
          {ticketsElements.length} are shown{" "}
          <span id="hideTicketsCounter">{counter}</span> are hidden
        </p>
      </div>

      <div id="nav-buttons">
        <svg
          onClick={prevPage}
          id="prev"
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className="bi bi-arrow-left-circle-fill"
          viewBox="0 0 16 16"
        >
          <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z" />
        </svg>
        <span id="restoreHideTickets" onClick={restore}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="30"
            fill="currentColor"
            className="bi bi-bootstrap-reboot res-icon"
            viewBox="0 0 16 16"
            onClick={restore}
          >
            <path d="M1.161 8a6.84 6.84 0 1 0 6.842-6.84.58.58 0 0 1 0-1.16 8 8 0 1 1-6.556 3.412l-.663-.577a.58.58 0 0 1 .227-.997l2.52-.69a.58.58 0 0 1 .728.633l-.332 2.592a.58.58 0 0 1-.956.364l-.643-.56A6.812 6.812 0 0 0 1.16 8z" />
            <path d="M6.641 11.671V8.843h1.57l1.498 2.828h1.314L9.377 8.665c.897-.3 1.427-1.106 1.427-2.1 0-1.37-.943-2.246-2.456-2.246H5.5v7.352h1.141zm0-3.75V5.277h1.57c.881 0 1.416.499 1.416 1.32 0 .84-.504 1.324-1.386 1.324h-1.6z" />
          </svg>
          <span id="res-text">estore</span>
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="40"
          height="40"
          fill="currentColor"
          className="bi bi-arrow-right-circle-fill"
          viewBox="0 0 16 16"
          onClick={nextPage}
          id="next"
        >
          <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
        </svg>
      </div>
      <div className="tickets-container">
        {ticketsElements.slice(startIndex, lastIndex)}
      </div>
    </div>
  );
}

export default App;
