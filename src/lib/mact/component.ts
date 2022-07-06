import { reconciliation } from './diff';
import { getJSONparse } from './helper';

const TAG = 'C-';

interface IComponents {
  [key: string]: Component;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TProps = Record<string, any>;

export abstract class Component<P extends {} = {}, S extends {} = {}> {
  protected props: P;
  protected state!: S;

  public $element: HTMLElement;
  private getNewElement(isInit?: boolean) {
    return this.parseHTML(this.render(), isInit);
  }

  private $components: IComponents = {};

  static ID = 0;
  public id = TAG + Component.ID;

  constructor(props: P) {
    Component.ID += 1;
    this.setup();
    this.addComponents();
    this.props = props;
    this.$element = this.getNewElement(true);
    this.componentDidMount();
    this.setEvents();
  }

  protected addComponents() {}

  protected addComponent<PT = {}>(ComponentClass: new (props: PT) => Component, props: PT): Component {
    const newComponent: Component = new ComponentClass(props);
    this.$components[newComponent.id] = newComponent;
    return newComponent;
  }

  protected setEvents() {}

  protected addEvent(eventType: keyof DocumentEventMap, selector: string, callback: (e: Event) => void) {
    this.$element.querySelector(selector)?.addEventListener(eventType, callback);
  }

  protected addEventDelegation(eventType: keyof DocumentEventMap, selector: string, callback: (e: Event) => void) {
    const children = [...this.$element.querySelectorAll(selector)];
    const isTarget = (target: HTMLElement) => children.includes(target) || target.closest(selector);
    this.$element.addEventListener(eventType, (e) => {
      if (!isTarget(e.target as HTMLElement)) return false;
      callback(e);
    });
  }

  protected setup() {}

  protected abstract render(): string;

  private update() {
    reconciliation(this.$element, this.getNewElement());
  }

  protected setState<K extends keyof S>(newState: Pick<S, K> | S | null, callback?: Function) {
    this.componentDidUpdate({ ...this.state }, { ...this.state, ...newState });
    this.state = { ...this.state, ...newState };
    this.update();
    callback?.();
  }

  protected componentDidMount() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(state: S, nextState: S) {}

  private updateProps(id: string, props: TProps) {
    if (this.$components[id]) {
      this.$components[id].props = props;
      this.$components[id].update();
    }
  }

  private async replaceComponent($target: HTMLElement, id: string, isInit?: boolean) {
    const nextProps: TProps = {};
    [...$target.attributes].forEach(({ name, value }) => {
      // @ts-ignore
      if (this.$components[id].props[name] === undefined) throw new Error(`check props, name: ${name} value: ${value}`);
      nextProps[name] = getJSONparse(value);
    });
    this.updateProps(id, nextProps);
    const el = isInit
      ? (this.$components[id].$element as HTMLElement)
      : (this.$components[id].$element as HTMLElement).cloneNode(true);
    $target.replaceWith(el);
  }

  private bfsForReplaceComponent($target: HTMLElement, isInit?: boolean) {
    const $children = [...$target.children];
    const { nodeName } = $target;

    if (nodeName.startsWith('C-')) {
      this.replaceComponent($target, nodeName, isInit);
    }

    $children.forEach(($el) => {
      this.bfsForReplaceComponent($el as HTMLElement, isInit);
    });
  }

  private parseHTML(html: string, isInit?: boolean): HTMLElement {
    const $target = document.createElement('div');
    $target.innerHTML = html;

    this.bfsForReplaceComponent($target, isInit);

    return $target.firstElementChild as HTMLElement;
  }
}
