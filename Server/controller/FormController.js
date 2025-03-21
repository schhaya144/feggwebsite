const User = require('../model/FormModel');

const formdataget = async (req, res) => {
  console.log(req.body);

  try {
    const { name, number } = req.body;
    const formdata = new User({ name, number });
    await formdata.save();
    console.log(formdata);
    res.send(formdata);
  } catch (error) {
    console.log('error', error);
  }
};

module.exports = { formdataget };
