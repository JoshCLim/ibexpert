import fs from "fs";

enum itemType {
  notes = "NOTES",
  assignment = "ASSIGNMENT",
}

interface item {
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

interface tag {
  id: number;
  name: string;
}

interface items {
  items: item[];
  tags: tag[];
}

// ----- PATHS ----- //
const storeItemsPath = "./data/store/items.json";

export function storeGetItems(): items {
  return JSON.parse(String(fs.readFileSync(storeItemsPath)));
}
