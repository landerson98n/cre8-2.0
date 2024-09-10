import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Busca todos os depoimentos
            const depoiments = await prisma.depoiment.findMany();
            res.status(200).json(depoiments);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar depoimentos' });
        }
    } else if (req.method === 'POST') {
        try {
            const { city, image, name, sub, sub1, text } = req.body;
            // Cria um novo depoimento
            const createdDepoiment = await prisma.depoiment.create({
                data: {
                    city,
                    image,
                    name,
                    sub,
                    sub1,
                    text
                },
            });
            res.status(201).json({ message: 'Depoimento adicionado com sucesso!', createdDepoiment });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao adicionar depoimento' });
        }
    } else if (req.method === 'PUT') {
        try {
            const { city, image, name, sub, sub1, text, id } = req.body;
            // Atualiza o depoimento com o ID fornecido
            const updatedDepoiment = await prisma.depoiment.update({
                where: { id: Number(id) },
                data: {
                    city,
                    image,
                    name,
                    sub,
                    sub1,
                    text
                },
            });
            res.status(200).json({ message: 'Depoimento atualizado com sucesso!', updatedDepoiment });
        } catch (error) {
            res.status(404).json({ message: 'Depoimento não encontrado!' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const id = req.body;
            // Deleta o depoimento com o ID fornecido
            await prisma.depoiment.delete({
                where: { id: Number(id) },
            });
            res.status(200).json({ message: 'Depoimento removido com sucesso!' });
        } catch (error) {
            res.status(404).json({ message: 'Depoimento não encontrado!' });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido!' });
    }
}
