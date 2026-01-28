export const formatNumber = (value) => {
  if (value === null || value === undefined) return "";
  return Number(value).toLocaleString("zh-TW");
};
