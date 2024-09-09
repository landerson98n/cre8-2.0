import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/professores.json');

// Função auxiliar para ler e escrever no JSON
const readData = () => JSON.parse(fs.readFileSync(filePath));
const writeData = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

export default function handler(req, res) {
    if (req.method === 'GET') {

        const data = readData();
        res.status(200).json(data);

    } else if (req.method === 'POST') {

        const newProfessor = req.body;
        const data = readData();
        data.push(newProfessor);
        writeData(data);
        res.status(201).json({ message: 'Professor adicionado com sucesso!' });

    } else if (req.method === 'PUT') {
        if (req.method === 'PUT') {
            const { id, ...rest } = req.body; // Extrai o id e o resto dos campos
            const data = readData();
            const index = data.findIndex((prof) => prof.id === id);

            if (index === -1) {
                res.status(404).json({ message: 'Professor não encontrado!' });
            } else {
                data[index] = { ...data[index], ...rest }; // Atualiza apenas os campos que vieram no body
                writeData(data);
                res.status(200).json({ message: 'Professor atualizado com sucesso!' });
            }
        } else {
            res.status(405).json({ message: 'Método não permitido' });
        }

    } else if (req.method === 'DELETE') {

        const id = JSON.parse(req.body);
        const data = readData();
        const updatedData = data.filter((prof) => prof.id !== id);
        writeData(updatedData);
        res.status(200).json({ message: 'Professor removido com sucesso!' });

    } else {

        res.status(405).json({ message: 'Método não permitido!' });

    }
}
