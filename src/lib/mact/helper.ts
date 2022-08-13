export const getJSONparse = (value: string) => {
  try {
    return JSON.parse(value);
  } catch (err) {
    return value;
  }
};

export const debounceFrame = (callback: () => void) => {
  let currentCallback: number;
  return () => {
    if (currentCallback) cancelAnimationFrame(currentCallback);
    currentCallback = requestAnimationFrame(callback);
  };
};
