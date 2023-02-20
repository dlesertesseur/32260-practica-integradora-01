import { Router } from "express";
import { findByEmail, getAll, insert } from "../controllers/message.controller.js";

const messageRouter = Router();

messageRouter.get("/", async (req, res) => {
  try {
    res.render("chat");
  } catch (error) {
    res.send({ status: "error", error: error.message });
  }
});

messageRouter.get("/messages", getAll);

messageRouter.get("/:email", findByEmail);

messageRouter.post("/messages", insert);


export default messageRouter;
