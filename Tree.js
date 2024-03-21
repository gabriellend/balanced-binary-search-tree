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

  return { getRoot, prettyPrint, insert };
};
