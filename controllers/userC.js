const Rest = require("../models/userM")

const addRest = async(req, res) => {
  const {email, phone} = req.body
  if(!email || !phone) return res.status(400).json("incomplete data 2")

  const foundEmail = await Rest.findOne({email})
  if(foundEmail) return res.status(401).json("email in existance 2")

  const newRest = await Rest.create(req.body) 
  return res.status(200).json(newRest)
}

const findRest = async(req, res) => {
  try {
    const {id} = req.params

    const foundId = await Rest.findById(id)
    if(!foundId) return res.status(400).json({msg: `There is no restaurant with id ${id}`})
    
    return res.status(200).json(foundId)
  } catch (error) {
    res.status(500).json({msg: error})
  }

  return res.status(402).json("non existance")
}

const deleteRest = async(req, res) => {
  const {id} = req.params
  
  try {    
    const restDeleted = await Rest.findOneAndDelete({_id:id})
    if(!restDeleted) return res.status(400).json({msg:`No restaurant with id: ${id}`})

    return res.status(200).json({msg:restDeleted})
  } catch (error) {
    return res.status(500).json({msg: error})
  }
} 

const updateRest = async(req, res) => {
  const {id} = req.params
  try {
    const answer = await Rest.findByIdAndUpdate(id,req.body)
    const updatedRest = await Rest.findById(id)
    if(!answer) return res.status(400).json({msg: `No restaurant with id ${id}`})

    return res.status(200).json(updatedRest)
  } catch (error) {
    return res.status(500).json({msg: error})
  }
}


module.exports = {addRest, findRest, deleteRest, updateRest}