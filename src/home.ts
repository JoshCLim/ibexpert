import { tutorDataPATH, subjectsDataPATH, faqsDataPATH, getData } from "./data";
import { tutorsTYPE, subjectsTYPE, faqsTYPE } from "./types";

export function homeTutors(): tutorsTYPE {
  return getData(tutorDataPATH);
}

export function homeSubjects(): subjectsTYPE {
  return getData(subjectsDataPATH);
}

export function homeFAQs(): faqsTYPE {
  return getData(faqsDataPATH);
}
