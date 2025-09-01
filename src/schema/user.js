import bcrypt from 'bcrypt';
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is Required'],
      unique: true , 
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        'Please fill a valid email address'
      ]
    },

    password: {
      type: String,
      required: [true, 'Password is Required']
    },

    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true , 
      match: [
        /^[a-zA-Z0-9_]+$/,
        'Username can only contain letters, numbers, and underscores'
      ]
    },

    avatar: {
      type: String
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function saveUser(next) {
  const user = this;
  const SALT = bcrypt.genSaltSync(9);
  const hashedPass = bcrypt.hashSync(user.password, SALT);
  user.password = hashedPass;
  user.avatar = `https://robohash.org/${user.username}`;
  next();
});

const User = mongoose.model('User', userSchema);
export default User;
