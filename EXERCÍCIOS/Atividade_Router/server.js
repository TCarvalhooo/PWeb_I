const express = require("express")
const app = express()

app.set("view engine", "ejs")

const userRouter = require("./routes/users")
const aboutRouter = require("./routes/about")
const dataRouter = require("./routes/data")

app.use("/users", userRouter)
app.use("/about", aboutRouter)
app.use("/data", dataRouter)

app.listen(3000)