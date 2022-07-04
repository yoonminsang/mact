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
  private get $newElement() {
    return this.parseHTML(this.render());
  }

  protected $components: IComponents = {};

  static ID = 0;
  public id = TAG + Component.ID;

  constructor(props: P) {
    Component.ID += 1;
    this.setup();
    this.props = props;
    this.$element = this.$newElement;
    this.componentDidMount();
    this.setEvents();
  }

  protected addComponent<PT = {}>(ComponentClass: new (props: PT) => Component, props: PT): Component {
    const newComponent: Component = new ComponentClass(props);
    this.$components[newComponent.id] = newComponent;
    return newComponent;
  }

  protected setEvents() {}

  public updateProps(id: string, props: TProps) {
    if (this.$components[id]) {
      this.$components[id].props = props;
      this.$components[id].update();
    }
  }

  protected setup() {}

  protected abstract render(): string;

  private update() {
    reconciliation(this.$element, this.$newElement);
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

  // TODO: 클래스로 분리??

  async replaceComponent($target: HTMLElement, id: string) {
    const nextProps: TProps = {};
    [...$target.attributes].forEach(({ name, value }) => {
      // @ts-ignore
      if (this.$components[id].props[name] === undefined) throw new Error(`check props, name: ${name} value: ${value}`);
      nextProps[name] = getJSONparse(value);
    });
    this.updateProps(id, nextProps);
    $target.replaceWith(this.$components[id].$element as HTMLElement);
  }

  private bfsForReplaceComponent($target: HTMLElement) {
    const $children = [...$target.children];
    const { nodeName } = $target;

    if (nodeName.startsWith('C-')) {
      this.replaceComponent($target, nodeName);
    }

    $children.forEach(($element) => {
      this.bfsForReplaceComponent($element as HTMLElement);
    });
  }

  private parseHTML(html: string): HTMLElement {
    const $target = document.createElement('div');
    $target.innerHTML = html;

    this.bfsForReplaceComponent($target);

    return $target.firstElementChild as HTMLElement;
  }
}
