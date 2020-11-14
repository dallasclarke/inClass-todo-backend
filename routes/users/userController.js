var bcrypt = require("bcryptjs");
var User = require("./User");

module.exports = {
  createUser: async (req, res) => {
    console.log(req.body);

    try {
      let genSalt = await bcrypt.genSalt(12);
      let hashedPassword = await bcrypt.hash(req.body.password, genSalt);

      let createdUser = new User({
        email: req.body.email,
        password: hashedPassword,
      });

      await createdUser.save();

      res.json({
        message: "User created",
      });
    } catch (e) {
      console.log(e);
      console.log(e.code);
      console.log(e.message);

      if (e.code === 11000) {
        res.status(409).json({
          message: "Email is duplicate",
        });
      } else {
        res.status(500).json({
          message: "Something went wrong",
        });
      }
    }
  },
};
