import fs from "fs";
import crypto from "crypto";

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

/**
 * generate id for a dataStore
 * @param array any array of objects which have property id
 * @returns new unique id
 */
export function generateId(array: any): number {
  const ids = array.map((item) => item.id);
  if (ids.length < 1) {
    return 1;
  }
  return Math.max(...ids) + 1;
}

/**
 * creates a hash for a given string
 *
 * @param { string } plainText that we want to hash
 *
 * @returns { string } hash generated from string
 */
export function hash(plainText: string): string {
  return crypto.createHash("sha256").update(plainText).digest("hex");
}
