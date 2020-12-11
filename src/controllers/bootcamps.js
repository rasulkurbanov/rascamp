const Bootcamp = require('../models/Bootcamp')

//@desc GET all bootcamps
//@route GET /api/v1/bootcamps
//access PUBLIC
exports.getBootcamps = async (req, res, next) => {
  try {
    const bootcamps = await Bootcamp.find()
    
    res
      .status(200)
      .json({success: true, data: bootcamps})

  }
  catch(err) {
    res
      .status(400)
      .json({success: false, msg: err.message})
  }
}

//@desc GET a single bootcamp
//@route GET /api/v1/bootcamps/:id
//access PUBLIC
exports.getBootcamp = async (req, res, next) => {
  try{
    const bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp) {
      res
      .status(400)
      .json({success: false})  
    }
    else {
      res
        .status(200)  
        .json({success: true, data: bootcamp})
    }
  }
  catch(err) {
    res
      .status(400)
      .json({success: false, msg: err.message})
  }
}

//@desc POST a bootcamp
//@route POST /api/v1/bootcamps
//access PUBLIC
exports.createBootcamp = async (req, res, next) => {
  try{
    let bootcamp = await Bootcamp.create(req.body)

    res
      .status(201)
      .json({success: true, data: bootcamp})
  }
  catch(err) {
    console.log(err)
    res.status(400).json({success: false, msg: err.message})
  }
}

//@desc PUT a bootcamp
//@route PUT /api/v1/bootcamps/:id
//access PUBLIC
exports.updateBootcamp = async (req, res, next) => {
  try{
    let bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
    res.status(200).json({success: true, data: bootcamp})
  }
  catch(err) {
    res 
      .status(400)
      .json({success: true, data: bootcamp})
  }

}

//@desc DELETE all bootcamps
//@route DELETE /api/v1/bootcamps
//access PUBLIC
exports.deleteBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id)

    res
      .status(200)  
      .json({success: true, msg: `Bootcamp deleted`})

  }
  catch(err) {
    res
      .status(400)
      .json({success: false, msg: err.message})
  }
} 

