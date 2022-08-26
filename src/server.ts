import express from "express";
import cors from "cors";
import morgan from "morgan";

import config from "./config.json";

import { homeFAQs, homeTutors, homeSubjects } from "./home";
import { storeGetItems, storeGetTags } from "./store";
import {
  adminLogin,
  adminLogout,
  adminLogoutAll,
} from "./siteAdmin/siteAdminAuth";
import {
  adminAddTutor,
  adminAddSubject,
  adminAddFAQ,
} from "./siteAdmin/siteAdminHome";

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

// site-admin auth
app.post("/siteadmin/login", (req, res) => {
  const { email, password } = req.body;
  res.json(adminLogin(email, password));
});

app.post("/siteadmin/logout", (req, res) => {
  const token = req.headers.token as string;
  res.json(adminLogout(token));
});

app.post("/siteadmin/logout/all", (req, res) => {
  res.json(adminLogoutAll());
});

// site-admin home
app.post("/siteadmin/home/addsubject", (req, res) => {
  const { name, level, group } = req.body;
  res.json(adminAddSubject(name, level, group));
});

app.post("/siteadmin/home/addtutor", (req, res) => {
  const { name, mark, bio } = req.body;
  res.json(adminAddTutor(name, mark, bio));
});

app.post("/siteadmin/home/addfaq", (req, res) => {
  const { question, answer } = req.body;
  res.json(adminAddFAQ(question, answer));
});

// start server
app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server listening on port ${PORT}`);
});
