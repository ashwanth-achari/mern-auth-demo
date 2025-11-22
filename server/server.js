 require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const serviceRoute = require("./router/service-router");
const adminRoute = require("./router/admin-router");
const connectDB = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://devash-services.vercel.app"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};

app.use(cors(corsOptions));


//parse json body
app.use(express.json());

//API routes
app.use("/api/auth", authRoute);
app.use("/api/form", contactRoute);
app.use("/api/data",serviceRoute);
app.use("/api/admin",adminRoute);

//test route
app.get("/register", (req, res) => {
  res.status(200).send("Welcome to Home Page -DEPLOY TEST");
});

//Error handler (must be after routes)
app.use(errorMiddleware)

const PORT = process.env.PORT || 4000;

//DB connection + server starting
connectDB()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
  });
})
.catch((err) => {
  console.error("Failed to connnect to database:",err);
});
