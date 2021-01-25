import { Router } from "express";
import { register, login } from "../controllers/auth/auth";

const router: Router = Router();

router.post("/users", register);
router.post("/login", login);

export default router;
