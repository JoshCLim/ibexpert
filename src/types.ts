/* ----- TYPES ----- */

// home
export interface tutorTYPE {
  id: number;
  name: string;
  mark: number;
  bio: string;
  picURL: string;
}
export interface tutorsTYPE {
  tutors: tutorTYPE[];
}
export interface subjectTYPE {
  id: number;
  name: string;
  level: number; // 0 = SL, 1 = HL/SL
}
export interface subjectsTYPE {
  groups: number;
  subjects: subjectTYPE[][];
}
export interface qnTYPE {
  id: number;
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

// site-admin
export interface adminTYPE {
  email: string;
  password: string;
  tokens: string[];
}
export interface adminsTYPE {
  admins: adminTYPE[];
}
