import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data/depoiments.json');

// Função auxiliar para ler e escrever no JSON
const readData = () => JSON.parse(fs.readFileSync(filePath));
const writeData = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

export default function handler(req, res) {
    if (req.method === 'GET') {

        const data = readData();
        res.status(200).json(data);

    } else if (req.method === 'POST') {

        const newDepoiment = req.body;
        const data = readData();
        data.push(newDepoiment);
        writeData(data);
        res.status(201).json({ message: 'Depoiment adicionado com sucesso!' });

    } else if (req.method === 'PUT') {

        if (req.method === 'PUT') {
            const { id, ...rest } = req.body; // Extrai o id e o resto dos campos
            const data = readData();
            const index = data.findIndex((data) => data.id === id);

            if (index === -1) {
                res.status(404).json({ message: 'Objeto não encontrado!' });
            } else {
                data[index] = { ...data[index], ...rest }; // Atualiza apenas os campos que vieram no body
                writeData(data);
                res.status(200).json({ message: 'Objeto atualizado com sucesso!' });
            }
        } else {
            res.status(405).json({ message: 'Método não permitido' });
        }

    } else if (req.method === 'DELETE') {

        const id = JSON.parse(req.body);
        const data = readData();
        const updatedData = data.filter((prof) => prof.id !== id);
        writeData(updatedData);
        res.status(200).json({ message: 'Depoiment removido com sucesso!' });

    } else {

        res.status(405).json({ message: 'Método não permitido!' });

    }
}
