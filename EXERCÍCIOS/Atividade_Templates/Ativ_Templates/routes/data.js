const express = require("express")
const router = express.Router()

router.get('/', function(req, res, next) {
  res.render('data')
})

router.post((req, res)  => {
    console.log(req.body)
    res.send("dados recebidos")
})

module.exports = router