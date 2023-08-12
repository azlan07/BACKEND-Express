const express = require('express');
const cors = require("cors");
const controllers = require('../app/controllers');
const cloudStorage = require('./cloudStorage');

const apiRouter = express.Router();

//tes upload
const cloudinary = require('./cloudinary')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const config = require('./firebase.config')
// const upload = multer({ dest: 'uploads/' });

apiRouter.use(cors());
apiRouter.use(express.static("public"));
apiRouter.use(express.json());
const uploads = require("./upload");
apiRouter.post(
    "/tes",
    uploads.single("file"),
    (req, res) => {
        const url = `/uploads/${req.file.filename}`;
        controllers.api.v1.testController.handleCreateTest(req, res, url)
    }
);
// apiRouter.get('/tes/:id', controllers.api.v1.testController.handleGetTestByPk);
apiRouter.get('/tes/:filename', controllers.api.v1.testController.handleGetFile);

apiRouter.get('/', controllers.api.main.handleGetRoot);
//Authentication
apiRouter.post('/api/v1/login', controllers.api.v1.authController.handleLogin);
apiRouter.post('/api/v1/register', controllers.api.v1.authController.handleRegister);
apiRouter.put('/api/v1/users/:id', cloudStorage.single('image'), controllers.api.v1.userController.update);
apiRouter.get('/api/v1/users/:id', controllers.api.v1.userController.show);
apiRouter.get('/api/v1/whoami', controllers.api.v1.authController.authorize, controllers.api.v1.authController.whoAmI);

//--START--//
//Upload 2 Images
//start endpoint for 2 images

// apiRouter.post('/api/v1/createsktm', upload.fields([
//     { name: 'imageKtp', maxCount: 1 },
//     { name: 'imageKk', maxCount: 1 },
//     { name: 'imageRmhDpn', maxCount: 1 },
//     { name: 'imageRmhSpg', maxCount: 1 },
//     { name: 'imageRmhBlk', maxCount: 1 }
// ]),
//     async (req, res) => {
//         try {
//             const { imageKtp, imageKk, imageRmhDpn, imageRmhSpg, imageRmhBlk } = req.files;

//             const uploadImage = async (file, fieldName) => {
//                 const result = await cloudinary.uploader.upload(file[0].path, {
//                     folder: 'image/psis/sktm' // Nama folder di Cloudinary
//                 });
//                 const imageUrl = result.secure_url;

//                 // Hapus file lokal setelah diunggah ke Cloudinary
//                 fs.unlinkSync(file[0].path);

//                 return { fieldName, imageUrl };
//             };

//             const [uploadedKtp, uploadedKk, uploadedRmhDpn, uploadedRmhSpg, uploadedRmhBlk] = await Promise.all([
//                 uploadImage(imageKtp, 'imageKtp'),
//                 uploadImage(imageKk, 'imageKk'),
//                 uploadImage(imageRmhDpn, 'imageRmhDpn'),
//                 uploadImage(imageRmhSpg, 'imageRmhSpg'),
//                 uploadImage(imageRmhBlk, 'imageRmhBlk')
//             ]);

//             // const urls = {
//             //     [uploadedKtp.fieldName]: uploadedKtp.imageUrl,
//             //     [uploadedKk.fieldName]: uploadedKk.imageUrl
//             // };

//             const linkKtp = uploadedKtp.imageUrl
//             const linkKk = uploadedKk.imageUrl
//             const linkRmhDpn = uploadedRmhDpn.imageUrl
//             const linkRmhSpg = uploadedRmhSpg.imageUrl
//             const linkRmhBlk = uploadedRmhBlk.imageUrl

//             // Panggil fungsi handleCreateSkck
//             await controllers.api.v1.sktmController.handleCreateSktm(req, res, linkKtp, linkKk, linkRmhDpn, linkRmhSpg, linkRmhBlk);
//             // console.log(linkKtp, linkKk);

//             // Panggil fungsi addSurek
//             await controllers.api.v1.surekController.addSurekSktm(req, res);

//         } catch (error) {
//             console.error('Error uploading images:', error);
//             res.status(500).json({ error: 'Failed to upload images' });
//         }
//     });

//end endpoint for 2 images
//--END--//

apiRouter.post('/api/v1/create-test', controllers.api.v1.testController.handleCreateTest);
apiRouter.put('/api/v1/test/:id', controllers.api.v1.testController.handleUpdateTest);
apiRouter.get('/api/v1/tests', controllers.api.v1.testController.handleGetAllTest);
apiRouter.get('/api/v1/test/:id', controllers.api.v1.testController.handleGetTestByPk);
apiRouter.delete('/api/v1/test/:id', controllers.api.v1.testController.handleDeleteTest);

//For Admin
apiRouter.get('/api/v1/users', controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.userController.list);
apiRouter.delete('/api/v1/users/:id', controllers.api.v1.authController.authorizeAdmin, controllers.api.v1.userController.destroy);

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
