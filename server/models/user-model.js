const {Schema,model} = require("mongoose")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//User schema
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
},{
    timestamps: true, // createdAt, updatedAt
  }
);

//secure password with bcrypt //hashing
UserSchema.pre("save", async function (next) {
  // const user = this;

  // if (!user.isModified("password")) {
  //   next();
  // }

  // if password field not modified, skip hashing
  if (!this.isModified("password")) return next();

  try {
    const saltRound = await bcrypt.genSalt(10);
    const hash_password = await bcrypt.hash(this.password, saltRound);
    this.password = hash_password;
     return next();
  } catch (error) {
    next(error);
  }
});

//compare password with bcrypt
UserSchema.methods.comparePassword = function (currentPassword) {
  return bcrypt.compare(currentPassword, this.password);
};

//generate web token (JWT)
UserSchema.methods.generateWebToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );
  } catch (error) {
    console.error(error);
  }
};

//Model --> connects schema to collection
const User = new model("User", UserSchema);

module.exports = User;
