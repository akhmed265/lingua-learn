// Данные для уроков грамматики
const grammarData = [
    {
        id: 1,
        title: "Present Simple (Настоящее простое время)",
        rule: "Present Simple используется для выражения регулярных действий, привычек, фактов и общих истин.",
        structure: "Subject + Verb (base form) + Object",
        examples: [
            { en: "I work every day.", ru: "Я работаю каждый день." },
            { en: "She likes coffee.", ru: "Она любит кофе." },
            { en: "The sun rises in the east.", ru: "Солнце встает на востоке." }
        ],
        exercise: {
            sentence: "I ___ to school every morning.",
            correctAnswer: "go",
            hint: "Используйте глагол 'go' в базовой форме"
        }
    },
    {
        id: 2,
        title: "Present Continuous (Настоящее длительное время)",
        rule: "Present Continuous используется для выражения действий, происходящих в момент речи, или временных ситуаций.",
        structure: "Subject + am/is/are + Verb(-ing) + Object",
        examples: [
            { en: "I am reading a book now.", ru: "Я читаю книгу сейчас." },
            { en: "They are playing football.", ru: "Они играют в футбол." },
            { en: "She is studying English this month.", ru: "Она изучает английский в этом месяце." }
        ],
        exercise: {
            sentence: "We ___ dinner right now.",
            correctAnswer: "are having",
            hint: "Используйте 'are having' для множественного числа"
        }
    },
    {
        id: 3,
        title: "Past Simple (Прошедшее простое время)",
        rule: "Past Simple используется для выражения завершенных действий в прошлом.",
        structure: "Subject + Verb(past form) + Object",
        examples: [
            { en: "I visited Paris last year.", ru: "Я посетил Париж в прошлом году." },
            { en: "She bought a new car.", ru: "Она купила новую машину." },
            { en: "We met at the restaurant.", ru: "Мы встретились в ресторане." }
        ],
        exercise: {
            sentence: "He ___ to the cinema yesterday.",
            correctAnswer: "went",
            hint: "Используйте прошедшую форму глагола 'go'"
        }
    },
    {
        id: 4,
        title: "Future Simple (Будущее простое время)",
        rule: "Future Simple используется для выражения будущих действий, планов или предсказаний.",
        structure: "Subject + will + Verb(base form) + Object",
        examples: [
            { en: "I will call you tomorrow.", ru: "Я позвоню тебе завтра." },
            { en: "She will travel to Italy next month.", ru: "Она поедет в Италию в следующем месяце." },
            { en: "They will finish the project soon.", ru: "Они закончат проект скоро." }
        ],
        exercise: {
            sentence: "We ___ help you with your homework.",
            correctAnswer: "will",
            hint: "Используйте вспомогательный глагол 'will'"
        }
    },
    {
        id: 5,
        title: "Present Perfect (Настоящее совершенное время)",
        rule: "Present Perfect используется для выражения действий, которые произошли в прошлом, но имеют связь с настоящим.",
        structure: "Subject + have/has + Verb(past participle) + Object",
        examples: [
            { en: "I have finished my work.", ru: "Я закончил свою работу." },
            { en: "She has lived here for five years.", ru: "Она живет здесь пять лет." },
            { en: "They have never been to Japan.", ru: "Они никогда не были в Японии." }
        ],
        exercise: {
            sentence: "I ___ seen this movie before.",
            correctAnswer: "have",
            hint: "Используйте 'have' для первого лица единственного числа"
        }
    },
    {
        id: 6,
        title: "Articles: a, an, the (Артикли)",
        rule: "Артикль 'a/an' используется с исчисляемыми существительными в единственном числе (a - перед согласными, an - перед гласными). 'The' используется для указания на конкретный предмет.",
        structure: "a/an + singular noun / the + specific noun",
        examples: [
            { en: "I need a pen. The pen is blue.", ru: "Мне нужна ручка. Ручка синяя." },
            { en: "She is an engineer.", ru: "Она инженер." },
            { en: "The sun is shining today.", ru: "Солнце светит сегодня." }
        ],
        exercise: {
            sentence: "Can you give me ___ apple?",
            correctAnswer: "an",
            hint: "Используйте 'an' перед словами, начинающимися с гласной"
        }
    }
];

export { grammarData };

