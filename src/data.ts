import fs from "fs";

/* ----- TYPES ----- */

// home
export interface tutorTYPE {
  name: string;
  mark: number;
  bio: string;
  picURL: string;
}
export interface tutorsTYPE {
  tutors: tutorTYPE[];
}
export interface subjectTYPE {
  name: string;
  level: number; // 0 = SL, 1 = HL/SL
}
export interface subjectsTYPE {
  groups: number;
  subjects: subjectTYPE[][];
}
export interface qnTYPE {
  question: string;
  answer: string;
}
export interface faqsTYPE {
  faqs: qnTYPE[];
}

// store
export enum itemType {
  notes = "NOTES",
  assignment = "ASSIGNMENT",
}
export interface itemTYPE {
  index: number; // default -1, higher == more priority i.e. featured in store
  id: number;
  name: string;
  price: number;
  tags: number[]; // array of tag ids
  imageUrl: string;
  description: string;
  type: itemType;
  grade?: number; // optional argument since NOTES do not have grades
  maxGrade?: number; // = -1 if grade not given
}
export interface tagTYPE {
  id: number;
  name: string;
}
export interface itemsTYPE {
  items: itemTYPE[];
  tags: tagTYPE[];
}
export interface tagsTYPE {
  tags: tagTYPE[];
}

/* ----- FUNCTIONS ----- */
export function getData(path: string) {
  return JSON.parse(String(fs.readFileSync(path)));
}

export function setData(path: string, object: any) {
  fs.writeFileSync(path, JSON.stringify(object, null, 4));
}
