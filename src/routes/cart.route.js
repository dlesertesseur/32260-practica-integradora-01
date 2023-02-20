import {
  addProduct,
  removeProduct,
  findById,
  insert,
  getAll,
} from "../controllers/cart.controller.js";
import { Router } from "express";

const cartRoute = Router();

cartRoute.get("/", getAll);

cartRoute.get("/:cid", findById);

cartRoute.post("/", insert);

cartRoute.post("/:cid/product/:pid", addProduct);

cartRoute.delete("/:cid/product/:pid", removeProduct);

export default cartRoute;
