var express = require("express");
var app = express();

var mysql = require("mysql");
var bodyParser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 4090;

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

var con = mysql.createConnection({
  host: "koempro-server.cwsly2cix1oo.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "adminintek",
  database: "koempro_server",
});

app.get("/", (req, res) => {
  res.send("Tester");
});

// get ======================================
app.get("/posts", (req, res) => {
  con.query("select * from Posts", (error, rows, fields) => {
    if (error) console.log(error);
    else {
      res.send(rows);
    }
  });
});

// find by id ==============================
app.get("/posts/:id", (req, res) => {
  con.query(
    "SELECT * FROM Posts where id=? ",
    req.params.id,
    (error, rows, fields) => {
      if (error) console.log(error);
      else {
        console.log(rows);
        res.send(JSON.stringify(rows));
      }
    }
  );
});

// Posts
app.post("/posts", (req, res) => {
  con.query("insert into Posts set ? ", req.body, (error, rows, fields) => {
    if (error) console.log(error);
    else {
      console.log(rows);
      res.send(JSON.stringify(rows));
    }
  });
});

// // Update =================================
// app.put("/posts/:id", (req, res) => {
//   con.query(
//     "UPDATE Posts SET title=?, desc=?, link=?, task=?, date=?, image=?, avatar=?",
//     [
//       req.body.title,
//       req.body.desc,
//       req.body.link,
//       req.body.task,
//       req.body.date,
//       req.body.image,
//       req.body.avatar,
//     ],
//     (error, rows, fields) => {
//       if (error) console.log(error);
//       else {
//         console.log(rows);
//         res.end(JSON.stringify(rows));
//       }
//     }
//   );
// });

app.listen(port, () => console.log(`Listening on port ${port}`));
