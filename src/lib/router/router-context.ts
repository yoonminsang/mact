/* eslint-disable @typescript-eslint/no-explicit-any */
export interface RouterState {
  pathname: string;
  params: Record<string, string | number>;
  searchParams: URLSearchParams;
  push: (url: string, option?: { replace?: boolean; state?: any }) => void;
  goBack: () => void;
  state: any;
}

export class RouterContext {
  state: RouterState;

  constructor() {
    this.state = {
      pathname: '',
      params: {},
      searchParams: new URLSearchParams(),
      push: () => {},
      goBack: () => {},
      state: {},
    };
  }

  public setState<S extends keyof RouterState>(nextState: Pick<RouterState, S> | RouterState) {
    this.state = { ...this.state, ...nextState };
  }
}

export const routerContext = new RouterContext();
