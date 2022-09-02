import {
  tutorsTYPE,
  subjectsTYPE,
  faqsTYPE,
  tutorTYPE,
  idTYPE,
  subjectTYPE,
  qnTYPE,
} from "../types";
import {
  tutorDataPATH,
  subjectsDataPATH,
  faqsDataPATH,
  getData,
  setData,
  generateId,
} from "../data";
import { validateAdminToken } from "./siteAdminAuth";

const defaultPicURL =
  "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

/**
 * add a new tutor to the database
 * @param {string} token of admin (authentication)
 * @param {string} name of new tutor
 * @param {number} mark of new tutor
 * @param {string} bio of new tutor
 * @returns {idTYPE} id of new tutor added
 * @throws {403} token invalid
 * @throws {400} tutor name not within 1-20 character
 * @throws {400} tutor mark is not between 24-45 inclusive
 * @throws {400} tutor bio is greater than 30 characters
 */
export function adminAddTutor(
  token: string,
  name: string,
  mark: number,
  bio: string
): idTYPE {
  validateAdminToken(token);

  if (name.length < 1 || name.length > 20) {
    throw new Error("invalid name length");
  }
  if (mark > 45 || mark < 24) {
    throw new Error("invalid mark");
  }
  if (bio.length > 30) {
    throw new Error("bio must be less than 30 characters long");
  }

  const tutors: tutorsTYPE = getData(tutorDataPATH);
  const newId = generateId(tutors.tutors);
  const newTutor: tutorTYPE = {
    id: newId,
    name: name,
    mark: mark,
    bio: bio,
    picURL: defaultPicURL,
  };
  tutors.tutors.push(newTutor);

  setData(tutorDataPATH, tutors);

  return { id: newId };
}

/**
 * add a new subject to the database
 * @param {string} token of admin (authentication)
 * @param {string} name of new subject
 * @param {levelTYPE} level = 0 for SL, 1 for SL/HL
 * @param {number} group = number from 1-6
 * @returns {idTYPE} id of new subject
 * @throws {403} token invalid
 * @throws {400} subject name not between 1-20 characters
 * @throws {400} level is not either 0 or 1
 */
export function adminAddSubject(
  token: string,
  name: string,
  level: number,
  group: number
): idTYPE {
  validateAdminToken(token);

  if (name.length < 1 || name.length > 20) {
    throw new Error("invalid name length");
  }
  if (level != 0 && level != 1) {
    throw new Error("level must be 0 (SL) or 1 (HL/SL)");
  }

  const subjects: subjectsTYPE = getData(subjectsDataPATH);

  if (group < 1 || group > subjects.groups) {
    throw new Error("group num must be from 1-6");
  }

  const newId = generateId([].concat(...subjects.subjects));
  const newSubject: subjectTYPE = {
    id: newId,
    name: name,
    level: level,
  };

  subjects.subjects[group - 1].push(newSubject);

  setData(subjectsDataPATH, subjects);

  return { id: newId };
}

/**
 * adds a new faq to the database
 * @param {string} token of admin (authentication)
 * @param {string} question of new faq
 * @param {string} answer of new faq
 * @returns {idTYPE} id of new FAQ
 * @throws {403} invalid token
 * @throws {400} question not between 1 and 50 characters
 * @throws {400} answer not between 1 and 100 characters
 */
export function adminAddFAQ(
  token: string,
  question: string,
  answer: string
): idTYPE {
  validateAdminToken(token);

  if (question.length < 1 || question.length > 50) {
    throw new Error("invalid question length");
  }
  if (answer.length < 1 || answer.length > 100) {
    throw new Error("invalid answer length");
  }

  const faqs: faqsTYPE = getData(faqsDataPATH);
  const newId = generateId(faqs.faqs);
  const newQn: qnTYPE = {
    id: newId,
    question: question,
    answer: answer,
  };

  faqs.faqs.push(newQn);

  setData(faqsDataPATH, faqs);

  return { id: newId };
}

/**
 * removes a tutor from the database
 * @param {string} token of admin (authentication)
 * @param {number} tutorId of tutor to remove
 * @returns { {} } empty object
 * @throws {403} invalid token
 * @throws {400} no tutor with tutorId exists
 */
export function adminRemoveTutor(token: string, tutorId: number): {} {
  validateAdminToken(token);

  const tutors: tutorsTYPE = getData(tutorDataPATH);

  const initLen = tutors.tutors.length;
  tutors.tutors = tutors.tutors.filter((tutor) => tutor.id !== tutorId);
  const finalLen = tutors.tutors.length;

  if (initLen == finalLen) {
    throw new Error("no tutor id exists");
  }

  setData(tutorDataPATH, tutors);
  return {};
}

/**
 * remove a subject from the database
 * @param {string} token of admin (authentication)
 * @param {number} subjectId of subject to remove
 * @returns { {} } empty object
 * @throws {403} invalid token
 * @throws {400} no subject with subjectId exists
 */
export function adminRemoveSubject(token: string, subjectId: number): {} {
  validateAdminToken(token);

  const subjects: subjectsTYPE = getData(subjectsDataPATH);

  let found = false;

  for (let i = 0; i < subjects.groups; i++) {
    let initLen = subjects.subjects[i].length;

    subjects.subjects[i] = subjects.subjects[i].filter(
      (subject) => subject.id !== subjectId
    );

    let finalLen = subjects.subjects[i].length;

    if (initLen !== finalLen) {
      found = true;
    }
  }

  if (found == false) {
    throw new Error("no subject with id found");
  }

  setData(subjectsDataPATH, subjects);

  return {};
}

/**
 * remove a qn from the database
 * @param {string} token of admin (authentication)
 * @param {number} qnId of faq to remove
 * @returns { {} } empty object
 * @throws {403} invalid token
 * @throws {400} no qn with qnId exists
 */
export function adminRemoveFAQ(token: string, qnId: number): {} {
  validateAdminToken(token);

  const faqs: faqsTYPE = getData(faqsDataPATH);

  const initLen = faqs.faqs.length;
  faqs.faqs = faqs.faqs.filter((qn) => qn.id !== qnId);
  const finalLen = faqs.faqs.length;

  if (initLen === finalLen) {
    throw new Error("no question with qnId found");
  }

  setData(faqsDataPATH, faqs);

  return {};
}
