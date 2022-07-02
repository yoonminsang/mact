import { updateElement } from './helper';

export abstract class Component<P extends {} = {}, S extends {} = {}> {
  $target: HTMLElement;
  props: P;
  state!: S;

  constructor($target: HTMLElement, props: P) {
    this.$target = $target;
    this.props = props;
    this.setup();
    this.render();
    this.componentDidMount();
    this.setEvent();
  }

  protected setup() {}

  protected template() {
    return '';
  }

  private render() {
    const newNode = this.$target.cloneNode(true) as HTMLElement;
    newNode.innerHTML = this.template();

    const oldChildNodes = [...this.$target.childNodes];
    const newChildNodes = [...newNode.childNodes];
    const max = Math.max(oldChildNodes.length, newChildNodes.length);
    for (let i = 0; i < max; i++) {
      updateElement(this.$target, newChildNodes[i], oldChildNodes[i]);
    }

    this.appendComponent(this.$target);
  }

  protected setState<K extends keyof S>(newState: Pick<S, K> | S | null, callback?: Function) {
    this.componentDidUpdate({ ...this.state }, { ...this.state, ...newState });
    this.state = { ...this.state, ...newState };
    this.render();
    callback?.();
  }

  protected setEvent() {}

  protected addEvent(eventType: keyof DocumentEventMap, selector: string, callback: Function) {
    const children = [...this.$target.querySelectorAll(selector)];
    const isTarget = (target: HTMLElement) => children.includes(target) || target.closest(selector);
    this.$target.addEventListener(eventType, (event) => {
      if (!isTarget(event.target as HTMLElement)) return false;
      callback(event);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected appendComponent(target: HTMLElement) {}

  protected componentDidMount() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(state: S, nextState: S) {}
}
