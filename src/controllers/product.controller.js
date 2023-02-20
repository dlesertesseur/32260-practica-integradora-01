import {
  getAllProducts,
  findProductById,
  insertProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service.js";

const getAll = async (req, res) => {
  const limit = req.query.limit;
  const products = await getAllProducts(limit);
  res.render("home", {products});
};

const findById = async (req, res) => {
  const pid = req.params.pid;
  const ret = await findProductById(pid);
  res.send(ret);
};

const insert = async (req, res) => {
  let ret = null;
  ret = await insertProduct(req.body);
  res.send(ret);
};

const update = async (req, res) => {
  let ret = null;
  const pid = req.params.pid;

  if (pid) {
    ret = await updateProduct(pid, req.body);
  } else {
    res.status(400).send({ message: "Bad request" });
  }

  res.send(ret);
};

const remove = async (req, res) => {
  let ret = null;

  const pid = req.params.pid;

  if (pid) {
    ret = await deleteProduct(pid);
  } else {
    res.status(400).send({ message: "Bad request" });
  }

  res.send(ret);
};
export { getAll, findById, update, insert, remove };
