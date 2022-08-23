import { getData } from "./data";
import { tutorsTYPE, subjectsTYPE, faqsTYPE } from "./types";

// ----- PATHS ----- //
const tutorDataPATH = "./data/home/tutors.json";
const subjectsDataPATH = "./data/home/subjects.json";
const faqsDataPATH = "./data/home/faqs.json";

export function homeTutors(): tutorsTYPE {
  return getData(tutorDataPATH);
}

export function homeSubjects(): subjectsTYPE {
  return getData(subjectsDataPATH);
}

export function homeFAQs(): faqsTYPE {
  return getData(faqsDataPATH);
}
