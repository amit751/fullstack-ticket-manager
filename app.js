const express = require("express");
const Ticket = require("./models/ticket");
const app = express();
app.use(express.json());
app.use(express.static("client/build"));

module.exports = app;

app.get("/api/tickets", (req, res) => {
  const { searchText } = req.query;
  Ticket.find({})
    .then((result) => {
      if (searchText) {
        const filteredTickets = result.filter((ticket) => {
          return (
            ticket.title.toLowerCase().search(searchText.toLowerCase()) !== -1
          );
        });
        return res.json(filteredTickets);
      } else {
        return res.json(result);
      }
    })
    .catch((e) => {
      res.send(e.message);
    });
});

app.patch("/api/tickets/:id/done", (req, res) => {
  const id = req.params.id;
  Ticket.findByIdAndUpdate(id, { done: true }, { new: true })
    .then((result) => {
      if (result === null) throw new err("no such id");

      return res.json({ updated: true });
    })
    .catch((e) => {
      return res.send(e.message);
    });
});
app.patch("/api/tickets/:id/undone", (req, res) => {
  const id = req.params.id;
  console.log(id);
  Ticket.findByIdAndUpdate(id, { done: false }, { new: true })
    .then((result) => {
      if (result === null) throw new err("no such id");

      return res.json({ updated: true });
    })
    .catch((e) => {
      return res.send(e.message);
    });
});

app.use((req, res, next) => {
  console.log(req.path);
  return res.send(req.path);
});
