const { Schema, model } = require("mongoose");

const serviceSchema = new Schema(
  {
    service: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    price: { type: String, required: true, trim: true },
    provider: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
  }
);

const Service = model("Service", serviceSchema);

module.exports = Service;
