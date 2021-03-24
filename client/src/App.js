import logo from "./logo.svg";
import "./App.css";
import Ticket from "./components/Ticket";
import Search from "./components/Search";
import { useState, useEffect } from "react";
import { set } from "mongoose";
const axios = require("axios");

function App() {
  //await axios.get(`/api/tickets`)
  const [counter, setCounter] = useState(0);
  const [tickets, setTickets] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [lastIndex, setLastIndex] = useState(6);
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
      return <Ticket key={i} ticket={ticket} onClick={onClick} />;
    });

  return (
    <div className="App">
      <div className="header">
        <Search onChange={onChange} />
        <p>
          {ticketsElements.length} are showen
          <span id="hideTicketsCounter">{counter}</span>are hidden
        </p>
        <button id="restoreHideTickets" onClick={restore}>
          restoreHideTickets
        </button>
      </div>
      <div id="nav-buttons">
        <button onClick={nextPage} id="next">
          next
        </button>
        <button hidden onClick={prevPage} id="prev">
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
