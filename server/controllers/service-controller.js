const Service = require("../models/service-model");

const services = async (req, res, next) => {
  try {
    const data = await Service.find();

    if (!data || data.length === 0) {
      //handle the case where no document was found
      res.status(404).json({ msg: "No service data fond" });
    }

    res.status(200).json({ servicesData: data });
  } catch (error) {
    console.error("Services Error:", error);
    next(error);
  }
};

module.exports = services;
