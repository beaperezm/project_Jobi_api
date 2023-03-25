const jwt = require('jsonwebtoken');

const getJWT = (userInfo, secretKey) => {
    return jwt.sign(
        {
            id: userInfo._id,
            email: userInfo._email,
            role: userInfo.role,
            name: userInfo.name,
            surname: userInfo.surname,
            phone: userInfo.phone,
            avatar: userInfo.avatar
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "4h"
        }
    );
};

module.exports = getJWT;