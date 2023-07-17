export const isTypesCorrect = (
  files: FileList | File,
  allowedTypes: string[],
): boolean => {
  if (files instanceof File) {
    if (!allowedTypes.includes(files.type)) {
      return false;
    }
  }
  if (files instanceof FileList) {
    for (let i = 0; i < files.length; i++) {
      if (!allowedTypes.includes(files[i].type)) {
        return false;
      }
    }
  }
  return true;
};
