export const pathValidation = (currentPath: string[], routePath: string[]) => {
  const params: Record<string, string> = {};
  if (routePath.length === 1 && (routePath[0] === '' || routePath[0] === '*')) return params;
  for (let index = 0; index < currentPath.length; index++) {
    if (/^:/.test(routePath[index])) {
      params[routePath[index].slice(1)] = currentPath[index];
      continue;
    }
    if (routePath[index] === '*') {
      return params;
    }
    if (currentPath[index] !== routePath[index]) {
      return false;
    }
  }
  return params;
};
