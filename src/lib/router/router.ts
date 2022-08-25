/* eslint-disable @typescript-eslint/no-explicit-any */
import { pathValidation } from './helper';
import { RouterContext, routerContext } from './router-context';
import { IRoute } from './type';

class Router {
  $target: HTMLElement;
  routes: IRoute[];
  routerContext: RouterContext;

  constructor($target: HTMLElement, routes: IRoute[]) {
    this.$target = $target;
    this.routes = routes;
    this.routerContext = routerContext;
    this.setup();
    this.route();
    this.addLinkChangeHandler();
    this.addBackChangeHandler();
  }

  private setup() {
    this.routerContext.setState({
      pathname: window.location.pathname,
      searchParams: new URLSearchParams(window.location.search),
      push: (url: string, option?: { replace?: boolean; state?: any }) => this.push(url, option),
      goBack: () => this.goBack(),
    });
  }

  private route() {
    const currentPath = routerContext.state.pathname.split('/');
    for (let i = 0; i < this.routes.length; i++) {
      const routePath = this.routes[i].path.split('/');
      const params = pathValidation(currentPath, routePath);
      if (!params) continue;
      this.routerContext.setState({ params });

      const Page = this.routes[i].component;
      const { props } = this.routes[i];
      const page = new Page(props ?? {});
      const { $el: $pageEl } = page;
      // TODO: 이벤트 해제를 먼저 구현해야함
      // reconciliation(this.$target, $pageEl);
      this.$target.replaceWith($pageEl);
      this.$target = $pageEl;
      return;
    }
  }

  private addLinkChangeHandler() {
    window.addEventListener('click', (e) => {
      const $target = e.target as HTMLElement;
      const closest = $target.closest('a');
      if (!closest || closest.getAttribute('target')) return;
      e.preventDefault();
      const pathname = closest.getAttribute('href');
      const replace = closest.getAttribute('replace') === '' || closest.getAttribute('replace') === 'true';
      const state = closest.getAttribute('state');
      if (pathname) {
        this.push(pathname, { replace, state });
      }
    });
  }

  private addBackChangeHandler() {
    window.addEventListener('popstate', () => {
      this.routerContext.setState({ pathname: window.location.pathname });
      this.route();
    });
  }

  private push = (url: string, option?: { replace?: boolean; state?: any }) => {
    const [pathname, search] = url.split('?');
    if (option?.replace) {
      window.history.replaceState(option?.state, '', url);
    } else {
      window.history.pushState(option?.state, '', url);
    }
    this.routerContext.setState({ pathname, searchParams: new URLSearchParams(search), state: option?.state });
    this.route();
  };

  private goBack = () => {
    window.history.back();
  };
}

export default Router;
