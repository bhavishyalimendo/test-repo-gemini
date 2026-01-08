import { Request, Response } from 'express';
import { prisma } from '../prisma';

export const getTodos = async (req: Request, res: Response) => {
    try {
        const todos = await prisma.todo.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    const { name, description } = req.body;
    try {
        const todo = await prisma.todo.create({
            data: {
                name,
                description,
            },
        });
        res.status(201).json(todo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Failed to create todo' });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, description, isCompleted } = req.body;
    try {
        const todo = await prisma.todo.update({
            where: { id: Number(id) },
            data: {
                name,
                description,
                isCompleted,
            },
        });
        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await prisma.todo.delete({
            where: { id: Number(id) },
        });
        res.json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
};
