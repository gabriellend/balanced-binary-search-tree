import { createTree } from "./Tree.js";

const tree = createTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
const root = tree.getRoot();

tree.prettyPrint(root);
