import { Component } from './lib/mact2/component';

export class Ex extends Component<{ id: number }> {
  render() {
    return `
    <div>
      <div>ex props id : ${this.props.id}</div>
    </div>
    `;
  }
}
