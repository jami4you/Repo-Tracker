"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// backend/src/routes/authRoutes.ts
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../utils/prisma"));
const router = (0, express_1.Router)();
router.post('/register', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    const user = yield prisma_1.default.user.create({ data: { email, password: hashedPassword } });
    res.json({ id: user.id, email: user.email });
}));
router.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    const user = yield prisma_1.default.user.findUnique({ where: { email } });
    if (!user || !(yield bcrypt_1.default.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
}));
exports.default = router;
