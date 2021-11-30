module.exports = handler => {
    return async (req, res) => {
        try{
            handler(req, res);
        }
        catch(err){
            res.status(500).json({"msg": "Something went wrong!"})
        };
    };
};