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
type levelTYPE = 0 | 1;
export interface subjectTYPE {
  id: number;
  name: string;
  level: levelTYPE; // 0 = SL, 1 = HL/SL
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

// site-admin
export interface idTYPE {
  id: number;
}

// users
export interface userTYPE {
  id: number; // user id
  tokens: string[]; // list of user tokens
  email: string;
  password: string;
  nameFirst: string;
  nameLast: string;
  handleStr: string; // username
  graduationYear?: number;
  dob?: Date; // date of birth
  school?: string;
  removed: boolean; // is the user removed?
  bookings: number; // number of unbooked bookings
}

export interface usersTYPE {
  users: userTYPE[];
}

// bookings
export enum packageTYPE {
  payg = "PAYG",
  standard = "STANDARD",
  value = "VALUE",
  other = "OTHER",
}

export interface bookingTYPE {
  id: number;
  users: number[]; // array of uIds in booking
  tutor: number; // uId of tutor
  timeStart: Date;
  timeEnd: Date;
  packageType: packageTYPE;
}

export interface bookingsTYPE {
  bookings: bookingTYPE[];
}
