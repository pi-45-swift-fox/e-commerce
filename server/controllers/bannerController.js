const { User, Banner } = require('../models')

class bannerController {
    static async create (req, res, next) {
        try {
            const { title, status, image_url } = req.body
            const newBanner = await Banner.create({
                title,
                status,
                image_url
            })
            res.status(201).json(newBanner)
        } catch (error) {
            next(error)
        }
    }

    static async read (req, res, next) {
        try {
            const banners = await Banner.findAll({
                order: [['createdAt', 'DESC']]
            })
            res.status(200).json(banners)
        } catch (error) {
            next(error)
        }
    }

    static async update (req, res, next) {
        try {
            console.log('masuk', req.body);
            const id = +req.params.id
            const { title, status, image_url} = req.body
            const willUpdate = await Banner.update({
                title,
                status,
                image_url
            },{
                where: {
                    id
                }
            })
            res.status(200).json('berhasil update')
        } catch (error) {
            next(error)
        }
    }

    static async delete (req, res, next) {
        try {
            const id = +req.params.id
            const willDelete = await Banner.destroy({
                where: {
                    id
                }
            })
            res.status(200).json('berhasil delete')
        } catch (error) {
            next(error)
        }
    }
}

module.exports = bannerController