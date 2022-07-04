import { Component } from './lib/mact/component';

export class Ex extends Component<{ id: number }, { id: number }> {
  setup() {
    this.state = { id: 1 };
  }
  setEvents() {
    (this.$element.querySelector('.js-increase') as HTMLElement).addEventListener('click', () => {
      this.setState({ id: this.state.id + 1 });
    });
    (this.$element.querySelector('.js-decrease') as HTMLElement).addEventListener('click', () => {
      this.setState({ id: this.state.id - 1 });
    });
  }
  render() {
    return `
    <div>
      <div>ex props id : ${this.props.id}</div>
      <div>ex state id : ${this.state.id}</div>
      <button class='js-increase'>id 증가</button>
      <button class='js-decrease'>id 감소</button>
    </div>
    `;
  }
}
