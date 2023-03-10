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

class ProductDao {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll(limit) {
    let ret = null;
    
    try {
      if (limit) {
        ret = await this.collection.find({}).limit(limit).lean();
      } else {
        ret = await this.collection.find().lean();
      }
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

  async insert(product) {
    try {
      let ret = await this.collection.create(product);
      return ret;
    } catch (error) {
      console.log(error);
    }
  }

  async update(id, product) {
    try {
      let ret = await this.collection.findOneAndUpdate({ _id: id }, product, {
        new: true,
      });
      return ret;
    } catch (error) {
      console.log(error);
    }
  }

  async delete(id) {
    try {
      let ret = await this.collection.deleteOne({ _id: id });
      return ret;
    } catch (error) {
      console.log(error);
    }
  }
}

export default ProductDao;
