import mongoose from "mongoose";
import * as dotenv from "dotenv";

dotenv.config();
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.MONGO_DB_CONNECTION,
  { dbName: "ecommerce" },
  (error) => {
    if (error) {
      console.log("Cannot connect to db");
      process.exit();
    }
  }
);

class CartDao {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      let ret = await this.collection.find();
      return ret;
    } catch (error) {
      console.log(error);
    }
  }

  async findById(id) {
    try {
      let ret = await this.collection.findById(id);
      return ret;
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(cid, pid) {
    try {
      let cat = await this.collection.findById(cid);
      
      cat.products.push(pid);

      let ret = await this.collection.findOneAndUpdate({ _id: cid }, cat, {
        new: true,
      });

      return ret;
    } catch (error) {
      console.log(error);
    }
  }

  async removeProduct(cid, pid) {
    try {
      let cat = await this.collection.findById(cid);
      
      let index = cat.products.indexOf(pid);
      if (index > -1) {
        cat.products.splice(index, 1);
      };

      let ret = await this.collection.findOneAndUpdate({ _id: cid }, cat, {
        new: true,
      });

      return ret;
    } catch (error) {
      console.log(error);
    }
  }

  async insert(cart) {
    try {
      let ret = await this.collection.create(cart);
      return ret;
    } catch (error) {
      console.log(error);
    }
  }
}

export default CartDao;
