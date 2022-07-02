/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-param-reassign */

export const addQuery = (url: string, query?: Record<string, any>) => {
  if (!query) return url;
  let existQuestionMark = false;
  Object.entries(query).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    if (!existQuestionMark) {
      url += `?${key}=${value}`;
      existQuestionMark = true;
    } else {
      url += `&${key}=${value}`;
    }
  });
  return url;
};

export const changeParam = (url: string, param?: Record<string, any>) => {
  if (!param) return url;
  Object.entries(param).forEach(([key, value]) => {
    url = url.replace(`:${key}`, value);
  });
  return url;
};
