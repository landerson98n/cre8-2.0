import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    const professors = [
        {
            "id": 1,
            "title": "Turmas Regulares",
            "icon": "https://ik.imagekit.io/6zjortsiwu/tr:w-300/regular.png",
            "features": [
                "Até 5 alunos por turma",
                "2 aulas por semana",
                "Turmas dos níveis Iniciante ao Avançado",
                "Material de Cambridge, moderno e atualizado"
            ]
        },
        {
            "id": 2,
            "title": "Aulas VIP",
            "icon": "https://ik.imagekit.io/6zjortsiwu/tr:w-300/vip.png",
            "features": [
                "Prefere aulas exclusivas",
                "Possui uma necessidades particular com inglês",
                "Precisa de um estudo intensivo da língua"
            ]
        },
        {
            "id": 3,
            "title": "Preparatório IELTS/TOEFL",
            "icon": "https://ik.imagekit.io/6zjortsiwu/tr:w-300/preparatorio.png",
            "features": [
                "Imigrar para outro país",
                "Bolsas de estudo",
                "Vagas de trabalho no exterior",
                "IELTS, Toefl, Cambridge, Toeic"
            ]
        }
    ]

    for (const professor of professors) {
        await prisma.courses.create({
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
