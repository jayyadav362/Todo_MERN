const express = require("express");
const connectDb = require("./config");
connectDb()
var cors = require("cors");
const app = express();
app.use(cors({origin:"*"}));

const port = 8000;
app.use(express.json());
app.use("/api/", require("./routes/todoRoute"));
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});