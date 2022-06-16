import 'dotenv/config';
import Mongoose from 'mongoose';






class Database {
    constructor() {
      
      this.mongo();
    }
  
  
  
    mongo() {
      this.mongoConnection = Mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        //useFindAndModify: true,
      }, err => {
          if(err) throw err;
          console.log('Connected to MongoDB!!!');
      });
    }
  }
  
  export default new Database();
  