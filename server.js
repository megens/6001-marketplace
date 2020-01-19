let express = require("express");
let app = express();
let mongodb = require("mongodb");
let MongoClient = mongodb.MongoClient;
let ObjectID = mongodb.ObjectID;
let multer = require("multer");
let upload = multer({ dest: __dirname + "/uploads" });
let reloadMagic = require("./reload-magic.js");
let sha1 = require("sha1");

reloadMagic(app);

app.use("/", express.static("build")); // Needed for the HTML and JS files
app.use("/", express.static("public")); // Needed for local assets
app.use("/uploads", express.static("uploads"));

let dbo = undefined;
let url =
  "mongodb+srv://bob:bobsue@cluster0-davol.mongodb.net/test?retryWrites=true&w=majority";
MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
  dbo = db.db("alibay"); //
});

// Your endpoints go after this line

app.post("/login", upload.none(), (req, res) => {
  console.log("login", req.body);
  let name = req.body.username;
  let pwd = sha1(req.body.password); // immediately hash password
  dbo.collection("users").findOne({ username: name }, (err, user) => {
    if (err) {
      console.log("/login error");
      return res.send(JSON.stringify({ success: false }));
    }
    if (user === null) {
      return res.send(JSON.stringify({ success: false }));
    }
    console.log(user.password);
    if (user.password === pwd) {
      console.log("login success");
      res.send(JSON.stringify({ success: true }));
      return;
    }
  });
});

app.post("/signup", upload.none(), async (req, res) => {
  let name = req.body.username;
  let pwd = sha1(req.body.password); // immediately hash password
  console.log("signup", name, pwd);
  const user = await dbo.collection("users").findOne({ username: name });
  if (user) {
    console.log(user);
    console.log("error: user exists");
    return res.send(
      JSON.stringify({ success: false, message: "user already exists" })
    );
  }
  dbo.collection("users").insertOne({ username: name, password: pwd });
  console.log("signup success");
  return res.send(JSON.stringify({ success: true }));
});

// Your endpoints go before this line

app.all("/*", (req, res, next) => {
  // needed for react router
  res.sendFile(__dirname + "/build/index.html");
});

app.listen(4000, "0.0.0.0", () => {
  console.log("Server running on port 4000");
});
