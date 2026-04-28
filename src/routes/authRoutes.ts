import { Router } from "express";
import { register, login, me,logout} from "../controller/authController.js";
import { authenticate } from "../middleware/authenticate.js";
import { registerSchema, loginSchema } from "../schema/authSchema.js";
import { validate } from "../middleware/validate.js";
import { loginLimiter } from "../middleware/ratelimiter.js";
const router = Router();

router.post("/logout", authenticate, logout);

router.post("/register",validate(registerSchema), register);
router.post("/login", validate(loginSchema),loginLimiter ,login);
router.get("/me",me)
export default router;