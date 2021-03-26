export default function DisplayTicket({ ticket, displayTicket, exitDisplay }) {
  if (ticket.labels) {
    return (
      <div className="display-ticket-container">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="currentColor"
          className="bi bi-x-octagon exit"
          viewBox="0 0 16 16"
          className="exitDisplay"
          onClick={exitDisplay}
        >
          <path d="M4.54.146A.5.5 0 0 1 4.893 0h6.214a.5.5 0 0 1 .353.146l4.394 4.394a.5.5 0 0 1 .146.353v6.214a.5.5 0 0 1-.146.353l-4.394 4.394a.5.5 0 0 1-.353.146H4.893a.5.5 0 0 1-.353-.146L.146 11.46A.5.5 0 0 1 0 11.107V4.893a.5.5 0 0 1 .146-.353L4.54.146zM5.1 1L1 5.1v5.8L5.1 15h5.8l4.1-4.1V5.1L10.9 1H5.1z" />
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
        </svg>

        <h1>{ticket.title}</h1>
        <p className="ticket-content">{ticket.content}</p>

        {/* <div className="done">
          <p>done: {ticket.done.toString()}</p>
        </div> */}
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
      </div>
    );
  } else {
    return (
      <div className="display-ticket-container">
        <h1>{ticket.title}</h1>
        <p className="ticket-content">{ticket.content}</p>
        <div className="details">
          <p>
            by {ticket.userEmail} | {ticket.creationTime}
          </p>
        </div>
        {/* <div className="done">
          <p>done: {ticket.done.toString()}</p>
        </div> */}
      </div>
    );
  }
}
