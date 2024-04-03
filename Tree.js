import { createNode } from "./Node.js";

export const createTree = (array) => {
  if (!array.length) {
    return null;
  }
  const sortedArray = array.sort((a, b) => a - b);
  const sortedUniqueArray = [...new Set(sortedArray)];

  let root = buildTree(0, sortedUniqueArray.length - 1);

  const getRoot = () => root;

  function buildTree(start, end) {
    if (start > end) {
      return null;
    }

    const midIndex = Math.floor((start + end) / 2);
    const root = createNode(sortedUniqueArray[midIndex]);
    root.leftChild = buildTree(start, midIndex - 1);
    root.rightChild = buildTree(midIndex + 1, end);

    return root;
  }

  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.rightChild !== null) {
      prettyPrint(
        node.rightChild,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.leftChild !== null) {
      prettyPrint(node.leftChild, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

  const insert = (val) => {
    root = insertHelper(val, root);
  };

  const insertHelper = (val, currentRoot) => {
    if (!currentRoot) {
      return createNode(val);
    }

    if (val < currentRoot.data) {
      currentRoot.leftChild = insertHelper(val, currentRoot.leftChild);
    } else if (val > currentRoot.data) {
      currentRoot.rightChild = insertHelper(val, currentRoot.rightChild);
    } else {
      throw Error("Insert failed: value already exists");
    }

    return currentRoot;
  };

  const deleteValue = (val) => {
    const [newRoot, wasDeleted] = deleteHelper(val, root);
    if (!wasDeleted) {
      throw Error("Delete failed: value not found");
    }

    root = newRoot;
  };

  const deleteHelper = (val, currentRoot) => {
    // Base case
    if (!currentRoot) {
      return [currentRoot, false];
    }

    let deleted = false;

    if (val < currentRoot.data) {
      let [newLeft, wasDeleted] = deleteHelper(val, currentRoot.leftChild);
      currentRoot.leftChild = newLeft;
      deleted = wasDeleted;
    } else if (val > currentRoot.data) {
      let [newRight, wasDeleted] = deleteHelper(val, currentRoot.rightChild);
      currentRoot.rightChild = newRight;
      deleted = wasDeleted;
    } else {
      // We've found a match
      deleted = true;

      // Handle one child
      if (!currentRoot.leftChild) {
        return [currentRoot.rightChild, true];
      } else if (!currentRoot.rightChild) {
        return [currentRoot.leftChild, true];
      } else {
        // Handle two children
        let parent = currentRoot;
        let successor = currentRoot.rightChild;
        while (successor.leftChild) {
          parent = successor;
          successor = successor.leftChild;
        }

        if (parent !== currentRoot) {
          parent.leftChild = successor.rightChild;
        } else {
          parent.rightChild = successor.rightChild;
        }

        currentRoot.data = successor.data;
      }
    }
    return [currentRoot, deleted];
  };

  const find = (val, currentRoot = root) => {
    if (currentRoot && val === currentRoot.data) {
      return currentRoot;
    } else if (!currentRoot) {
      return null;
    }

    if (val < currentRoot.data) {
      return find(val, currentRoot.leftChild);
    } else {
      return find(val, currentRoot.rightChild);
    }
  };

  const levelOrder = (cb, currentRoot = root) => {
    let queue = [currentRoot];
    let result = [];

    while (queue.length) {
      let currentNode = queue.shift();

      cb ? cb(currentNode) : result.push(currentNode.data);

      if (currentNode.leftChild) queue.push(currentNode.leftChild);
      if (currentNode.rightChild) queue.push(currentNode.rightChild);
    }

    if (!cb) return result;
  };

  const preOrder = (cb, currentRoot = root, result = []) => {
    if (!currentRoot) return;

    if (cb) cb(currentRoot);
    if (!cb) result.push(currentRoot.data);

    preOrder(cb, currentRoot.leftChild, result);
    preOrder(cb, currentRoot.rightChild, result);

    if (!cb) return result;
  };

  const inOrder = (cb, currentRoot = root, result = []) => {
    if (!currentRoot) return;

    inOrder(cb, currentRoot.leftChild, result);

    if (cb) cb(currentRoot);
    if (!cb) result.push(currentRoot.data);

    inOrder(cb, currentRoot.rightChild, result);

    if (!cb) return result;
  };

  const postOrder = (cb, currentRoot = root, result = []) => {
    if (!currentRoot) return;

    postOrder(cb, currentRoot.leftChild, result);
    postOrder(cb, currentRoot.rightChild, result);

    if (cb) cb(currentRoot);
    if (!cb) result.push(currentRoot.data);

    if (!cb) return result;
  };

  const height = (currentNode) => {
    if (!currentNode) {
      return -1;
    }

    let leftHeight = height(currentNode.leftChild);
    let rightHeight = height(currentNode.rightChild);

    return Math.max(leftHeight, rightHeight) + 1;
  };

  const depth = (targetNode, currentRoot = root, currentDepth = 0) => {
    if (currentRoot === null) {
      return -1;
    }
    if (currentRoot.data === targetNode.data) {
      return currentDepth;
    } else if (targetNode.data < currentRoot.data) {
      return depth(targetNode, currentRoot.leftChild, currentDepth + 1);
    } else {
      return depth(targetNode, currentRoot.rightChild, currentDepth + 1);
    }
  };

  function isBalanced(node = root) {
    function checkHeight(node) {
      if (node === null) return 0;

      let leftHeight = checkHeight(node.leftChild);
      if (leftHeight === -1) return -1;

      let rightHeight = checkHeight(node.rightChild);
      if (rightHeight === -1) return -1;

      if (Math.abs(leftHeight - rightHeight) > 1) return -1;

      return Math.max(leftHeight, rightHeight) + 1;
    }

    return checkHeight(node) !== -1;
  }

  return {
    getRoot,
    prettyPrint,
    insert,
    deleteValue,
    find,
    levelOrder,
    preOrder,
    inOrder,
    postOrder,
    height,
    depth,
    isBalanced,
  };
};
