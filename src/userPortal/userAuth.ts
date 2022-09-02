import { v4 as uuid } from "uuid";
import crypto from "crypto";
import isEmail from "validator/lib/isEmail";

import { getData, setData, hash } from "../data";

interface token {
  token: string;
}

/**
 * register a new user to the site
 * @param {string} email of new user
 * @param {string} password of new user
 * @param {string} nameFirst of new user
 * @param {string} nameLast of new user
 * @param {number} graduationYear of new user (optional parameter)
 * @param {Date} dob = date of birth of new user (optional parameter)
 * @param {string} school new user's school (optional parameter)
 *
 * @returns {token} token for new user to access site
 *
 * @throws {400} email invalid
 * @throws {400} password < 6 characters
 * @throws {400} nameFirst not between 1-20 characters
 * @throws {400} nameLast not between 1-20 characters
 */
function userAuthRegister(
  email: string,
  password: string,
  nameFirst: string,
  nameLast: string,
  graduationYear?: number,
  dob?: Date,
  school?: string
): token {
  return { token: "token" };
}

/**
 * logs a user in and returns a token for them to access the site
 * @param {string} email of user logging in
 * @param {string} password of user logging in
 *
 * @returns {token} token for user to access site
 *
 * @throws {403} if email invalid
 * @throws {403} if password invalid
 */
function userAuthLogin(email: string, password: string): token {
  return { token: "token" };
}

/**
 * invalidates a token - essentially 'logging them out'
 * @param {string} token - hashed token of user who wishes to logout
 *
 * @returns { {} } empty object
 *
 * @throws {403} if invalid token
 */
function userAuthLogout(token: string): {} {
  return {};
}

/**
 * logs a user out of all sessions
 * @param {string} token - hashed token of user who wishes to logout
 *
 * @returns { {} } empty object
 *
 * @throws {403} if invalid token
 */
function userAuthLogoutAll(token: string): {} {
  return {};
}
