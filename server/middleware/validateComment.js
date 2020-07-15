const validator = require("validator");

const validate = async (req, res, next) => {

  const 
        content = typeof req.body.content == 'string' ? req.body.content.trim() : false,
        failedValues = [];

        if (!content || content === '') {
            failedValues.push({
                key: "content",
                message: "Comment Content Required"
            })
        }

        if (content.length < 1 ) {
            failedValues.push({
                key: "content",
                message: "Comment Too Short"
            })
        } else if ( content.length > 100) {
            failedValues.push({
                key: "content",
                message: "Comment Too Long"
            })
        }

        if (failedValues.length > 0) {
            res
            .status(400)
            .json({
                validation_error: failedValues
            })
        } else {
            
            req.comment = {
                user: req.userId, //set by previous middleware
                content: content
            }
            
            next() 
        }

}

module.exports = validate;