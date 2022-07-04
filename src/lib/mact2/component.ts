// eslint-disable-next-line import/no-cycle
import { parseHTML } from './parseHTML';
import { reconciliation } from './diff';

const TAG = 'C-';

export interface IComponents {
  [key: string]: Component;
}

export abstract class Component<P extends {} = {}, S extends {} = {}> {
  protected props: P;
  protected state!: S;

  public $element: HTMLElement;
  private get $newElement() {
    return parseHTML(this.render(), this.$components);
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

  updateProps(id: string, props: P) {
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
    console.log('setstate this', this);
    this.componentDidUpdate({ ...this.state }, { ...this.state, ...newState });
    this.state = { ...this.state, ...newState };
    this.update();
    callback?.();
  }

  protected componentDidMount() {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected componentDidUpdate(state: S, nextState: S) {}

  public get html() {
    return `<${this.id}></${this.id}>`;
  }
}
