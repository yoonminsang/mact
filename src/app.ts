import { Ex } from './ex';
import { Component } from './lib/mact2/component';

export default class App extends Component<{}, { id: number }> {
  $app!: HTMLElement;
  $ex!: Component;

  setup() {
    this.$app = document.getElementById('root') as HTMLElement;
    this.state = { id: 1 };
    this.$ex = this.addComponent(Ex, { id: this.state.id });
  }

  componentDidMount() {
    this.$app.append(this.$element);
  }

  setEvents() {
    (this.$element.querySelector('.js-increase') as HTMLElement).addEventListener('click', () => {
      this.setState({ id: this.state.id + 1 });
    });
  }

  render(): string {
    return `
    <div class='app'>
      <h1>App</h1>
      <button class='js-increase'>id 증가</button>
      <button class='js-decrease'>id 감소</button>
      <div>app state id: ${this.state.id}</div>
      ${this.$ex.html}
    </div>
    `;
  }
}
