
const User = require("../models/User");
const { error, success } = require("../utils/responseWrapper");

const getMyInfoController = async (req, res) => {
    try {
        const user = await User.findById(req._id);
        return res.json(success(200, { user }));
    } catch (e) {
        return res.json(error(500, e.message));
    }

}

module.exports = {getMyInfoController}