import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Busca todos os professores
            const professores = await prisma.teacher.findMany({ include: { qualifications: { select: { text: true } } } });
            res.status(200).json(professores);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar professores' });
        }
    } else if (req.method === 'POST') {
        try {
            const { image, name, role, qualifications } = req.body;
            // Cria um novo teacher
            const createdProfessor = await prisma.teacher.create({
                data: {
                    image,
                    name,
                    role,
                    qualifications: {
                        create: qualifications.map(item => ({ text: item }))
                    }
                },
            });
            res.status(201).json({ message: 'Professor adicionado com sucesso!', createdProfessor });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar teacher' });
        }
    } else if (req.method === 'PUT') {
        try {
            const { id, ...rest } = req.body;
            // Atualiza o teacher com o ID fornecido
            const updatedProfessor = await prisma.teacher.update({
                where: { id: Number(id) },
                data: {
                    image: rest.image,
                    name: rest.name,
                    qualifications: {
                        create: rest.qualifications.map(item => ({ text: item }))
                    },
                    role: rest.role
                },
            });
            res.status(200).json({ message: 'Professor atualizado com sucesso!', updatedProfessor });
        } catch (error) {
            res.status(404).json({ message: 'Professor não encontrado!' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const id = req.body;
            // Deleta o teacher com o ID fornecido
            await prisma.teacher.delete({
                where: { id: Number(id) },
            });
            res.status(200).json({ message: 'Professor removido com sucesso!' });
        } catch (error) {
            res.status(404).json({ message: 'Professor não encontrado!' });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido!' });
    }
}
