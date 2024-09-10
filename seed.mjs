import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const professors = [
        {
            "id": 1,
            "title": "Qualidade",
            "description": "Ensino de qualidade com nossa equipe de professores certificados internacionalmente.",
            "animationData": "https://ik.imagekit.io/6zjortsiwu/animations/quality.json?updatedAt=1725800929572"
        },
        {
            "id": 2,
            "title": "Soluções",
            "description": "Aulas individuais ou em turmas, inglês para negócios, e o que mais você precisar!",
            "animationData": "https://ik.imagekit.io/6zjortsiwu/animations/idea.json?updatedAt=1725800929572"
        },
        {
            "id": 3,
            "title": "+ 321 alunos",
            "description": "Mais de 275 alunos fazem parte da nossa história.",
            "animationData": "https://ik.imagekit.io/6zjortsiwu/animations/cap.json?updatedAt=1725800929572"
        },
        {
            "id": 4,
            "title": "Mundo",
            "description": "Alunos em 8 países.",
            "animationData": "https://ik.imagekit.io/6zjortsiwu/animations/world.json?updatedAt=1725800929572"
        },
        {
            "id": 5,
            "title": "Brasil\t",
            "description": "A Cre8 já está em 18 estados do Brasil!",
            "animationData": "https://ik.imagekit.io/6zjortsiwu/animations/brasil.json?updatedAt=1725800929572"
        }
    ]

    for (const professor of professors) {
        await prisma.benr.create({
            data: {
                title: professor.title,
                icon: professor.icon,
                features: {
                    create: professor.features.map(item => ({
                        text: item
                    }))
                }
            },
        });
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
