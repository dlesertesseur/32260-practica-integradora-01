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

class MessageDao {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema);
  }

  async getAll() {
    try {
      let ret = await this.collection.find().lean();
      return ret;
    } catch (error) {
      console.log(error);
    }
  }

  async findAllByUserEmail(email) {
    try {
      let ret = await this.collection.find({ user: email });
      return ret;
    } catch (error) {
      console.log(error);
    }
  }

  async insert(message) {
    try {
      let ret = await this.collection.create(message);
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

export default MessageDao;
