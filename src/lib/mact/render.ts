import Component from './component';

const render = (app: Component, root: HTMLElement) => {
  root.appendChild(app.$el);
};

export default render;
