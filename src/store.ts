import fs from "fs";

enum itemType {
  notes = "NOTES",
  assignment = "ASSIGNMENT",
}

interface itemTYPE {
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

interface tagTYPE {
  id: number;
  name: string;
}

interface itemsTYPE {
  items: itemTYPE[];
  tags: tagTYPE[];
}

interface tagsTYPE {
  tags: tagTYPE[];
}

// ----- PATHS ----- //
const storeItemsPATH = "./data/store/items.json";

export function storeGetItems(): itemsTYPE {
  return JSON.parse(String(fs.readFileSync(storeItemsPATH)));
}

export function storeGetTags(): tagsTYPE {
  const res = JSON.parse(String(fs.readFileSync(storeItemsPATH)));
  return { tags: res.tags };
}
