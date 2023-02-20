import * as dotenv from "dotenv";
import express from 'express';
import cartRoute from "./src/routes/cart.route.js";
import productRouter from "./src/routes/products.route.js";
import messageRouter from "./src/routes/message.route.js";
import hbs from 'express-handlebars';
import { Server } from "socket.io";
import { getAllMessages } from "./src/services/message.service.js";

dotenv.config();
const PORT = process.env.HTTP_PORT || 8080;

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));

app.engine("handlebars", hbs.engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use('/carts', cartRoute);
app.use('/products', productRouter);
app.use('/', messageRouter);

const httpServer = app.listen(PORT, () => {
  console.log(`Server running on port: ${httpServer.address().port}`);
});
httpServer.on("error", (error) => console.log(error));

/*Socket.io config*/
const io = new Server(httpServer);

io.on("connection", async (socket) => {
  console.log("cliente conectado id:", socket.id);
  
  const messages =  await getAllMessages();
  io.sockets.emit("messages", messages);
});

export {io}
