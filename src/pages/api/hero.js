import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Busca todos os cursos
            const courses = await prisma.hero.findMany({
                include: {
                    features: {
                        select: {
                            text: true,
                        },
                    },
                },
            }); res.status(200).json(courses);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar cursos' });
        }
    } else if (req.method === 'POST') {
        try {
            const newCourse = req.body;
            // Cria um novo curso
            const createdCourse = await prisma.courses.create({
                data: newCourse,
            });
            res.status(201).json({ message: 'Curso adicionado com sucesso!', createdCourse });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar curso' });
        }
    } else if (req.method === 'PUT') {
        try {
            const { id, ...rest } = req.body;
            // Atualiza o curso com o ID fornecido
            const updatedCourse = await prisma.courses.update({
                where: { id: Number(id) },
                data: rest,
            });
            res.status(200).json({ message: 'Curso atualizado com sucesso!', updatedCourse });
        } catch (error) {
            res.status(404).json({ message: 'Curso não encontrado!' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const id = req.body;
            // Deleta o curso com o ID fornecido
            await prisma.courses.delete({
                where: { id: Number(id) },
            });
            res.status(200).json({ message: 'Curso removido com sucesso!' });
        } catch (error) {
            res.status(404).json({ message: 'Curso não encontrado!' });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido!' });
    }
}
