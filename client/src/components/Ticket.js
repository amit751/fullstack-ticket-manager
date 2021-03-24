export default function Ticket({ ticket, onClick }) {
  if (ticket.labels) {
    return (
      <div className="ticket">
        <button
          className="hideTicketButton"
          onClick={() => {
            onClick(ticket.title);
          }}
        >
          hide
        </button>
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
        <div className="labels-container">
          {ticket.labels.map((lable) => {
            return <button className={`label ${lable}`}> {lable} </button>;
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="ticket">
        <button
          className="hideTicketButton"
          onClick={() => {
            onClick(ticket.title);
          }}
        >
          hide
        </button>
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
// {
//     "title": "Need a Little Help with Your Site? Hire a Corvid Web Developer",
//     "content": "Here at Wix we strive to support you with this community forum, API references, articles, videos and code examples. But sometimes you might need a little extra help to get your site exactly the way you want it. \nHire a developer from the Wix Arena, an online marketplace with top Corvid web developers from around the world. Submit your project details here, and we’ll find the right professional for you.",
//     "userEmail": "jug@nesetal.af",
//     "done": false,
//     "creationTime": 1542111235544,
//     "labels": ["Corvid", "Api"]
//   }
