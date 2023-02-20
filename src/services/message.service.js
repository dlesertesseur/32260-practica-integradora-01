import MessageDao from "../dao/nomgoDb/message.dao.js";
import messageSchema from "../dao/models/message.model.js";

const messageDAO = new MessageDao("messages", messageSchema);

const findMessagesByEmail = async (id) => {
  const ret = await messageDAO.findAllByUserEmail(id);
  return ret;
};

const insertMessage = async (id) => {
  const ret = await messageDAO.insert(id);
  return ret;
};

const getAllMessages = async () => {
  const ret = await messageDAO.getAll();
  return ret;
};

export { findMessagesByEmail, insertMessage, getAllMessages };
