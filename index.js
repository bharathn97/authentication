const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path"); // Import the path module
const PORT = 5000;

const connectToMongoose = require("./db/index");

app.use(cors());
app.use(express.json());

connectToMongoose();

app.use("/student", require("./routes/student"));
app.use("/admin", require("./routes/admin"));

// Serve static files from the 'views' directory
app.use(express.static(path.join(__dirname, "views")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
