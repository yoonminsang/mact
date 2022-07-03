// eslint-disable-next-line import/no-cycle
import { IComponents } from './component';

// TODO: 함수 두개를 나누는게 맞을까?? if문으로(C-) 분기쳐서 함수 호출하는게 맞을까?

const replaceComponent = ($target: HTMLElement, components: IComponents, key: string) => {
  $target.replaceWith(components[key].$element as HTMLElement);
};

const bfsForReplaceComponent = ($target: HTMLElement, components: IComponents) => {
  const $children = [...$target.children];
  const { nodeName } = $target;

  if (nodeName.startsWith('C-')) {
    replaceComponent($target, components, nodeName);
  }

  $children.forEach(($element) => {
    bfsForReplaceComponent($element as HTMLElement, components);
  });
};

export const parseHTML = (html: string, components: IComponents): HTMLElement => {
  const $target = document.createElement('div');
  $target.innerHTML = html;

  bfsForReplaceComponent($target, components);

  return ($target.firstElementChild ?? $target) as HTMLElement;
};
