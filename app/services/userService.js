const userRepository  = require("../repositories/userRepository")
const cloudinary = require('../../config/cloudinary')

module.exports = {
    create(requestBody) {
        return userRepository.create(requestBody);
    },
    
    async update(id, body, image, password) {
        if (image == undefined) {
            return userRepository.update(id, body);
        }
        else{
            const fileBase64 = image.buffer.toString("base64");
            const file = `data:${image.mimetype};base64,${fileBase64}`;
            try {
                const result = await cloudinary.uploader.upload(file, {
                    folder: "image/psis"
                })
                body.image = result.url
                return userRepository.update(id, body, password);
            } catch (err) {
                return err
            }
        }
    },

    destroy(id) {
        return userRepository.destroy(id);
    },

    async list(role) {
        try {
            const users = await userRepository.findAll({role});
            const userCount = await userRepository.getTotalUser({role});

            return {
                data: users,
                count: userCount,
            };
        } catch (err) {
            return err;
        }
    },

    get(id) {
        const condition = {id: id}
        return userRepository.findUser(condition);
    }
}