import { Component } from '@/lib/mact';
import { RouterState } from '@/lib/router/router-context';
import { useHistory, useSearchParams } from '@/lib/router/router-hook';
import Parent from '@/components/parent';

export class Page1 extends Component {
  $parent!: Component;
  history!: RouterState;

  setup() {
    this.state = { id: 1 };
    this.history = useHistory();
  }

  protected addComponents(): void {
    this.$parent = this.addComponent(Parent, {});
  }

  protected componentDidMount(): void {
    const [searchParams, setSearchParams] = useSearchParams();
    searchParams.set('id', '10');
    searchParams.set('hi', '123');
    setSearchParams(searchParams);
  }

  protected render(): string {
    return `
    <div>
      <h1>page1</h1>
      <${this.$parent.id}></${this.$parent.id}/>
    </div>`;
  }
}
