import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/about.json');

// Função auxiliar para ler e escrever no JSON
const readData = () => JSON.parse(fs.readFileSync(filePath));
const writeData = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

export default function handler(req, res) {
    if (req.method === 'GET') {

        const data = readData();
        res.status(200).json(data);

    } else if (req.method === 'POST') {

        const newData = req.body;
        const data = readData();
        data.push(newData);
        writeData(data);
        res.status(201).json({ message: 'About adicionado com sucesso!' });

    } else if (req.method === 'PUT') {

        const id = JSON.parse(req.body.id);
        const data = readData();
        const index = data.findIndex((prof) => prof.id === id);

        if (index === -1) {
            res.status(404).json({ message: 'About não encontrado!' });
        } else {
            data[index] = { ...data[index], ...req.body };
            writeData(data);
            res.status(200).json({ message: 'About atualizado com sucesso!' });
        }

    } else if (req.method === 'DELETE') {

        const id = JSON.parse(req.body);
        const data = readData();
        const updatedData = data.filter((prof) => prof.id !== id);
        writeData(updatedData);
        res.status(200).json({ message: 'About removido com sucesso!' });

    } else {

        res.status(405).json({ message: 'Método não permitido!' });

    }
}
