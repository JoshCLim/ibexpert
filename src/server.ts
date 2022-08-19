import express from "express";

import config from "./config.json";
const app = express();

const PORT: number = parseInt(process.env.PORT || config.port);
const HOST: string = process.env.IP || "localhost";

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ response: "IB Expert Backend" });
});

app.listen(parseInt(process.env.PORT || config.port), process.env.IP, () => {
  console.log(
    `⚡️ Server listening on port ${process.env.PORT || config.port}`
  );
});
