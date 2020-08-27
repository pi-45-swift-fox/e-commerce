function errorHandler (err, req, res, next) {
    let msg = ''
    let code = ''

    switch(err.name) {
        case 'SequelizeValidationError':
            let errors = [];
            err.errors.forEach(el => {
                errors.push(el.message);
            });
            code = 400
            msg = `${errors}`
            break;

        case 'email or password is incorrect':
            code = 400
            msg = 'email or password is incorrect'
            break
        case 'Not Authorized':
            code = 401
            msg = err.name
            break

        default:
            code = 500
            msg = 'Internal Server Error'
            break
    }

    return res.status(code).json({msg})
}

module.exports = errorHandler