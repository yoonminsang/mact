import { Component } from '@/lib/mact';

import Router from './lib/router/router';
import { Page1 } from './pages/page-1';
import { Page2 } from './pages/page-2';
import Parent from './components/parent';
import { NotFoundPage } from './pages/page-not-found';

export default class App extends Component {
  protected componentDidMount(): void {
    setTimeout(
      () =>
        new Router(this.$el, [
          { path: '/', component: Parent },
          { path: '/1', component: Page1 },
          { path: '/page1/*', component: Page1 },
          { path: '/2', component: Page2 },
          { path: '/page2/*', component: Page1 },
          { path: '/*', component: NotFoundPage },
        ]),
    );
  }

  protected render(): string {
    return '<div class="app"></div>';
  }
}
