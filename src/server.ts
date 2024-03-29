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
  adminRemoveSubject,
  adminRemoveTutor,
  adminRemoveFAQ,
} from "./siteAdmin/siteAdminHome";
import {
  adminAddStoreItem,
  adminAddStoreTag,
  adminRemoveStoreItem,
  adminRemoveStoreTag,
} from "./siteAdmin/siteAdminStore";
import {
  userAuthLogin,
  userAuthLogout,
  userAuthLogoutAll,
  userAuthRegister,
} from "./userPortal/userAuth";
import {
  userBookingsCancel,
  userBookingsCreate,
  userBookingsList,
} from "./userPortal/userBookings";

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
  const token = req.headers.token as string;
  const { name, level, group } = req.body;
  res.json(adminAddSubject(token, name, level, group));
});

app.post("/siteadmin/home/addtutor", (req, res) => {
  const token = req.headers.token as string;
  const { name, mark, bio } = req.body;
  res.json(adminAddTutor(token, name, mark, bio));
});

app.post("/siteadmin/home/addfaq", (req, res) => {
  const token = req.headers.token as string;
  const { question, answer } = req.body;
  res.json(adminAddFAQ(token, question, answer));
});

app.delete("/siteadmin/home/removesubject", (req, res) => {
  const token = req.headers.token as string;
  const { subjectId } = req.body;
  res.json(adminRemoveSubject(token, subjectId));
});

app.delete("/siteadmin/home/removetutor", (req, res) => {
  const token = req.headers.token as string;
  const { tutorId } = req.body;
  res.json(adminRemoveTutor(token, tutorId));
});

app.delete("/siteadmin/home/removefaq", (req, res) => {
  const token = req.headers.token as string;
  const { qnId } = req.body;
  res.json(adminRemoveFAQ(token, qnId));
});

// site-admin store
app.post("/siteadmin/store/additem", (req, res) => {
  const token = req.headers.token as string;
  const { name, price, imageUrl, description, type } = req.body;
  res.json(adminAddStoreItem(token, name, price, imageUrl, description, type));
});

app.post("/siteadmin/store/addtag", (req, res) => {
  const token = req.headers.token as string;
  const { name } = req.body;
  res.json(adminAddStoreTag(token, name));
});

app.delete("/siteadmin/store/removeitem", (req, res) => {
  const token = req.headers.token as string;
  const { itemId } = req.body;
  res.json(adminRemoveStoreItem(token, itemId));
});

app.delete("/siteadmin/store/removetag", (req, res) => {
  const token = req.headers.token as string;
  const { tagId } = req.body;
  res.json(adminRemoveStoreTag(token, tagId));
});

// user portal
app.post("/user/auth/register", (req, res) => {
  const { email, password, nameFirst, nameLast, graduationYear, dob, school } =
    req.body;
  res.json(
    userAuthRegister(
      email,
      password,
      nameFirst,
      nameLast,
      graduationYear,
      dob,
      school
    )
  );
});

app.post("/user/auth/login", (req, res) => {
  const { email, password } = req.body;
  res.json(userAuthLogin(email, password));
});

app.post("/user/auth/logout", (req, res) => {
  const token = req.headers.token as string;
  res.json(userAuthLogout(token));
});

app.post("/user/auth/logout/all", (req, res) => {
  const token = req.headers.token as string;
  res.json(userAuthLogoutAll(token));
});

// user bookings
app.post("/user/bookings/create", (req, res) => {
  const token = req.headers.token as string;
  const { tutorId, timeStart, timeEnd } = req.body;
  res.json(userBookingsCreate(token, tutorId, timeStart, timeEnd));
});

app.delete("/user/bookings/cancel", (req, res) => {
  const token = req.headers.token as string;
  const { bookingId } = req.body;
  res.json(userBookingsCancel(token, bookingId));
});

app.get("/user/bookings/list", (req, res) => {
  const token = req.headers.token as string;
  res.json(userBookingsList(token));
});

// error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send({
    error: {
      status: err.status || 500,
      message: err.message,
    },
  });
});

// start server
app.listen(PORT, HOST, () => {
  console.log(`⚡️ Server listening on port ${PORT}`);
});
