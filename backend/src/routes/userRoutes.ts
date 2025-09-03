// backend/src/routes/userRoutes.ts
import { Router } from 'express';
import prisma from '../utils/prisma';
import { authenticate } from '../middleware/authMiddleware';

const router = Router();
router.use(authenticate);

router.get('/favorites', async (req: any, res) => {
  const favorites = await prisma.favorite.findMany({ where: { userId: req.user.userId } });
  res.json(favorites);
});

router.post('/favorites', async (req: any, res) => {
  try {
    const { name, url, description, stars, language } = req.body;

    const fav = await prisma.favorite.create({
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
  } catch (err) {
    console.error('POST /favorites error:', err);
    res.status(500).json({ error: 'Failed to save favorite' });
  }
});


router.delete('/favorites/:id', async (req: any, res) => {
  try {
    const id = parseInt(req.params.id);
    await prisma.favorite.delete({
      where: { id },
    });
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('DELETE /favorites error:', err);
    res.status(500).json({ error: 'Failed to delete favorite' });
  }
});


export default router;