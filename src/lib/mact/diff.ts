type THash = Record<string, HTMLElement>;

const updateByKey = ($originEl: HTMLElement, $newEl: HTMLElement) => {
  const $originEls = [...$originEl.children] as HTMLElement[];
  const $newEls = [...$newEl.children] as HTMLElement[];

  const originKeyObj: THash = {};
  const originNodeOrders: string[] = [];
  $originEls.forEach((originNode) => {
    const key = originNode.getAttribute('key');
    if (!key) throw new Error('key is not defined');
    originKeyObj[key] = originNode;
    originNodeOrders.push(key);
  });

  const newKeyObj: THash = {};
  const newNodeOrders: string[] = [];
  $newEls.forEach((newNode) => {
    const key = newNode.getAttribute('key');
    if (!key) throw new Error('key is not defined');
    newKeyObj[key] = newNode;
    newNodeOrders.push(key);
  });

  originNodeOrders.forEach((key) => {
    const originEl = originKeyObj[key];
    const newEl = newKeyObj[key];
    if (!newEl) {
      originEl.remove();
    }
  });

  newNodeOrders.forEach((key, index) => {
    const originEl = originKeyObj[key];
    const newEl = newKeyObj[key];
    if (!originEl) {
      return $originEl.insertBefore(newEl, $originEl.children[index]);
    }
    updateNode($originEl, originEl, newEl);
  });
};

const updateAttributes = ($originNode: HTMLElement, $newNode: HTMLElement) => {
  [...$newNode.attributes].forEach(({ name, value }) => {
    if (value === $originNode.getAttribute(name)) return;
    $originNode.setAttribute(name, value);
  });
  [...$originNode.attributes].forEach(({ name }) => {
    if ($newNode.hasAttribute(name)) return;
    $originNode.removeAttribute(name);
  });
};

function updateNode($target: HTMLElement, $originNode: ChildNode, $newNode: ChildNode) {
  // Remove origin node
  if ($originNode && !$newNode) return $originNode.remove();

  // Add new node
  if (!$originNode && $newNode) return $target.appendChild($newNode);

  // Change Text node
  if ($originNode instanceof Text && $newNode instanceof Text) {
    if ($originNode.nodeValue === $newNode.nodeValue) return;
    $originNode.nodeValue = $newNode.nodeValue;
    return;
  }

  // Replace html tag
  if ($originNode.nodeName !== $newNode.nodeName) {
    return $target.replaceChild($newNode, $originNode);
  }

  const $originEl = $originNode as HTMLElement;
  const $newEl = $newNode as HTMLElement;

  // Update Attributes
  updateAttributes($originEl, $newEl);

  if (
    ($originNode as HTMLElement).firstElementChild?.getAttribute('key') &&
    ($newNode as HTMLElement).firstElementChild?.getAttribute('key')
  ) {
    return updateByKey($originEl, $newEl);
  }

  // Recursion updateNode
  const $originNodes = [...$originEl.childNodes];
  const $newNodes = [...$newEl.childNodes];
  const max = Math.max($originNodes.length, $newNodes.length);
  for (let i = 0; i < max; i++) {
    updateNode($target, $originNodes[i], $newNodes[i]);
  }
}

export const reconciliation = ($originEl: HTMLElement, $newEl: HTMLElement) => {
  const $originNodes = [...$originEl.childNodes];
  const $newNodes = [...$newEl.childNodes];
  const max = Math.max($originNodes.length, $newNodes.length);
  for (let i = 0; i < max; i++) {
    updateNode($originEl, $originNodes[i], $newNodes[i]);
  }
};
