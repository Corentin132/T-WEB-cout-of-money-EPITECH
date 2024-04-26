import express from "express";
import authenticateToken from "../middleware/authenticate";
import { UsersController } from "../controllers/users.controller";

const router = express.Router();
const usersController = new UsersController();

router.post("/user/register", async (req, res) => {
  try {
    const user = await usersController.register(req.body);
    res.json("User created successfully");
  } catch (error: any) {
    res.status(400);
    res.json({ message: error.message });
  }
});

router.post("/user/login", async (req, res) => {
  try {
    const token = await usersController.login(req.body);
    res.json({ message: "User logged in successfully", token });
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/update_user", authenticateToken, async (req, res) => {
  try {
    const answer = await usersController.updateUser(req.body, req.user);
    res.json(answer);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/create_admin", authenticateToken, async (req, res) => {
  try {
    const answer = await usersController.createAdmin(req.body, req.user);
    res.json(answer);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.post("/user/delete_user", authenticateToken, async (req, res) => {
  try {
    const answer = await usersController.deleteUser(req.body, req.user);
    res.json(answer);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/user/info", authenticateToken, async (req, res) => {
  try {
    const answer = await usersController.getUserInfo(req.user);
    res.json(answer);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.get("/user/all_users", authenticateToken, async (req, res) => {
  try {
    const answer = await usersController.getAllUsers(req.user);
    res.json(answer);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
