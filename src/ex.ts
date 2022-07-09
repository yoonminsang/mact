import { Component } from './lib/mact/component';
import { List } from './list';

export class Ex extends Component<{ id: number }, { id: number }> {
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
      <div>ex props id : ${this.props.id}</div>
      <div>ex state id : ${this.state.id}</div>
      <button class='js-increase'>id 증가</button>
      <button class='js-decrease'>id 감소</button>
      <${this.$list.id}></${this.$list.id}/>
    </div>
    `;
  }
}
