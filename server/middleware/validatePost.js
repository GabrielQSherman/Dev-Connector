const validator = require("validator");

const validate = async (req, res, next) => {

  const image = req.body.image,
        git = req.body.git,
        caption = typeof req.body.caption == 'string' ? req.body.caption.trim() : false,
        failedValues = [];
        
        if (!image || !validator.isUrl(image)) {
            failedValues.push({
                key: "image",
                message: "Image Required"
            })
        }

        if (!git || !validator.isUrl(git)) {
            failedValues.push({
                key: "git",
                message: "GitHub Link Required"
            })
        }

        if (!caption || caption === '') {
            failedValues.push({
                key: "caption",
                message: "Caption Required"
            })
        }

        if (caption.length < 3 ) {
            failedValues.push({
                key: "caption",
                message: "Caption Too Short"
            })
        } else if ( caption.length > 333) {
            failedValues.push({
                key: "caption",
                message: "Caption Too Long"
            })
        }

        if (failedValues.length > 0) {
            res
            .status(400)
            .json({
                validation_error: failedValues
            })
        } else {
            
            req.post = {
                user: req.userId, //set by previous middleware
                caption: caption,
                image: image,
                git: git
            }
            
            next() 
        }

}

module.exports = validate;