import { createTree } from "./Tree.js";

const generateRandNumArray = () => {
  const min = 1;
  const max = 100;
  let randArray = [];
  for (let i = 0; i < 15; i++) {
    randArray.push(Math.floor(Math.random() * (max - min) + min));
  }

  return randArray;
};

const randNums = generateRandNumArray();
const tree = createTree(randNums);
if (!tree) {
  throw Error("Tree not created. Is your array empty?");
}

const root = tree.getRoot();
tree.prettyPrint(root);
console.log("\nIS BALANCED?", tree.isBalanced());

console.log("\nLEVEL ORDER:", tree.levelOrder());
console.log("\nPRE ORDER:", tree.preOrder());
console.log("\nPOST ORDER:", tree.postOrder());
console.log("\nIN ORDER:", tree.inOrder());

tree.insert(132);
tree.insert(517);
tree.insert(107);
tree.prettyPrint(root);
console.log("\nIS BALANCED AFTER ADDING VALUES?", tree.isBalanced());

//tree.rebalance();
// console.log("\nIS BALANCED AFTER ADDING REBALANCE?", tree.isBalanced());
// console.log("\nLEVEL ORDER:", tree.levelOrder());
// console.log("\nPRE ORDER:", tree.preOrder());
// console.log("\nPOST ORDER:", tree.postOrder());
// console.log("\nIN ORDER:", tree.inOrder());
