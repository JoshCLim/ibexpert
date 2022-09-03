import createError from "http-errors";

import { getData, setData, generateId } from "../data";
import { packageTYPE, bookingTYPE, bookingsTYPE } from "../types";

interface bookingIdTYPE {
  bookingId: number;
}

/**
 * create a user's booking
 * @param {string} token of user making the booking
 * @param {number} tutorId of tutor who booking is made with
 * @param {Date} timeStart start of booking time
 * @param {Date} timeEnd end of booking time
 *
 * @returns {bookingIdTYPE} bookingId of new booking created
 *
 * @throws {401} invalid token
 * @throws {400} invalid tutorId
 * @throws {403} user has zero bookings left
 * @throws {400} booking is in the past OR less than 24 hours in the future
 * @throws {400} tutor is not available for the given time
 */
export function userBookingsCreate(
  token: string,
  tutorId: number,
  timeStart: Date,
  timeEnd: Date
): bookingIdTYPE {
  throw createError(501, "not implemented");
}

/**
 * cancels a user's booking
 * @param {string} token of user cancelling booking
 * @param {number} bookingId of booking to cancel
 *
 * @returns { {} } empty object
 *
 * @throws {401} invalid token
 * @throws {400} bookingId invalid
 * @throws {403} booking exists but user does not belong to this booking
 */
export function userBookingsCancel(token: string, bookingId: number): {} {
  throw createError(501, "not implemented");
}

/**
 * lists all of a user's bookings
 * @param {string} token of user
 *
 * @returns {bookingsTYPE} list of all user's bookings they are part of
 *
 * @throws {401} invalid token
 */
export function userBookingsList(token: string): bookingsTYPE {
  throw createError(501, "not implemented");
}
