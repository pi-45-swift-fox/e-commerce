function errorHandler(err, req, res, next) {
  if (err.name == 'SequelizeValidationError') {
    const errors = err.errors.map(el => ({
      message: el.message
    }))
    return res.status(400).json({
      code: 400,
      name: 'BadRequest',
      errors: errors
    })
  } else if (err.name == 'SequelizeUniqueConstraintError') {
    const errors = err.errors.map(el => ({
      message: el.message
    }))
    return res.status(400).json({
      code: 400,
      name: 'BadRequest',
      errors: errors
    })
  } else if (err.name == 'BadRequest') {
    return res.status(400).json({
      code: 400,
      name: err.name,
      errors: err.errors
    })
  } else if (err.name == 'InternalServerError') {
    return res.status(500).json({
      code: 500,
      name: err.name,
      errors: err.errors
    })
  } else if (err.name == 'JsonWebTokenError') {
    return res.status(500).json({
      code: 500,
      name: err.name,
      errors: [{ msg: err.msg }]
    })
  } else if (err.name == 'NotFound') {
    return res.status(404).json({
      code: 404,
      name: err.name,
      errors: err.errors
    })
  } else if (err.name == 'Unauthenticated') {
    return res.status(401).json({
      code: 401,
      name: err.name,
      errors: 'User Unauthenticated.'
    })
  } else if (err.name == 'Unauthorized') {
    return res.status(401).json({
      code: 401,
      name: err.name,
      errors: 'User Unauthorized.'
    })
  }
}

module.exports = errorHandler