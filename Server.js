const express = require("express");
const connectDB = require("./config/db");
const path = require("path");

const app = express();

connectDB();
app.use(express.json({ extended: false }));

// // DEFINE ROUTES
app.use("/contactInput", require("./routes/Contact"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Successfully started on port ${PORT}`));
