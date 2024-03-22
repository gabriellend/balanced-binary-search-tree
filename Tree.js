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
    root = deleteHelper(val, root);
  };

  const deleteHelper = (val, currentRoot) => {
    // Base case
    if (!currentRoot) {
      return currentRoot;
    }

    if (val < currentRoot.data) {
      currentRoot.leftChild = deleteHelper(val, currentRoot.leftChild);
      return currentRoot;
    } else if (val > currentRoot.data) {
      currentRoot.rightChild = deleteHelper(val, currentRoot.rightChild);
      return currentRoot;
    }

    // If we make it to this point, we've found a match
    // Handle one child
    if (!currentRoot.leftChild) {
      return currentRoot.rightChild;
    } else if (!currentRoot.rightChild) {
      return currentRoot.leftChild;
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
      return currentRoot;
    }
  };

  return { getRoot, prettyPrint, insert, deleteValue };
};
