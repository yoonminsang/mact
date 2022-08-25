import { routerContext } from './router-context';

export const useHistory = () => routerContext.state;
export const usePathname = () => routerContext.state.pathname;
export const useParams = () => routerContext.state.params;
export const useSearchParams = () => {
  const { pathname, searchParams } = routerContext.state;
  const setSearchParams = (searchParams: URLSearchParams) => {
    window.history.replaceState(null, '', pathname + searchParamsToQuery(searchParams));
    routerContext.setState({ searchParams });
  };
  return [searchParams, setSearchParams] as const;
};

const searchParamsToQuery = (searchParams: URLSearchParams) => {
  let existQuestionMark = false;
  return [...searchParams.keys()].reduce((acc, key) => {
    const value = searchParams.get(key);
    if (value === undefined || value === null || value === '') return acc;
    if (!existQuestionMark) {
      acc += `?${key}=${value}`;
      existQuestionMark = true;
    } else {
      acc += `&${key}=${value}`;
    }
    return acc;
  }, '');
};
