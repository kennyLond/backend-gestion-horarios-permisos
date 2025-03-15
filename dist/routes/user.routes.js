"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.post('/', user_controller_1.newUser); // Ahora será /api/users
router.post('/login', user_controller_1.loginUser); // Ahora será /api/users/login
exports.default = router;
