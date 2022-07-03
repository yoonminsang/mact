import Ex from './ex';
import { Component } from './lib/mact/component';

interface State {
  id: number;
  nickname: string;
}

class App extends Component<{}, State> {
  setup() {
    this.state = { id: 1, nickname: 'minsang' };
  }

  componentDidMount() {
    console.log('app didmount');
  }

  appendComponent() {
    const $ex = this.$target.querySelector('.ex') as HTMLElement;
    new Ex($ex, { id: this.state.id });
  }

  setEvent() {
    this.addEvent('click', '.js-btn', () => {
      this.setState({ id: this.state.id + 1 });
    });
  }

  template() {
    const { id, nickname } = this.state;
    return `
    <div>
      <button class='js-btn'>increase id</button>
      <div class=${id}>id:${id}</div>
      <div>nickname:${nickname}</div>
      <div class='ex' component></div>
    </div>
    `;
  }
}

export default App;
