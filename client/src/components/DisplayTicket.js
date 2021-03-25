export default function DisplayTicket({ ticket, displayTicket, exitDisplay }) {
  if (ticket.labels) {
    return (
      <div className="display-ticket-container">
        <button className="exitDisplay" onClick={exitDisplay}>
          close
        </button>
        <h1>{ticket.title}</h1>
        <p>{ticket.content}</p>
        <div className="details">
          <p>
            by {ticket.userEmail} |{" "}
            {ticket.creationTime
              .toString()
              .replace(".", "-")
              .replace(".", "-")
              .replace(",", " ")
              .replace("Z", " ")
              .replace("T", " ")
              .slice(0, -5)}
          </p>
        </div>
        <div className="done">
          {/* <p>done: {ticket.done.toString()}</p> */}
        </div>
        <div className="labels-container">
          {ticket.labels.map((lable, i) => {
            return (
              <button key={i} className={`label ${lable}`}>
                {" "}
                {lable}{" "}
              </button>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="display-ticket-container">
        <h1>{ticket.title}</h1>
        <p>{ticket.content}</p>
        <div className="details">
          <p>
            by {ticket.userEmail} | {ticket.creationTime}
          </p>
        </div>
        <div className="done">
          {/* <p>done: {ticket.done.toString()}</p> */}
        </div>
      </div>
    );
  }
}
