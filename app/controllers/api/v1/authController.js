const authService = require('../../../services/authService')

module.exports = {
    async handleRegister(req,res){
        try {
            const {name, nik, password, kelamin} = req.body;
            const role = "user"
            const image = "https://res.cloudinary.com/doilg1m0l/image/upload/v1685183704/image/psis/mx70kweibmc5nuqry4sc.png"
            const user = await authService.register(name, nik, password, role, image, kelamin);
                
            if(user.code == 401){
                return res.status(401).json({
                    status: "FAIL",
                    message: `Akun dengan Nik : ${nik} Sudah Ada!, Silahkan Login!!`
                })
            }
            res.status(201).json({
                status: "OK",
                data: user
            })
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message,
            });   
        }
    },

    async handleLogin(req,res){
        try {
            const {nik, password} = req.body;
            const auth = await authService.login(nik, password);
            if(auth.code === 401){
                res.status(401).json({
                    status: "FAIL",
                    message: auth.message,
                })
                return;
            }
            else if(auth.code === 404){
                res.status(404).json({
                    status: "FAIL",
                    message: auth.message,
                })
                return;
            }
            res.status(200).json({
                status: "OK",
                data: auth
            })
        } catch (err) {
            res.status(400).json({
                status: "FAIL",
                message: err.message,
            });
        }
    },

    async authorize(req, res, next){
        try {
            const bearerToken = req.headers.authorization;
            if (!bearerToken) {
                res.status(403).json({
                    message: "WRONG BEARER TOKEN",
                })
                return;
            }
            const token = bearerToken.split('Bearer ')[1];
            
            const user = await authService.authorize(token)
            if (!user) {
                res.status(403).json({
                    message: "UNAUTHORIZED"
                })
                return;
            }

            req.user = user;
            next();

        } catch (err) {
            res.status(400).json({
                message: "NEED AUTHORIZATION",
            })
        }
    },

    async authorizeAdmin(req, res, next){
        try {
            const bearerToken = req.headers.authorization;
            if (!bearerToken) {
                res.status(403).json({
                    message: "WRONG BEARER TOKEN",
                })
                return;
            }

            const token = bearerToken.split('Bearer ')[1];
            const user = await authService.authorizeAdmin(token);
            if (!user) {
                res.status(403).json({
                    message: "Your not an admin"
                })
                return;
            }

            req.user = user;
            next()

        } catch (err) {
            res.status(400).json({
                message: "NEED AUTHORIZATION",
            });
        }
    },

    whoAmI(req, res){
        const user = req.user;
        res.status(201).json({
            status: "OK",
            data: user
        })
        return; 
    }
    
}