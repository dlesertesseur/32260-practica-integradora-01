import { io } from "../../app.js";
import {findMessagesByEmail, getAllMessages, insertMessage} from "../services/message.service.js"

const insert = async (req, res) => {
  let ret = null;
  ret = await insertMessage(req.body);

  /*WebSocket message*/
  const messages =  await getAllMessages();
  io.sockets.emit("messages", messages);

  res.send(ret);

};

const getAll = async (req, res) => {
  const ret = await getAllMessages();
  res.send(ret);
}

const findByEmail = async (req, res) => {
  const cid = req.params.cid;
  const ret = await findMessagesByEmail(cid);
  res.send(ret);
}

export { findByEmail, insert, getAll };
