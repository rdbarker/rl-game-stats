export const storeItem = (itemKey, value) => {
  localStorage.setItem(itemKey, value);
};

export const getItem = (itemKey) => {
  const value = localStorage.getItem(itemKey);
  return value ? value : "";
};
