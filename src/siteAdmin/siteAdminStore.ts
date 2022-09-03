import createError from "http-errors";

import { getData, setData, generateId, storeItemsPATH } from "../data";
import { itemType, itemTYPE, itemsTYPE, idTYPE, tagTYPE } from "../types";
import { validateAdminToken } from "./siteAdminAuth";

/**
 * add an item to the store
 * @param {string} token of admin (authentication)
 * @param {string} name of item
 * @param {number} price of item
 * @param {string} imageUrl for item
 * @param {string} description of item
 * @param {itemType} type of item (either NOTES or ASSIGNMENT)
 * @returns {idTYPE} id of new store item
 * @throws {401} invalid token
 * @throws {400} any input is null OR undefined
 * @throws {400} name is not between 1-20 characters
 * @throws {400} price <= 0
 * @throws {400} description is not between 1-1000 characters
 * @throws {400} type is not "NOTES" or "ASSIGNMENT"
 */
export function adminAddStoreItem(
  token: string,
  name: string,
  price: number,
  imageUrl: string,
  description: string,
  type: itemType
): idTYPE {
  validateAdminToken(token);

  if (
    name == null ||
    price == null ||
    imageUrl == null ||
    description == null ||
    type == null
  ) {
    throw createError(400, "input detected as null");
  }

  if (name.length < 1 || name.length > 20) {
    throw createError(400, "store item name must be 1-20 characters");
  }
  if (price <= 0) {
    throw createError(400, "price must be a positive number");
  }
  if (description.length < 1 || description.length > 1000) {
    throw createError(400, "description must be between 1-1000 characters");
  }
  if (type !== "NOTES" && type !== "ASSIGNMENT") {
    throw createError(400, "type must be NOTES or ASSIGNMENT");
  }

  const items: itemsTYPE = getData(storeItemsPATH);

  const newId = generateId(items.items);

  const newItem: itemTYPE = {
    index: -1,
    id: newId,
    name: name,
    price: price,
    tags: [],
    imageUrl: imageUrl,
    description: description,
    type: type,
  };

  items.items.push(newItem);

  setData(storeItemsPATH, items);

  return { id: newId };
}

/**
 * add a tag to store items
 * @param {string} token of admin (authentication)
 * @param {string} tagName of new tag
 * @returns {idTYPE} id of new tag
 * @throws {401} invalid token
 * @throws {400} tag name is null
 * @throws {400} tag name not 1-12 characters
 */
export function adminAddStoreTag(token: string, tagName: string): idTYPE {
  validateAdminToken(token);

  if (tagName == null) {
    throw createError(400, "tagName is null");
  }

  if (tagName.length < 1 || tagName.length > 12) {
    throw createError(400, "tag name must be between 1-12 characters");
  }

  const items: itemsTYPE = getData(storeItemsPATH);

  const newId = generateId(items.tags);

  const newTag: tagTYPE = {
    id: newId,
    name: tagName,
  };

  items.tags.push(newTag);

  setData(storeItemsPATH, items);

  return { id: newId };
}

/**
 * remove an item from a store
 * @param {string} token of admin (authentication)
 * @param {number} itemId of item to remove
 * @returns { {} } empty object
 * @throws {401} invalid token
 * @throws {400} itemId not valid
 */
export function adminRemoveStoreItem(token: string, itemId: number): {} {
  validateAdminToken(token);

  const items: itemsTYPE = getData(storeItemsPATH);

  const initLen = items.items.length;
  items.items = items.items.filter((item) => item.id !== itemId);
  const finalLen = items.items.length;

  if (initLen === finalLen) {
    throw createError(400, "no item with id exists");
  }

  setData(storeItemsPATH, items);

  return {};
}

/**
 * remove a tag from the store (from all items and tags)
 * @param {string} token
 * @param {number} tagId
 * @returns { {} } empty object
 * @throws {401} invalid token
 * @throws {400} tagId not valid
 */
export function adminRemoveStoreTag(token: string, tagId: number): {} {
  validateAdminToken(token);

  const items: itemsTYPE = getData(storeItemsPATH);

  const initLen = items.tags.length;
  items.tags = items.tags.filter((tag) => tag.id !== tagId);
  const finalLen = items.tags.length;

  if (initLen === finalLen) {
    throw createError(400, "no tag with that id exists");
  }

  items.items = items.items.map((item) => {
    item.tags = item.tags.filter((id) => id !== tagId);
    return item;
  });

  setData(storeItemsPATH, items);

  return {};
}
