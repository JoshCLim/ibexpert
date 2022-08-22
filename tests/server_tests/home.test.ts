import {
  GET,
  BODY,
  homeTutorsPATH,
  homeSubjectsPATH,
  homeFAQsPATH,
} from "./httpRequests";

test(`${homeTutorsPATH} returns correct type`, () => {
  const res = GET(homeTutorsPATH, {});

  BODY(res).tutors.forEach((tutor) => {
    expect(tutor).toStrictEqual({
      name: expect.any(String),
      mark: expect.any(Number),
      bio: expect.any(String),
      picURL: expect.any(String),
    });
  });
});

test(`${homeSubjectsPATH} returns correct type`, () => {
  const res = GET(homeSubjectsPATH, {});

  BODY(res).subjects.forEach((group) => {
    group.forEach((subject) => {
      expect(typeof subject.name).toBe("string");
      expect(subject.name.length).toBeGreaterThan(0);

      expect(typeof subject.level).toBe("number");
      expect(subject.level === 1 || subject.level === 0).toBeTruthy();
    });
  });
});

test(`${homeFAQsPATH} returns correct type`, () => {
  const res = GET(homeFAQsPATH, {});

  BODY(res).faqs.forEach((qn) => {
    expect(qn).toStrictEqual({
      question: expect.any(String),
      answer: expect.any(String),
    });
  });
});
