import { Component } from '@/lib/mact';

import List from './list';

export default class Child extends Component<{ id: number }, { id: number }> {
  $list!: Component;

  setup() {
    this.state = { id: 1 };
  }

  addComponents() {
    this.$list = this.addComponent(List, {});
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
  render() {
    return `
    <div>
      <div>child props id : ${this.props.id}</div>
      <div>child state id : ${this.state.id}</div>
      <button class='js-increase'>child id increase</button>
      <button class='js-decrease'>child id decrease delegation</button>
      <${this.$list.id}></${this.$list.id}/>
    </div>
    `;
  }
}
