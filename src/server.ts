import express from "express";
import cors from "cors";
import morgan from "morgan";

import config from "./config.json";

import { homeFAQs, homeTutors, homeSubjects } from "./home";
import { storeGetItems, storeGetTags } from "./store";

const app = express();

const PORT: number = parseInt(process.env.PORT || config.port);
const HOST: string = process.env.IP || "localhost";

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// root
app.get("/", (req, res) => {
  res.json({ response: "IB Expert Backend" });
});

// general data
app.get("/home/tutors", (req, res) => {
  res.json(homeTutors());
});

app.get("/home/subjects", (req, res) => {
  res.json(homeSubjects());
});

app.get("/home/faqs", (req, res) => {
  res.json(homeFAQs());
});

// store
app.get("/store/items", (req, res) => {
  res.json(storeGetItems());
});

app.get("/store/tags", (req, res) => {
  res.json(storeGetTags());
});

// start server
app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server listening on port ${PORT}`);
});
