import { v4 as uuid } from "uuid";
import createError from "http-errors";

import { adminPATH, getData, setData, hash } from "../data";
import { adminsTYPE } from "../types";

interface token {
  token: string;
}

const SECRET = "up n gos tickle my toes";

/**
 * logs in an admin and returns a hashed token for their current session
 *
 * @param {string} email of site admin
 * @param {string} password of site admin
 *
 * @returns {token} (hashed) session token for user
 *
 * @throws {401} if email or password invalid
 */
export function adminLogin(email: string, password: string): token {
  const admins: adminsTYPE = getData(adminPATH);

  const matchingUsers = admins.admins.filter(
    (admin) =>
      admin.email === email && admin.password === hash(password + SECRET)
  );

  if (matchingUsers.length < 1) {
    throw createError(401, "invalid email / password");
  }

  const newToken = uuid();
  matchingUsers[0].tokens.push(newToken);

  setData(adminPATH, admins);

  return { token: hash(newToken + SECRET) };
}

/**
 * logs out an admin by deleting their token from the datastore
 *
 * @param {string} token hashed token of admin
 *
 * @returns { {} } if logout successful
 *
 * @throws {401} if token doesn't exist
 */
export function adminLogout(token: string) {
  const admins: adminsTYPE = getData(adminPATH);

  let tokenFound = false;
  admins.admins.forEach((admin) => {
    const hashedTokens = admin.tokens.map((value) => hash(value + SECRET));

    if (hashedTokens.includes(token)) {
      admin.tokens = admin.tokens.filter((value) => value !== token);

      setData(adminPATH, admins);
      tokenFound = true;
    }
  });

  if (!tokenFound) {
    throw createError(401, "no token exists");
  }

  return {};
}

/**
 * deletes all tokens for all admins, logging them all out
 */
export function adminLogoutAll() {
  const admins: adminsTYPE = getData(adminPATH);

  admins.admins.forEach((admin) => {
    admin.tokens = [];
  });

  setData(adminPATH, admins);

  return {};
}

/**
 * checks if an admin's token is valid
 *
 * @param {string} token admin's hashed token to be validated
 *
 * @returns {boolean} true - if token valid
 *
 * @throws {401} if token invalid
 */
export function validateAdminToken(token: string): boolean {
  const admins: adminsTYPE = getData(adminPATH);

  let found = false;

  admins.admins.forEach((admin) => {
    const hashes = admin.tokens.map((value) => hash(value + SECRET));
    if (hashes.includes(token)) {
      found = true;
    }
  });

  if (found == false) {
    throw createError(401, "invalid admin token");
  }

  return true;
}

// ----- HELPER FUNCTIONS ----- //
