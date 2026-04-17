import Router from "express"
import { getApartments, add, remove, update } from "../controller/apartmentController.js"
import { authenticate } from "../middleware/authenticate.js";
import { authorize } from "../middleware/authorize.js";
import { apartmentSchema } from "../schema/authSchema.js";
import { validate } from "../middleware/validate.js";
import { upload } from "../middleware/upload.js";
const router = Router();
router.post("/register", authenticate, authorize("admin"), upload.single("image"), validate(apartmentSchema), add);
router.get("/", getApartments);
router.put("/:id", authenticate, authorize("admin"), update);
router.delete("/remove/:id", authenticate, authorize("admin"), remove);
export default router;