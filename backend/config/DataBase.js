import mongoose  from "mongoose";
export const DataBase = () => {
  try {
    mongoose.connect(process.env.MONGO_URL);
    console.log("data base is connected ");
  } catch (err) {
    console.log("database is not connected ");
  }
};

// module.exports = { DataBase };
