import { homeTutors, homeSubjects, homeFAQs } from "../../src/home";

test("homeTutors() returns correct type", () => {
  const res = homeTutors();
  res.tutors.forEach((tutor) => {
    expect(tutor).toStrictEqual({
      name: expect.any(String),
      mark: expect.any(Number),
      bio: expect.any(String),
      picURL: expect.any(String),
    });
  });
});

test("homeSubjects() returns correct type", () => {
  const res = homeSubjects();

  res.subjects.forEach((group) => {
    group.forEach((subject) => {
      expect(typeof subject.name).toBe("string");
      expect(subject.name.length).toBeGreaterThan(0);

      expect(typeof subject.level).toBe("number");
      expect(subject.level === 1 || subject.level === 0).toBeTruthy();
    });
  });
});

test("homeFAQs() returns correct type", () => {
  const res = homeFAQs();

  res.faqs.forEach((qn) => {
    expect(qn).toStrictEqual({
      question: expect.any(String),
      answer: expect.any(String),
    });
  });
});
