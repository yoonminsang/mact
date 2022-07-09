import { Component } from './lib/mact/component';

export class List extends Component<{}, { list: string[]; id: number }> {
  setup() {
    this.state = { list: ['아이템 1', '아이템 2'], id: 2 };
  }
  setEvents() {
    this.addEvent('click', '.js-add-first-item', () => {
      const { list, id } = this.state;
      const nextId = id + 1;
      this.setState({ list: [`아이템 ${nextId}`, ...list], id: nextId });
    });
    this.addEvent('click', '.js-add-last-item', () => {
      const { list, id } = this.state;
      const nextId = id + 1;
      this.setState({ list: [...list, `아이템 ${nextId}`], id: nextId });
    });
    this.addEvent('click', '.js-remove-first-item', () => {
      const { list } = this.state;
      const nextList = list.slice();
      nextList.shift();
      this.setState({ list: nextList });
    });
    this.addEvent('click', '.js-remove-last-item', () => {
      const { list } = this.state;
      const nextList = list.slice();
      nextList.pop();
      this.setState({ list: nextList });
    });
  }
  render() {
    return `
    <div>
      <button class='js-add-first-item'>첫번째 아이템 추가</button>
      <button class='js-add-last-item'>마지막 아이템 추가</button>
      <button class='js-remove-first-item'>첫번째 아이템 삭제</button>
      <button class='js-remove-last-item'>마지막 아이템 삭제</button>  
      <ul>
        ${this.state.list.map((v) => `<li key="${v}">${v}</li>`).join('')}
      </ul>
    </div>
    `;
  }
}
