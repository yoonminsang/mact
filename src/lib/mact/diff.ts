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

const updateNode = ($target: HTMLElement, $originNode: ChildNode, $newNode: ChildNode) => {
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
    $target.replaceChild($newNode, $originNode);
    return;
  }

  // Update Attributes
  updateAttributes($originNode as HTMLElement, $newNode as HTMLElement);

  const $originNodes = [...$originNode.childNodes];
  const $newNodes = [...$newNode.childNodes];
  const max = Math.max($originNodes.length, $newNodes.length);
  for (let i = 0; i < max; i++) {
    updateNode($target, $originNodes[i], $newNodes[i]);
  }
};

export const reconciliation = ($originElement: HTMLElement, $newElement: HTMLElement) => {
  const $originNodes = [...$originElement.childNodes];
  const $newNodes = [...$newElement.childNodes];
  const max = Math.max($originNodes.length, $newNodes.length);
  for (let i = 0; i < max; i++) {
    updateNode($originElement, $originNodes[i], $newNodes[i]);
  }
};
