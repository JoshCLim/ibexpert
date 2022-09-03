import { v4 as uuid } from "uuid";
import crypto from "crypto";
import isEmail from "validator/lib/isEmail";
import createError from "http-errors";

import { getData, setData, hash, usersPATH, generateId } from "../data";
import { userProfileTYPE, usersTYPE } from "../types";

interface token {
  token: string;
}

const SECRET = "purply pink panthers pop party poppers pleasurably";

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
 * @throws {400} email already taken
 * @throws {400} password < 6 characters
 * @throws {400} nameFirst not between 1-20 characters
 * @throws {400} nameLast not between 1-20 characters
 * @throws {400} graduation year must be >= currentYear - 10
 */
export function userAuthRegister(
  email: string,
  password: string,
  nameFirst: string,
  nameLast: string,
  graduationYear?: number,
  dob?: Date,
  school?: string
): token {
  // error checking
  if (!isEmail(email)) {
    throw createError(400, "invalid email");
  }
  if (password.length < 6) {
    throw createError(400, "password must be at least 6 characters");
  }
  if (nameFirst.length < 1 || nameFirst.length > 20) {
    throw createError(400, "first name must be between 1-20 characters");
  }
  if (nameLast.length < 1 || nameLast.length > 20) {
    throw createError(400, "last name must be between 1-20 characters");
  }
  if (
    graduationYear !== null &&
    graduationYear < new Date().getFullYear() - 10
  ) {
    throw createError(
      400,
      "graduation year must be within 10 years of current year"
    );
  }
  const currentUsers: usersTYPE = getData(usersPATH);
  if (currentUsers.users.filter((user) => user.email === email).length > 0) {
    throw createError(400, "email already taken");
  }

  // generate new user id
  const newId = generateId(currentUsers.users);

  // generate new handleStr
  const newHandleStr = generateHandleStr(`${nameFirst}.${nameLast}`);

  // generate new token
  const newToken = uuid();

  // new user object
  const newUser: userProfileTYPE = {
    id: newId,
    email: email,
    password: password,
    nameFirst: nameFirst,
    nameLast: nameLast,
    tokens: [newToken],
    handleStr: newHandleStr,
    removed: false,
  };
  if (graduationYear !== null) {
    newUser.graduationYear = graduationYear;
  }
  if (dob !== null) {
    newUser.dob = dob;
  }
  if (school !== null) {
    newUser.school = school;
  }

  // update datastore with new user
  currentUsers.users.push(newUser);
  setData(usersPATH, currentUsers);

  return { token: hash(newToken + SECRET) };
}

/**
 * logs a user in and returns a token for them to access the site
 * @param {string} email of user logging in
 * @param {string} password of user logging in
 *
 * @returns {token} token for user to access site
 *
 * @throws {401} if email invalid
 * @throws {401} if password invalid
 */
export function userAuthLogin(email: string, password: string): token {
  const currentUsers: usersTYPE = getData(usersPATH);

  const matchingEmail = currentUsers.users.filter(
    (user) => user.email === email
  );
  if (matchingEmail.length === 0) {
    throw createError(401, "invalid login details");
  } else if (matchingEmail.length > 1) {
    throw createError(
      500,
      "internal server error: more than one user with same email"
    );
  }
  if (matchingEmail[0].password !== password) {
    throw createError(401, "invalid login details");
  }

  const newToken = uuid();

  matchingEmail[0].tokens.push(newToken);

  setData(usersPATH, currentUsers);

  return { token: hash(newToken + SECRET) };
}

/**
 * invalidates a token - essentially 'logging them out'
 * @param {string} token - hashed token of user who wishes to logout
 *
 * @returns { {} } empty object
 *
 * @throws {401} if invalid token
 */
export function userAuthLogout(token: string): {} {
  const currentUsers: usersTYPE = getData(usersPATH);

  const matchingTokens = currentUsers.users.filter((user) => {
    const hashedTokens = user.tokens.map((val) => hash(val + SECRET));
    return hashedTokens.includes(token);
  });
  if (matchingTokens.length === 0) {
    throw createError(401, "invalid token");
  }
  if (matchingTokens.length > 1) {
    throw createError(500, "internal server error: duplicate tokens");
  }

  matchingTokens[0].tokens = matchingTokens[0].tokens.filter(
    (val) => hash(val + SECRET) !== token
  );

  setData(usersPATH, currentUsers);

  return {};
}

/**
 * logs a user out of all sessions
 * @param {string} token - hashed token of user who wishes to logout
 *
 * @returns { {} } empty object
 *
 * @throws {401} if invalid token
 */
export function userAuthLogoutAll(token: string): {} {
  const currentUsers: usersTYPE = getData(usersPATH);

  const matchingTokens = currentUsers.users.filter((user) => {
    const hashedTokens = user.tokens.map((val) => hash(val + SECRET));
    return hashedTokens.includes(token);
  });
  if (matchingTokens.length === 0) {
    throw createError(401, "invalid token");
  }
  if (matchingTokens.length > 1) {
    throw createError(500, "internal server error: duplicate tokens");
  }

  matchingTokens[0].tokens = [];

  setData(usersPATH, currentUsers);

  return {};
}

// ---- helper functions ---- //
/**
 * correctly formats handleStr and ensures no duplicates
 * @param {string} newHandleStr of user
 * @returns {string} new handleStr to be generated
 */
function generateHandleStr(newHandleStr: string): string {
  const currentUsers: usersTYPE = getData(usersPATH);

  let handleStrIndex = 1;
  newHandleStr = newHandleStr
    .toLowerCase()
    .replace(/[^a-z0-9._]/gi, "")
    .slice(0, 15);

  let matchingHandleStr = currentUsers.users.filter(
    (user) => user.handleStr === newHandleStr
  );
  while (matchingHandleStr.length > 1) {
    newHandleStr = `${newHandleStr}${handleStrIndex}`;
    matchingHandleStr = currentUsers.users.filter(
      (user) => user.handleStr === newHandleStr
    );
    handleStrIndex++;
  }

  return newHandleStr;
}

/**
 * validates a user token
 * @param {string} token to validate
 * @returns {boolean} true, if token valid
 * @throws {401} invalid token
 */
export function validateUserToken(token: string): boolean {
  const currentUsers: usersTYPE = getData(usersPATH);

  const matchingTokens = currentUsers.users.filter((user) => {
    const hashedTokens = user.tokens.map((val) => hash(val + SECRET));
    return hashedTokens.includes(token);
  });
  if (matchingTokens.length === 0) {
    throw createError(401, "invalid token");
  }
  if (matchingTokens.length > 1) {
    throw createError(500, "internal server error: duplicate tokens");
  }

  return true;
}
