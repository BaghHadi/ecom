const express = require("express");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const productRouter = require("./routes/productRoutes");
const userRouter = require("./routes/userRoutes");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// app.use((req, res, next) => {
//   console.log("Hello from the middleware 👋");
//   next();
// });

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

app.use("/api/v1/products", productRouter);
app.use("/api/v1/users", userRouter);

//this one is for exp if we cherche /API/kanez ou qlq chose qui nexiste pas on vous donne une err vadalnle poour comprendre
app.all("*", (req, res, next) => {
  next(new AppError(`cant find ${req.originalUrl} on this serv`, 404));
});
app.use(globalErrorHandler);

module.exports = app;
