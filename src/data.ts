import fs from "fs";

export function getData(path: string) {
  return JSON.parse(String(fs.readFileSync(path)));
}

export function setData(path: string, object: any) {
  fs.writeFileSync(path, JSON.stringify(object, null, 4));
}
