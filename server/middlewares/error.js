module.exports = (err, req, res, next) => {
    let generatedError = err.body, errorCode;
    console.log(generatedError || 'Status Error Sent to Client');

    switch (err.code) {
        case 400:
            errorCode = 'INPUT_VALIDATION_ERROR';
            switch (err.type) {
                case ('product'):
                    switch (err.body.errors[0].path) {
                        case ('name'):
                            res.status(err.code).json({
                                msg: 'Error in name input field',
                                err_code: errorCode
                            });
                            break;
                        case ('image_url'):
                            res.status(err.code).json({
                                msg: 'Error in image_url input field',
                                err_code: errorCode
                            });
                            break;
                        case ('price'):
                            res.status(err.code).json({
                                msg: 'Error in price input field',
                                err_code: errorCode
                            });
                            break;
                        case ('stock'):
                            res.status(err.code).json({
                                msg: 'Error in stock input field',
                                err_code: errorCode
                            });
                            break;
                        default:
                            res.status(err.code).json({
                                msg: 'There is something wrong with the given field',
                                err_code: errorCode
                            });
                    }
                    break;
                case ('user'):
                    res.status(err.code).json({
                        msg: 'Error in user input field',
                        err_code: errorCode,
                        description: err.body.errors[0]
                    })
                    break;
                case ('cart'):
                    res.status(err.code).json({
                        msg: 'Error in cart quantity input field',
                        err_code: errorCode
                    });
            }
            break;
        case 401:
            errorCode = 'USER_VALIDATION_ERROR';

            res.status(err.code).json({
                msg: 'Username atau password salah',
                err_code: errorCode
            });
            break;

        case 403:
            errorCode = 'UNAUTHORIZED_ACCESS';

            res.status(err.code).json({
                msg: 'Access denied',
                err_code: errorCode
            });
            break;

        case 404:
            errorCode = 'MISSING_DATA';

            switch (err.type) {
                case ('login'):
                    res.status(err.code).json({
                        msg: 'Mohon untuk login terlebih dahulu',
                        err_code: errorCode
                    });
                    break;
                case ('product'):
                    res.status(err.code).json({
                        msg: 'Data yang dicari tidak ditemukan',
                        err_code: errorCode
                    });
                    break;
                default:
                    res.status(err.code).json({
                        msg: 'No such data found',
                        err_code: errorCode
                    });
            }
            break;

        case 409:
            errorCode = 'CONFLICT';

            switch (err.type) {
                case ('token'):
                    res.status(err.code).json({
                        msg: 'Tidak ada token terkirim/terdaftar',
                        err_code: errorCode
                    });
                    break;
                case ('user'):
                    res.status(err.code).json({
                        msg: 'This email address has been registered',
                        err_code: errorCode
                    });
                    break;
                default:
                    throw 'Unhandled error at code 409';
            }
            break;

        default:
            errorCode = 'INTERNAL_ERROR';

            res.status(err.code || 500).json({
                msg: 'Unhandled Error in the end',
                err_code: errorCode,
                description: generatedError
            });
    }
}