const express = require("express")
const router = express.Router()
const {addRest, findRest, deleteRest, updateRest} = require("../controllers/userC")


router.get("/", (req, res) => {
  res.json("restaurant...")
})

router.post("/", addRest)
router.get("/:id", findRest)
router.delete("/:id", deleteRest)
router.put("/:id", updateRest)


module.exports = router