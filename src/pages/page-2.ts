import { Component } from '@/lib/mact';
import Parent from '@/components/parent';

export class Page2 extends Component {
  $parent!: Component;

  protected addComponents(): void {
    this.$parent = this.addComponent(Parent, {});
  }

  protected render(): string {
    return `
    <div>
      <h1>page2</h1>
      <${this.$parent.id}></${this.$parent.id}/>
    </div>`;
  }
}
