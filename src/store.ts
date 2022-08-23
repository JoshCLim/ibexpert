import fs from "fs";

import { getData, itemsTYPE, tagsTYPE } from "./data";

// ----- PATHS ----- //
const storeItemsPATH = "./data/store/items.json";

export function storeGetItems(): itemsTYPE {
  return getData(storeItemsPATH);
}

export function storeGetTags(): tagsTYPE {
  const res = getData(storeItemsPATH);
  return { tags: res.tags };
}
