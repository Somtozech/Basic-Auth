const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      required: [true, 'Username is required']
    },
    firstname: { type: String, required: true, lowercase: true },
    lastname: { type: String, required: true, lowercase: true },
    email: {
      type: String,
      lowercase: true,
      required: [true, 'Email is required'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Password is required']
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      lowercase: true,
      default: 'user'
    }
  },
  { timestamps: true }
);

// hash password before saving user
userSchema.pre('save', function(next) {
  const saltRounds = 10;
  bcrypt
    .hash(this.password, saltRounds)
    .then(hash => {
      this.password = hash;
      next();
    })
    .catch(err => next(err));
});

userSchema.methods.comparePassword = async function(plainPassword) {
  const match = await bcrypt.compare(plainPassword, this.password);
  return match;
};

module.exports = mongoose.model('User', userSchema);
