import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export default async () => {
  try {
    const URI = `mongodb+srv://${process.env.dbUser}:${process.env.dbPassword}@${process.env.dbCluster}.${process.env.mongoId}.mongodb.net/${process.env.dbName}?retryWrites=true&w=majority`;
    const conn = await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected : ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
