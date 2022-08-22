import { GET, BODY, storeItemsPATH, storeTagsPATH } from "./httpRequests";

test(`${storeItemsPATH} correct return type`, () => {
  const res = GET(storeItemsPATH, {});

  expect(res.statusCode).toBe(200);

  BODY(res).items.forEach((item) => {
    expect({ grade: -1, maxGrade: -1, ...item }).toStrictEqual({
      id: expect.any(Number),
      index: expect.any(Number),
      name: expect.any(String),
      price: expect.any(Number),
      tags: expect.any(Array),
      imageUrl: expect.any(String),
      description: expect.any(String),
      type: expect.any(String),
      grade: expect.any(Number),
      maxGrade: expect.any(Number),
    });

    expect(item.id).toBeGreaterThanOrEqual(1);
    expect(item.index).toBeGreaterThanOrEqual(-1);
    expect(item.price).toBeGreaterThanOrEqual(0);
    expect(item.type === "NOTES" || item.type === "ASSIGNMENT").toBeTruthy();
  });

  BODY(res).tags.forEach((tag) => {
    expect(tag).toStrictEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });

    expect(tag.id).toBeGreaterThanOrEqual(1);
  });
});

test(`${storeTagsPATH} correct return type`, () => {
  const res = GET(storeTagsPATH, {});

  expect(res.statusCode).toBe(200);

  BODY(res).tags.forEach((tag) => {
    expect(tag).toStrictEqual({
      id: expect.any(Number),
      name: expect.any(String),
    });

    expect(tag.id).toBeGreaterThanOrEqual(1);
  });
});
