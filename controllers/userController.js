import userService from "../services/userService.js";

async function index(req, res, next) {
  try {
    const users = await userService.getAllUsers();
    return res.json(users);
  } catch (error) {
    return res.json({ message: "error" });
  }
}

async function login(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await userService.authenticate(email, password);
    return res.status(200).send({
      status: 200,
      message: "success",
      user,
    });
  } catch (error) {
    let status = 404;
    let message = "user not found";
    if (error.message === "Invalid email or password") {
      status = 201;
      message = "incorrect password";
    }
    return res.status(status).send({
      status,
      message,
    });
  }
}

async function register(req, res, next) {
  const { firstName, lastName, username, gender, email, phone, password } =
    req.body;

  try {
    const newUser = await userService.createUser(
      firstName,
      lastName,
      username,
      gender,
      email,
      phone,
      password
    );
    return res.status(200).send({
      status: 200,
      message: "User Added Successfully!",
    });
  } catch (error) {
    let status = 500;
    let message = "An error occured when adding user!";
    if (error.code === 11000) {
      status = 201;
      message = "User already exists";
    }
    return res.status(status).send({
      status,
      message,
    });
  }
}

export default {
  index,
  login,
  register,
};
