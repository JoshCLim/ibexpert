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
} from "../data";

const defaultPicURL =
  "https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png";

export function adminAddTutor(name: string, mark: number, bio: string): idTYPE {
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

export function adminAddSubject(
  name: string,
  level: number,
  group: number
): idTYPE {
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

export function adminAddFAQ(question: string, answer: string): idTYPE {
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

// ---- helper functions ---- //
/**
 * generate id for a dataStore
 * @param array any array of objects which have property id
 * @returns new unique id
 */
function generateId(array: any): number {
  const ids = array.map((item) => item.id);
  if (ids.length < 1) {
    return 1;
  }
  return Math.max(...ids) + 1;
}
