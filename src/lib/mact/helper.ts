export const getJSONparse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
};
