export const onlyLatin = (str) => {
  return /^[a-zA-Z\s.,]+$/.test(str);
};

export const onlyCyrillic = (str) => {
  return /^[А-Яа-яёЁ\s.,]+$/.test(str);
};
