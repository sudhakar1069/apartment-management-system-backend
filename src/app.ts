import express from "express";
import authRoutes from "./routes/authRoutes.js";
import apartmentRoutes from "./routes/apartmentRoutes.js"
import { errorHandler } from "./middleware/errorHandler.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.js";
import { globalLimiter } from "./middleware/ratelimiter.js";
import { logger } from "./middleware/logger.js";

const app = express();
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(logger)
app.use(cookieParser())
app.use(globalLimiter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/auth", authRoutes);
app.use("/api/apartments", apartmentRoutes)
app.use("/uploads", express.static("uploads"));

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
app.use(errorHandler);

export default app;