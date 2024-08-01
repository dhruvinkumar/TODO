const express = require("express");
const mainRouter = require("./router/index");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

// Use the main router
app.use("/api/v1", mainRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
