import {
  adminLogin,
  adminLogout,
  adminLogoutAll,
  validateAdminToken,
} from "../../src/siteAdmin/siteAdminAuth";

// standard inputs
const EMAIL_VALID = "joshconstantinelim@gmail.com";
const PASSWORD_VALID = "tutoring2022";

// tests
beforeEach(() => {
  adminLogoutAll();
});

describe("adminLogin()", () => {
  test("correct return type upon successful login", () => {
    const res = adminLogin(EMAIL_VALID, PASSWORD_VALID);
    expect(res).toStrictEqual({ token: expect.any(String) });
  });

  test("error: invalid email", () => {
    expect(() => adminLogin("invalid", PASSWORD_VALID)).toThrowError();
  });

  test("error: invalid password", () => {
    expect(() => adminLogin(EMAIL_VALID, "invalid")).toThrowError();
  });
});

describe("adminLogout()", () => {
  test("correct return type upon successful logout", () => {
    const token = adminLogin(EMAIL_VALID, PASSWORD_VALID).token;

    const res = adminLogout(token);
    expect(res).toStrictEqual({});
  });

  test("error: invalid token", () => {
    const token = adminLogin(EMAIL_VALID, PASSWORD_VALID).token;
    const invalidToken = token + "0";

    expect(() => adminLogout(invalidToken)).toThrowError();
  });
});

describe("adminLogoutAll()", () => {
  test("correct functionality", () => {
    const token = adminLogin(EMAIL_VALID, PASSWORD_VALID).token;

    adminLogoutAll();

    expect(() => adminLogout(token)).toThrowError();
  });
});
