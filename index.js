import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let todayTasks = [];
let workTasks = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("today.ejs", {
    ttasks: todayTasks
  });
});

app.post("/todaySubmit", (req, res) => {
    console.log("new item today: " + req.body["newTodayTaskName"]);
    todayTasks.push({
      "taskName": req.body["newTodayTaskName"],
      "done": false
  });
    console.log("todayTasks submit: ");
    console.log(todayTasks);
    res.render("today.ejs", {
      ttasks: todayTasks
    });
});

app.post("/checkClick", (req, res) => {
  //console.log(req);
  console.log("number: " + req.body["number"]);
  console.log(req.body);
  todayTasks[req.body["number"]].done=!(todayTasks[req.body["number"]].done);
  console.log("todayTasks checkClick: ");
  console.log(todayTasks);
  res.render("today.ejs", {
    ttasks: todayTasks
  });
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
