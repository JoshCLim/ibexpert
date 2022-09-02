import { v4 as uuid } from "uuid";
import crypto from "crypto";

import { getData, setData } from "../data";

interface token {
  token: string;
}

function userAuthRegister(
  email: string,
  password: string,
  nameFirst: string,
  nameLast: string,
  graduationYear: number,
  dob: Date,
  school?: string
): token {
  return { token: "token" };
}

function userAuthLogin(email: string, password: string): token {
  return { token: "token" };
}

function userAuthLogout(token: string): {} {
  return {};
}

function userAuthLogoutAll(token: string): {} {
  return {};
}
