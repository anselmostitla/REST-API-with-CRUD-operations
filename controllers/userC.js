const Rest = require("../models/userM")
const csvtojson = require("csvtojson")

const addRest = async(req, res) => {
  const {rating, email, phone} = req.body
  if(!email || !phone) return res.status(400).json("incomplete data 2")

  if(rating<0 || rating>5) return res.status(400).json("rating out of bounds")

  const foundEmail = await Rest.findOne({email})
  if(foundEmail) return res.status(401).json("email in existance 2")

  const newRest = await Rest.create(req.body) 
  return res.status(200).json(newRest)
}

const findRest = async(req, res) => {
  try {
    const {id} = req.params

    const found_Id = await Rest.findById(id)
    if(!found_Id) return res.status(400).json({msg: `There is no restaurant with that id`})
    
    if(found_Id) return res.status(200).json(found_Id)
  } catch (error) {
    res.status(500).json({msg: error})
  }

  return res.status(402).json("non existance")
}

const findAllRest = async(req, res) => {
  try {
    const foundAll = await Rest.find({})
    if(!foundAll) return res.status(400).json("No records")
    return res.status(200).json(foundAll)
  } catch (error) {
    return res.status(500).json({msg: error})
  }
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

const addMany = async (req, res) => {
  try {
    const csvData = await csvtojson().fromFile("restaurantes.csv")

    if(!csvData) return res.status(400).json("restaurantes.csv not found")
    
    const jsonData = await Rest.insertMany(csvData) 
    if(!jsonData) return res.status(400).json("unsuccessful operation")

    return res.status(200).json(csvData)    
  } catch (error) {
    return res.status(500).json(error)
  }

}

const statistics = async (req, res) => {
  try {
    const {latP, lngP, radiusP} = req.params
    
    const squareRadius = radiusP*radiusP
    const foundAll = await Rest.aggregate([
      // {$project: {sumand1: {$add: ["$lat", "$5"]}}},
      // {$project:  {distance1: { $subtract: ["$lat", "$latP"]}}},
      // {$project:  {distance2: { $multiply: ["$lng", "$lng"]}}},
      // {$project:  {distance: { $add: ["$distance1", "$distance2"]}}},
      // {$match: {sumand1 : {$lt:102069}}}
      {$addFields: { distance1:{ $subtract: ["$lat", Number(latP)]}}}, 
      {$addFields: { distance2:{ $subtract: ["$lng", Number(lngP)]}}},
      {$addFields: { squareDistance1: { $multiply: ["$distance1", "$distance1"]}}},
      {$addFields: { squareDistance2: { $multiply: ["$distance2", "$distance2"]}}},
      {$addFields: { squareSums: {$add:["$squareDistance1", "$squareDistance1"]}}},
      {$match: {squareSums: {$lt: squareRadius}}},
      {$addFields: {isNear: true}}, 
      
      // {$group: {_id: "$isNear", total:{$sum:1} }},
      // {$group: {_id: null, total:{$sum:1} }},
      {$group: {_id: null, total:{$sum:1}, "avg": {"$avg":"$rating"}, "std": { "$stdDevPop": "$rating"} }},
      // {$group: {_id:"$email", total:{$sum:1}}},
      // {$project: {inTotal: {$sum:1}}}
      // {$count: "total_docs"},
      // {$avg: "average"},
      {$project: {_id:0}}
    ])
    

    
    return res.status(200).json(foundAll)
  } catch (error) {
    return res.status(500).json(error)
  }
}


module.exports = {addRest, findRest, deleteRest, updateRest, addMany, findAllRest, statistics}