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
// backend/src/routes/userRoutes.ts
const express_1 = require("express");
const prisma_1 = __importDefault(require("../utils/prisma"));
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
router.use(authMiddleware_1.authenticate);
router.get('/favorites', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const favorites = yield prisma_1.default.favorite.findMany({ where: { userId: req.user.userId } });
    res.json(favorites);
}));
router.post('/favorites', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, url, description, stars, language } = req.body;
        const fav = yield prisma_1.default.favorite.create({
            data: {
                name,
                url,
                description: description || "",
                stars,
                language: language || "",
                user: {
                    connect: { id: req.user.userId }, // ← this replaces userId
                },
            },
        });
        console.log('Favorite created:', fav);
        res.status(201).json(fav);
    }
    catch (err) {
        console.error('POST /favorites error:', err);
        res.status(500).json({ error: 'Failed to save favorite' });
    }
}));
router.delete('/favorites/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = parseInt(req.params.id);
        yield prisma_1.default.favorite.delete({
            where: { id },
        });
        res.json({ message: 'Deleted' });
    }
    catch (err) {
        console.error('DELETE /favorites error:', err);
        res.status(500).json({ error: 'Failed to delete favorite' });
    }
}));
exports.default = router;
