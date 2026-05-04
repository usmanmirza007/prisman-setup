import express, { Request, Response } from 'express';
// import { PrismaClient } from './node_modules/.prisma/client';
// import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import dotenv from 'dotenv';
import { prisma } from './prisma/prisma';

dotenv.config();

const app = express();

// Create the Prisma Client with the adapter
// const adapter = new PrismaMariaDb(process.env.DATABASE_URL!);
// const prisma = new PrismaClient({ adapter });

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Get all users
app.get('/users', async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: { posts: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Create user
app.post('/users', async (req: Request, res: Response) => {
  try {
    const { email, name } = req.body;
    const user = await prisma.user.create({
      data: { email, name }
    });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Get all posts
app.get('/posts', async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true }
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// Create post
app.post('/posts', async (req: Request, res: Response) => {
  try {
    const { title, content, authorId } = req.body;
    const post = await prisma.post.create({
      data: { title, content, authorId }
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// Publish post
app.patch('/posts/:id/publish', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { published: true }
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to publish post' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit();
});