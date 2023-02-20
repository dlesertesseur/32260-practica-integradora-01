import {
  getAll,
  findById,
  update,
  insert,
  remove,
} from "../controllers/product.controller.js";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/", getAll);

productRouter.get("/new", (req, res) => {
  res.render("newProduct", {});
});

productRouter.get("/:pid", findById);

productRouter.post("/", insert);

productRouter.put("/:pid", update);

productRouter.delete("/:pid", remove);

export default productRouter;
