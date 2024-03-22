import { createTree } from "./Tree.js";

const tree = createTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
if (!tree) {
  throw Error("Tree not created. Is your array empty?");
}

const root = tree.getRoot();
tree.prettyPrint(root);
console.log("INSERTING 100");
tree.insert(100);
tree.prettyPrint(root);

console.log("DELETING 100");
tree.deleteValue(100);
tree.prettyPrint(root);

console.log("DELETING 67");
tree.deleteValue(67);
tree.prettyPrint(root);
