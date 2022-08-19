import fs from "fs";
import path from "path";

// ----- TYPES ----- //
interface tutor {
  name: string;
  mark: number;
  bio: string;
  picURL: string;
}
interface tutors {
  tutors: tutor[];
}

interface subject {
  name: string;
  level: number; // 0 = SL, 1 = HL/SL
}
interface subjects {
  subjects: subject[][];
}

interface qn {
  question: string;
  answer: string;
}
interface faqs {
  faqs: qn[];
}

// ----- PATHS ----- //
const tutorDataPath = "./data/home/tutors.json";
const subjectsDataPath = "./data/home/subjects.json";
const faqsDataPath = "./data/home/faqs.json";

export function homeTutors(): tutors {
  return JSON.parse(String(fs.readFileSync(tutorDataPath)));
}

export function homeSubjects(): subjects {
  return JSON.parse(String(fs.readFileSync(subjectsDataPath)));
}

export function homeFAQs(): faqs {
  return JSON.parse(String(fs.readFileSync(faqsDataPath)));
}
