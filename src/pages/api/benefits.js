import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try {
            // Busca todos os benefícios
            const benefits = await prisma.benefit.findMany();
            res.status(200).json(benefits);
        } catch (error) {
            res.status(500).json({ error: 'Erro ao buscar benefícios' });
        }
    } else if (req.method === 'POST') {
        try {
            const { title, description, animationData } = req.body;
            // Cria um novo benefício

            const createdBenefit = await prisma.benefit.create({
                data: {
                    title, description, animationData
                },
            });

            res.status(201).json({ message: 'Benefício adicionado com sucesso!', createdBenefit });

        } catch (error) {
            console.log(error);

            res.status(500).json({ error: 'Erro ao adicionar benefício' });
        }
    } else if (req.method === 'PUT') {
        try {
            const { id, ...rest } = req.body;
            // Atualiza o benefício com o ID fornecido
            const updatedBenefit = await prisma.benefit.update({
                where: { id: Number(id) },
                data: rest,
            });
            res.status(200).json({ message: 'Benefício atualizado com sucesso!', updatedBenefit });
        } catch (error) {
            res.status(404).json({ message: 'Benefício não encontrado!' });
        }
    } else if (req.method === 'DELETE') {
        try {
            const id = req.body;
            // Deleta o benefício com o ID fornecido
            await prisma.benefit.delete({
                where: { id: Number(id) }
            });

            res.status(200).json({ message: 'Benefício removido com sucesso!' });
        } catch (error) {
            res.status(404).json({ message: 'Benefício não encontrado!' });
        }
    } else {
        res.status(405).json({ message: 'Método não permitido!' });
    }
}
