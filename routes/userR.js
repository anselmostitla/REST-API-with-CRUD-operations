const express = require("express")
const router = express.Router()
const {addRest, findRest, deleteRest, updateRest, addMany, findAllRest, statistics} = require("../controllers/userC")




router.post("/", addRest)
// router.get("/:id", findRest)
router.delete("/:id", deleteRest)
router.put("/:id", updateRest)
router.post("/many", addMany) 
router.get("/", findAllRest)
router.get("/restaurants/statistics/:latP/:lngP/:radiusP", statistics)


module.exports = router