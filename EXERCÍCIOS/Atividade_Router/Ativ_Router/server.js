const express = require("express")
const app = express()

app.use((req, res, next) => {
  console.log(`Acesso registrado: ${req.method} ${req.url}`);
  next();  
});


app.get("/", (req, res) => {
    res.send('homepage')
})

const userRouter = require("./routes/users")
const aboutRouter = require("./routes/about")
const dataRouter = require("./routes/data")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/users", userRouter)
app.use("/about", aboutRouter)
app.use("/data", dataRouter)

app.use((req, res, next) => {
    res.status(404);
    res.send('Page not found <a href="/">Back to homepage</a>');
});

app.listen(3000)