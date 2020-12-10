//@desc GET all bootcamps
//@route GET /api/v1/bootcamps
//access PUBLIC
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({success: true, msg: "Showing all bootcamps"})
}

//@desc GET a single bootcamp
//@route GET /api/v1/bootcamps/:id
//access PUBLIC
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({success: true, msg: `Showing bootcamp with an id ${req.params.id}`})
}

//@desc POST a bootcamp
//@route POST /api/v1/bootcamps
//access PUBLIC
exports.createBootcamp = (req, res, next) => {
  res.status(201).json({success: true, msg: "New bootcamp created"})
}

//@desc PUT a bootcamp
//@route PUT /api/v1/bootcamps/:id
//access PUBLIC
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({success: true, msg: `Updating bootcamp with id ${req.params.id}`})
}

//@desc DELETE all bootcamps
//@route DELETE /api/v1/bootcamps
//access PUBLIC
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({success: true, msg: `Bootcamp deleted`})
} 

