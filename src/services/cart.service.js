import CartDao from "../dao/nomgoDb/cart.dao.js"
import cartSchema from "../dao/models/cart.model.js";

const cartDAO = new CartDao("carts", cartSchema);

const getAllCards = async () => {
  const ret = await cartDAO.getAll();
  return ret;
};

const findCardById = async (id) => {
  const ret = await cartDAO.findById(id);
  return ret;
};

const insertCart = async (id) => {
  const ret = await cartDAO.insert(id);
  return ret;
};

const addProductToCard = async (cid, pid) => {
  const ret = await cartDAO.addProduct(cid, pid);
  return ret;
};

const removeProductFromCard = async (cid, pid) => {
  const ret = await cartDAO.removeProduct(cid, pid);
  return ret;
};

export { getAllCards, findCardById, addProductToCard, removeProductFromCard, insertCart };
