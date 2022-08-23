import { storeItemsPATH, getData } from "./data";
import { itemsTYPE, tagsTYPE } from "./types";

export function storeGetItems(): itemsTYPE {
  return getData(storeItemsPATH);
}

export function storeGetTags(): tagsTYPE {
  const res: itemsTYPE = getData(storeItemsPATH);
  return { tags: res.tags };
}
