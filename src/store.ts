import { getData } from "./data";
import { itemsTYPE, tagsTYPE } from "./types";

// ----- PATHS ----- //
const storeItemsPATH = "./data/store/items.json";

export function storeGetItems(): itemsTYPE {
  return getData(storeItemsPATH);
}

export function storeGetTags(): tagsTYPE {
  const res: itemsTYPE = getData(storeItemsPATH);
  return { tags: res.tags };
}
