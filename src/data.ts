import fs from "fs";

// ----- PATHS ----- //
export const tutorDataPATH = "./data/home/tutors.json";
export const subjectsDataPATH = "./data/home/subjects.json";
export const faqsDataPATH = "./data/home/faqs.json";

export const storeItemsPATH = "./data/store/items.json";

export const adminPATH = "./data/admin/admin.json";

// ----- FUNCTIONS ----- //
export function getData(path: string) {
  return JSON.parse(String(fs.readFileSync(path)));
}

export function setData(path: string, object: any) {
  fs.writeFileSync(path, JSON.stringify(object, null, 4));
}
