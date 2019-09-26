import mongoose from 'mongoose';

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  userName: String,
  email: [{}],
  photo: [{ value: String }]
});

mongoose.model('users', userSchema); // want to create a new collection called (users)

export default userSchema;
