import { Component } from '@/lib/mact';

import Child from './child';

export default class App extends Component<{}, { id: number }> {
  $child!: Component;

  setup() {
    this.state = { id: 1 };
  }

  addComponents() {
    this.$child = this.addComponent(Child, { id: this.state.id });
  }

  setEvents() {
    this.addEvent('click', '.js-increase', () => {
      const { id } = this.state;
      this.setState({ id: id + 1 });
    });
    this.addEventDelegation('click', '.js-decrease', () => {
      const { id } = this.state;
      this.setState({ id: id - 1 });
    });
  }

  render(): string {
    return `
    <div class='app'>
      <h1>App</h1>
      <button class='js-increase'>id increase</button>
      <button class='js-decrease'>id decrease</button>
      <div>app state id: ${this.state.id}</div>
      <${this.$child.id} id=${this.state.id}></${this.$child.id}/>
    </div>
    `;
  }
}
