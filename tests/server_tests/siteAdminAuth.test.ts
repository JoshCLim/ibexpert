import {
  POST,
  BODY,
  adminLoginPATH,
  adminLogoutPATH,
  adminLogoutAllPATH,
} from "./httpRequests";

// standard inputs
const EMAIL_VALID = "joshconstantinelim@gmail.com";
const PASSWORD_VALID = "tutoring2022";

// tests
beforeEach(() => {
  POST(adminLogoutAllPATH, {});
});

test("successful login, logout", () => {
  const login = POST(adminLoginPATH, {
    email: EMAIL_VALID,
    password: PASSWORD_VALID,
  });

  expect(login.statusCode).toBe(200);

  const logout = POST(adminLogoutPATH, {
    token: BODY(login).token,
  });

  expect(logout.statusCode).toBe(200);
});

test("logoutAll", () => {
  const res = POST(adminLogoutAllPATH, {});
  expect(res.statusCode).toBe(200);
});
