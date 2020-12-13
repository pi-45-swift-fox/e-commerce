const { Banner } = require('../models')

class BannerController {
    static add (req, res, next) {
        const newBanner = {
            name: req.body.name,
            description: req.body.description,
            image_url: req.body.image_url,
            status: req.body.status,
        }
        
        Banner.create(newBanner)
        .then((banner) => {
            return res.status(201).json(banner)
        })
        .catch((err) => {
            next(err)
        })
    }

    static show (req, res, next) {
        Banner.findAll({include: `Products`, order: [['createdAt', 'ASC']]})
        .then(banner => {
            return res.status(200).json(banner)
        })
        .catch(err => {
            next(err)
        })
    }

    static showById (req, res, next) {
        const id = req.params.id

        Banner.findByPk(id)
        .then((banner) => {
            if (!banner) {
                throw {status: 404, name: "ErrorValidation", message:"Banner not Found"}
            } else {
                return res.status(200).json(banner)
            }
        })
        .catch((err) => {
            next(err)
        })
    }

    static update (req, res, next) {
        const id = req.params.id
        const updateBanner = {
            name: req.body.name,
            description: req.body.description,
            image_url: req.body.image_url,
            status: req.body.status,
        }

        Banner.findByPk(id)
        .then((banner) => {
            if (banner) {
                return banner.update(updateBanner)
            } else {
                throw { status: 404, message: 'Banner not found', name: "BannerNotFound" }
            }
        })
        .then((banner) => {
            return res.status(200).json(banner)
        })
        .catch(err => {
            next(err)
        })
    }

    static destroy (req, res, next) {
        const id = req.params.id;
        let deleted;

        Banner.findByPk(id)
        .then((banner) => {
            deleted = banner
            if (!banner) {
                throw {status: 404, name: "ErrorValidation", message:"Banner not Found"}
            } else {
                return banner.destroy()
            }
        })
        .then((banner) => {
            res.status(200).json(deleted)
        }).catch((err) => {
            next(err)
        });
    }
}

module.exports = BannerController