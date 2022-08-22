import fs from "fs";

// ----- TYPES ----- //
interface tutorTYPE {
  name: string;
  mark: number;
  bio: string;
  picURL: string;
}
interface tutorsTYPE {
  tutors: tutorTYPE[];
}

interface subjectTYPE {
  name: string;
  level: number; // 0 = SL, 1 = HL/SL
}
interface subjectsTYPE {
  groups: number;
  subjects: subjectTYPE[][];
}

interface qnTYPE {
  question: string;
  answer: string;
}
interface faqsTYPE {
  faqs: qnTYPE[];
}

// ----- PATHS ----- //
const tutorDataPATH = "./data/home/tutors.json";
const subjectsDataPATH = "./data/home/subjects.json";
const faqsDataPATH = "./data/home/faqs.json";

export function homeTutors(): tutorsTYPE {
  return JSON.parse(String(fs.readFileSync(tutorDataPATH)));
}

export function homeSubjects(): subjectsTYPE {
  return JSON.parse(String(fs.readFileSync(subjectsDataPATH)));
}

export function homeFAQs(): faqsTYPE {
  return JSON.parse(String(fs.readFileSync(faqsDataPATH)));
}
