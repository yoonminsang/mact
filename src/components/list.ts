import { Component } from '@/lib/mact';

export default class List extends Component<{}, { list: string[]; id: number }> {
  setup() {
    this.state = { list: ['item 1', 'item 2'], id: 2 };
  }
  setEvents() {
    this.addEvent('click', '.js-add-first-item', () => {
      const { list, id } = this.state;
      const nextId = id + 1;
      this.setState({ list: [`item ${nextId}`, ...list], id: nextId });
    });
    this.addEvent('click', '.js-add-last-item', () => {
      const { list, id } = this.state;
      const nextId = id + 1;
      this.setState({ list: [...list, `item ${nextId}`], id: nextId });
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
      <button class='js-add-first-item'>add first item</button>
      <button class='js-add-last-item'>add last item</button>
      <button class='js-remove-first-item'>remove first item</button>
      <button class='js-remove-last-item'>remove last item</button>  
      <ul>
        ${this.state.list.map((v) => `<li key="${v}">${v}</li>`).join('')}
      </ul>
    </div>
    `;
  }
}
