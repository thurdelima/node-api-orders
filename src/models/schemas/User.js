import mongoose from 'mongoose';

let myId = mongoose.Types.ObjectId();

const UserSchema = new mongoose.Schema({
   profile: {
    name: {
        type: String
      },
  },
  email: {
     type: String,
     required: true,
     validate: {
        validator: async function(email) {
          const user = await this.constructor.findOne({ email });
          if(user) {
            if(this.id === user.id) {
              return true;
            }
            return false;
          }
          return true;
        },
        message: props => 'The specified email address is already in use.'
      },
      required: [true, 'User email required']
    
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

export default mongoose.model('User', UserSchema);
