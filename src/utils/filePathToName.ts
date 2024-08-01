export function filePathToName(filePath: string) {
  return filePath.split("/").pop();
}
