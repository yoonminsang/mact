import { Component } from '@/lib/mact';

import Child from './child';
import { RouterState } from '../lib/router/router-context';
import { useHistory } from '../lib/router/router-hook';

export default class Parent extends Component<{}, { id: number }> {
  $child!: Component;
  history!: RouterState;

  setup() {
    this.state = { id: 1 };
    this.history = useHistory();
  }

  addComponents() {
    this.$child = this.addComponent(Child, { id: this.state.id });
  }

  setEvents() {
    this.addEvent('click', '.js-go-page-1', () => {
      this.history.push('/1', { replace: true, state: { name: 'minsang' } });
    });
    this.addEvent('click', '.js-increase', () => {
      const { id } = this.state;
      this.setState({ id: id + 1 });
    });
    this.addEvent('click', '.js-decrease', () => {
      const { id } = this.state;
      this.setState({ id: id - 1 });
    });
  }

  render(): string {
    return `
    <div class='parent'>
      <h1>App</h1>
      <div class="js-go-page-1">go page 1</div>
      <a href='/2'>go page 2</a>
      <button class='js-increase'>id increase</button>
      <button class='js-decrease'>id decrease</button>
      <div>app state id: ${this.state.id}</div>
      <${this.$child.id} id=${this.state.id}></${this.$child.id}/>
    </div>
    `;
  }
}
