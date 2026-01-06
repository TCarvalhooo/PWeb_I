const express = require("express")
const router = express.Router()

router
    .route("/")
    .get((req, res) => {
    res.send("data page")
})
    .post((req, res) => {
    console.log(req.body)
    res.send("dados recebidos")
})


module.exports = router