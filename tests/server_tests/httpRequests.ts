import config from "../../src/config.json";
import request, { Response } from "sync-request";

const port = config.port;
const url = config.url;

// ---- ROUTES ----- //
export const homeTutorsPATH = "home/tutors/";
export const homeSubjectsPATH = "home/subjects/";
export const homeFAQsPATH = "home/faqs/";

/**
 * GET request on web server with given path and parameters
 *
 * ARGUMENTS:
 * @param path of the route that we are calling
 * @param qs object with arguments of request passed as input
 *
 * RETURN VALUE:
 * @returns res object returned by the server
 */
const GET = (path: string, qs: Record<string, unknown>) => {
  const token = qs.token as string;

  delete qs.token;

  return request("GET", `${url}:${port}/${path}`, {
    qs: qs,
    headers: {
      token: token,
    },
  });
};

/**
 * DELETE request on web server with given path and parameters
 *
 * ARGUMENTS:
 * @param path of the route that we are calling
 * @param qs object with arguments of request passed as input
 *
 * RETURN VALUE:
 * @returns res object returned by the server
 */
const DELETE = (path: string, qs: Record<string, unknown>) => {
  const token = qs.token as string;

  delete qs.token;

  return request("DELETE", `${url}:${port}/${path}`, {
    qs: qs,
    headers: {
      token: token,
    },
  });
};

/**
 * POST request on web server with given path and parameters
 *
 * ARGUMENTS:
 * @param path of the route that we are calling
 * @param body object with arguments of request passed as input
 *
 * RETURN VALUE:
 * @returns res object returned by the server
 */
const POST = (path: string, body: Record<string, unknown>) => {
  const token = body.token as string;

  delete body.token;

  return request("POST", `${url}:${port}/${path}`, {
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      token: token,
    },
  });
};

/**
 * PUT request on web server with given path and parameters
 *
 * ARGUMENTS:
 * @param path of the route that we are calling
 * @param body object with arguments of request passed as input
 *
 * RETURN VALUE:
 * @returns res object returned by the server
 */
const PUT = (path: string, body: Record<string, unknown>) => {
  const token = body.token as string;

  delete body.token;

  return request("PUT", `${url}:${port}/${path}`, {
    body: JSON.stringify(body),
    headers: {
      "content-type": "application/json",
      token: token,
    },
  });
};

/**
 * gets the body object from a http response
 *
 * ARGUMENTS:
 * @param res response returned from http CRUD operation
 *
 * RETURN VALUE:
 * @returns json object containing information returned from HTTP request
 */
const BODY = (res: Response) => JSON.parse(String(res.getBody()));

export { GET, DELETE, POST, PUT, BODY };
