/* eslint-disable no-param-reassign */

const checkAttributes = (oldNode: HTMLElement, newNode: HTMLElement) => {
  const oldAttributes = [...oldNode.attributes];
  const newAttributes = [...newNode.attributes];
  if (oldAttributes.length !== newAttributes.length) return false;
  for (let i = 0; i < oldAttributes.length; i++) {
    if (newNode.getAttribute(oldAttributes[i].name) !== oldNode.getAttribute(newAttributes[i].name)) return false;
  }
  return true;
};

const updateAttributes = (oldNode: HTMLElement, newNode: HTMLElement) => {
  [...newNode.attributes].forEach(({ name, value }) => {
    if (value === oldNode.getAttribute(name)) return;
    oldNode.setAttribute(name, value);
  });
  [...oldNode.attributes].forEach(({ name }) => {
    if (newNode.hasAttribute(name)) return;
    oldNode.removeAttribute(name);
  });
};

export const updateElement = (parent: HTMLElement, newNode: ChildNode, oldNode: ChildNode) => {
  // 하위 컴포넌트는 하위 컴포넌트에서 비교(component라는 attribute가 있으면 비교하지 않는다)
  if (
    oldNode instanceof HTMLElement &&
    oldNode.getAttribute('component') === '' &&
    newNode instanceof HTMLElement &&
    newNode.getAttribute('component') === '' &&
    checkAttributes(oldNode, newNode) &&
    oldNode.nodeName === newNode.nodeName
  ) {
    return;
  }

  // paret가 component attribute를 가지고 있고 newNode가 없다면 아직 appendComponent가 실행되지 않은 경우이다.
  // appendComponent를 실행한 후에 update한다.
  if (parent.getAttribute('component') === '' && !newNode && parent.childElementCount === 0) return;

  // oldNode만 존재하면 remove, newNode만 존재하면 append
  if (!newNode && oldNode) return parent.removeChild(oldNode);
  if (newNode && !oldNode) return parent.appendChild(newNode);

  // oldNode와 newNode가 텍스트 노드인경우 교체
  if (newNode instanceof Text && oldNode instanceof Text) {
    if (oldNode.nodeValue === newNode.nodeValue) return;
    oldNode.nodeValue = newNode.nodeValue;
    return;
  }

  // html tag가 바뀔경우 전체를 replace
  if (newNode.nodeName !== oldNode.nodeName) {
    parent.replaceChild(newNode, oldNode);
    return;
  }

  if (!(newNode instanceof HTMLElement && oldNode instanceof HTMLElement)) throw new Error('update error');

  // attributes 변경
  updateAttributes(oldNode, newNode);

  const newChildNodes = [...newNode.childNodes];
  const oldChildNodes = [...oldNode.childNodes];
  const max = Math.max(newChildNodes.length, oldChildNodes.length);
  for (let i = 0; i < max; i++) {
    updateElement(oldNode, newChildNodes[i], oldChildNodes[i]);
  }
};
