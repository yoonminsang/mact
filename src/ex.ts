import { Component } from './lib/mact/component';

class Ex extends Component<{ id: number }, { id: number }> {
  setup() {
    this.state = { id: 10 };
  }
  componentDidMount() {
    console.log('ex didmount');
    this.setState({ id: this.state.id + 1 });
  }
  template() {
    return `<div>
    ex id:${this.props.id}
    ex state id:${this.state.id}
    </div>`;
  }
}

export default Ex;
