const jwt =require('jsonwebtoken')
const JWT_SECRET = "123456"

function authMiddleware(req,res,next){
    const word = req.headers.authorization
    const word1 = word.split(" ")
    const token = word1[1]

    if(!word || word[0]=="bearer"){
        return res.status(403).json({});
    }

    try {
        const decode = jwt.verify(token,JWT_SECRET)
        const userId = decode.userId
        if(userId){
            req.userId = userId
        }else{
            return res.status(403).json({
                message : "you are not authorized"
            })
        }
        next()
    } catch (err) {
        return res.status(403).json({message : token})
    }
}

module.exports = authMiddleware