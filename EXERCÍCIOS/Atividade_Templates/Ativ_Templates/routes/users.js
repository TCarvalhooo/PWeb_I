var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var characters =[
    {
      name: 'Harry',
      role: 'Student'
    },
    {
      name: 'Dumbledore',
      role: 'Headmaster'
    },
    {
      name: 'Snape',
      role: 'Professor'
    },
    {
      name: 'Hermione',
      role: 'Student'
    }
  ];
  var subheading = "I though we should involve some magic";
  
  res.render('users', {characters: characters, subheading: subheading});
});

router.get("/", (req, res) => {
    res.redirect("/users/signup")
})

router.get("/signup", (req, res) => {
    res.send("user signup page");
});

router.get("/signin", (req, res) => {
    res.send("signin page")
})

router.get("/:userid", (req, res) => {
    const userid = req.params.userid; 
    res.send("Welcome, "+userid+"!")
})

module.exports = router;

