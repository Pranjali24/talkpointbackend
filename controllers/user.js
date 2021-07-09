exports.registrationUser=(req, res) => {
    let newUser = new User(req.body);
    newUser
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User Created Successfully !",
        });
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({
          message: "Email Id already in used !",
        });
      });
  }