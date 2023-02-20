import {
  addProductToCard,
  removeProductFromCard,
  findCardById,
  getAllCards,
  insertCart,
} from "../services/cart.service.js";

const getAll = async (req, res) => {
  const ret = await getAllCards();
  res.send(ret);
};

const insert = async (req, res) => {
  let ret = null;
  ret = await insertCart(req.body);
  res.send(ret);
};

const findById = async (req, res) => {
  const cid = req.params.cid;
  const ret = await findCardById(cid);
  res.send(ret);
};

const addProduct = async (req, res) => {
  let ret = null;
  const cid = req.params.cid;
  const pid = req.params.pid;

  if (cid && pid) {
    ret = await addProductToCard(cid, pid);
  } else {
    res.status(400).send({ message: "Bad request" });
  }

  res.send(ret);
};

const removeProduct = async (req, res) => {
  let ret = null;
  const cid = req.params.cid;
  const pid = req.params.pid;

  if (cid && pid) {
    ret = await removeProductFromCard(cid, pid);
  } else {
    res.status(400).send({ message: "Bad request" });
  }

  res.send(ret);
};

export { getAll, findById, addProduct, removeProduct, insert };
