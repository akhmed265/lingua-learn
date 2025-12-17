// Данные для викторины по уровням CEFR
const quizDataByLevel = {
    A1: [
        {
            id: 1,
            type: "multiple-choice",
            question: "What is the translation of 'apple'?",
            options: ["Яблоко", "Груша", "Апельсин", "Банан"],
            correctAnswer: 0,
            points: 10,
            level: "A1"
        },
        {
            id: 2,
            type: "multiple-choice",
            question: "Choose the correct form: I ___ to school every day.",
            options: ["go", "goes", "going", "went"],
            correctAnswer: 0,
            points: 10,
            level: "A1"
        },
        {
            id: 3,
            type: "multiple-choice",
            question: "What is the translation of 'mother'?",
            options: ["Отец", "Мать", "Брат", "Сестра"],
            correctAnswer: 1,
            points: 10,
            level: "A1"
        },
        {
            id: 4,
            type: "multiple-choice",
            question: "Choose the correct article: I need ___ pen.",
            options: ["a", "an", "the", "no article"],
            correctAnswer: 0,
            points: 10,
            level: "A1"
        },
        {
            id: 5,
            type: "multiple-choice",
            question: "What is the translation of 'water'?",
            options: ["Хлеб", "Вода", "Молоко", "Кофе"],
            correctAnswer: 1,
            points: 10,
            level: "A1"
        }
    ],
    A2: [
        {
            id: 6,
            type: "multiple-choice",
            question: "What is the past form of 'go'?",
            options: ["goed", "went", "gone", "going"],
            correctAnswer: 1,
            points: 10,
            level: "A2"
        },
        {
            id: 7,
            type: "multiple-choice",
            question: "Translate: 'Я изучаю английский язык.'",
            options: ["I study English.", "I am studying English.", "I studied English.", "I will study English."],
            correctAnswer: 1,
            points: 10,
            level: "A2"
        },
        {
            id: 8,
            type: "multiple-choice",
            question: "What is the translation of 'hotel'?",
            options: ["Больница", "Отель", "Школа", "Магазин"],
            correctAnswer: 1,
            points: 10,
            level: "A2"
        },
        {
            id: 9,
            type: "multiple-choice",
            question: "Choose the correct form: She ___ coffee every morning.",
            options: ["drink", "drinks", "drinking", "drank"],
            correctAnswer: 1,
            points: 10,
            level: "A2"
        },
        {
            id: 10,
            type: "multiple-choice",
            question: "What is the translation of 'suitcase'?",
            options: ["Рюкзак", "Чемодан", "Сумка", "Коробка"],
            correctAnswer: 1,
            points: 10,
            level: "A2"
        }
    ],
    B1: [
        {
            id: 11,
            type: "multiple-choice",
            question: "Translate: 'Он купил новую машину.'",
            options: ["He buys a new car.", "He is buying a new car.", "He bought a new car.", "He will buy a new car."],
            correctAnswer: 2,
            points: 15,
            level: "B1"
        },
        {
            id: 12,
            type: "multiple-choice",
            question: "What is the translation of 'deadline'?",
            options: ["Дедлайн", "Встреча", "Клиент", "Контракт"],
            correctAnswer: 0,
            points: 15,
            level: "B1"
        },
        {
            id: 13,
            type: "multiple-choice",
            question: "Choose: I ___ anxious about the exam tomorrow.",
            options: ["am", "is", "are", "be"],
            correctAnswer: 0,
            points: 15,
            level: "B1"
        },
        {
            id: 14,
            type: "multiple-choice",
            question: "What does 'pollution' mean?",
            options: ["Загрязнение", "Переработка", "Экология", "Окружающая среда"],
            correctAnswer: 0,
            points: 15,
            level: "B1"
        }
    ],
    B2: [
        {
            id: 15,
            type: "multiple-choice",
            question: "What is the translation of 'merger'?",
            options: ["Приобретение", "Слияние", "Доход", "Дивиденд"],
            correctAnswer: 1,
            points: 20,
            level: "B2"
        },
        {
            id: 16,
            type: "multiple-choice",
            question: "Choose: The company announced a major ___.",
            options: ["merger", "acquisition", "revenue", "strategy"],
            correctAnswer: 1,
            points: 20,
            level: "B2"
        },
        {
            id: 17,
            type: "multiple-choice",
            question: "What does 'innovation' mean?",
            options: ["Технология", "Инновация", "Алгоритм", "Кибербезопасность"],
            correctAnswer: 1,
            points: 20,
            level: "B2"
        }
    ],
    C1: [
        {
            id: 18,
            type: "multiple-choice",
            question: "What is the translation of 'entrepreneurship'?",
            options: ["Предпринимательство", "Консолидация", "Дочерняя компания", "Амортизация"],
            correctAnswer: 0,
            points: 25,
            level: "C1"
        },
        {
            id: 19,
            type: "multiple-choice",
            question: "Choose: We need to ___ our existing resources.",
            options: ["leverage", "consolidate", "amortize", "subsidiary"],
            correctAnswer: 0,
            points: 25,
            level: "C1"
        },
        {
            id: 20,
            type: "multiple-choice",
            question: "What does 'paradigm' mean?",
            options: ["Гипотеза", "Парадигма", "Методология", "Эмпирический"],
            correctAnswer: 1,
            points: 25,
            level: "C1"
        }
    ],
    C2: [
        {
            id: 21,
            type: "multiple-choice",
            question: "What is 'arbitrage'?",
            options: ["Арбитраж", "Дериватив", "Хедж-фонд", "Неплатежеспособность"],
            correctAnswer: 0,
            points: 30,
            level: "C2"
        },
        {
            id: 22,
            type: "multiple-choice",
            question: "What does 'existentialism' mean?",
            options: ["Феноменология", "Экзистенциализм", "Герменевтика", "Парадокс"],
            correctAnswer: 1,
            points: 30,
            level: "C2"
        }
    ]
};

// Для обратной совместимости - все вопросы
const quizData = Object.values(quizDataByLevel).flat();

// Данные для викторины (старая версия для совместимости)
const oldQuizData = [
    {
        id: 1,
        type: "multiple-choice",
        question: "What is the translation of 'apple'?",
        options: ["Яблоко", "Груша", "Апельсин", "Банан"],
        correctAnswer: 0,
        points: 10
    },
    {
        id: 2,
        type: "multiple-choice",
        question: "Choose the correct form: I ___ to school every day.",
        options: ["go", "goes", "going", "went"],
        correctAnswer: 0,
        points: 10
    },
    {
        id: 3,
        type: "multiple-choice",
        question: "What is the past form of 'go'?",
        options: ["goed", "went", "gone", "going"],
        correctAnswer: 1,
        points: 10
    },
    {
        id: 4,
        type: "multiple-choice",
        question: "Translate: 'Я изучаю английский язык.'",
        options: ["I study English.", "I am studying English.", "I studied English.", "I will study English."],
        correctAnswer: 1,
        points: 10
    },
    {
        id: 5,
        type: "multiple-choice",
        question: "What is the translation of 'meeting'?",
        options: ["Встреча", "Обед", "Письмо", "Телефон"],
        correctAnswer: 0,
        points: 10
    },
    {
        id: 6,
        type: "multiple-choice",
        question: "Choose the correct article: I need ___ pen.",
        options: ["a", "an", "the", "no article"],
        correctAnswer: 0,
        points: 10
    },
    {
        id: 7,
        type: "multiple-choice",
        question: "What is the translation of 'hotel'?",
        options: ["Больница", "Отель", "Школа", "Магазин"],
        correctAnswer: 1,
        points: 10
    },
    {
        id: 8,
        type: "multiple-choice",
        question: "Choose the correct form: She ___ coffee every morning.",
        options: ["drink", "drinks", "drinking", "drank"],
        correctAnswer: 1,
        points: 10
    },
    {
        id: 9,
        type: "multiple-choice",
        question: "Translate: 'Он купил новую машину.'",
        options: ["He buys a new car.", "He is buying a new car.", "He bought a new car.", "He will buy a new car."],
        correctAnswer: 2,
        points: 10
    },
    {
        id: 10,
        type: "multiple-choice",
        question: "What is the translation of 'suitcase'?",
        options: ["Рюкзак", "Чемодан", "Сумка", "Коробка"],
        correctAnswer: 1,
        points: 10
    }
];

// Данные для аудирования по уровням
const listeningDataByLevel = {
    A1: [
        {
            id: 1,
            level: "A1",
            title: "At the Airport",
            text: "Hello, I would like to check in for my flight. Here is my passport and ticket. Thank you. Your gate number is A12. The flight departs at 3:30 PM. Have a nice flight!",
            questions: [
                {
                    question: "Where does this conversation take place?",
                    options: ["At a hotel", "At an airport", "At a restaurant", "At a store"],
                    correctAnswer: 1
                },
                {
                    question: "What time does the flight depart?",
                    options: ["2:30 PM", "3:30 PM", "4:30 PM", "5:30 PM"],
                    correctAnswer: 1
                }
            ]
        },
        {
            id: 2,
            level: "A1",
            title: "Ordering Coffee",
            text: "Good morning! I would like a large coffee with milk, please. Would you like anything else? Yes, I'll also have a croissant. That will be five dollars. Here you are. Thank you!",
            questions: [
                {
                    question: "What does the customer order?",
                    options: ["Tea and cookies", "Coffee and croissant", "Juice and sandwich", "Water and cake"],
                    correctAnswer: 1
                },
                {
                    question: "How much does the order cost?",
                    options: ["Three dollars", "Four dollars", "Five dollars", "Six dollars"],
                    correctAnswer: 2
                }
            ]
        }
    ],
    A2: [
        {
            id: 3,
            level: "A2",
            title: "At the Hotel",
            text: "Good evening, I have a reservation under the name Smith. Yes, we have your reservation for two nights. Your room is on the third floor. The room has a beautiful view of the city. Breakfast is served from 7 to 10 in the morning.",
            questions: [
                {
                    question: "How many nights is the reservation for?",
                    options: ["One night", "Two nights", "Three nights", "Four nights"],
                    correctAnswer: 1
                },
                {
                    question: "When is breakfast served?",
                    options: ["6 to 9 AM", "7 to 10 AM", "8 to 11 AM", "9 to 12 PM"],
                    correctAnswer: 1
                }
            ]
        }
    ],
    B1: [
        {
            id: 4,
            level: "B1",
            title: "Business Meeting",
            text: "Welcome everyone to today's meeting. We need to discuss the project deadline. The client wants the project completed by next Friday. That gives us ten days. I think we can manage that. Let's review the current progress.",
            questions: [
                {
                    question: "What is the main topic of the meeting?",
                    options: ["New client", "Project deadline", "Budget review", "Team changes"],
                    correctAnswer: 1
                },
                {
                    question: "When does the client want the project completed?",
                    options: ["This Friday", "Next Friday", "In two weeks", "Next month"],
                    correctAnswer: 1
                }
            ]
        }
    ],
    B2: [
        {
            id: 5,
            level: "B2",
            title: "Academic Discussion",
            text: "Today we'll discuss the methodology of our research. We need to ensure our approach is rigorous and our data collection methods are sound. The theoretical framework we've chosen is well-established in the field.",
            questions: [
                {
                    question: "What is the focus of the discussion?",
                    options: ["Data analysis", "Research methodology", "Theoretical framework", "All of the above"],
                    correctAnswer: 3
                }
            ]
        }
    ]
};

// Все диалоги для обратной совместимости
const listeningData = Object.values(listeningDataByLevel).flat();

// Старые данные для обратной совместимости
const oldListeningData = [
    {
        id: 1,
        title: "At the Airport",
        text: "Hello, I would like to check in for my flight. Here is my passport and ticket. Thank you. Your gate number is A12. The flight departs at 3:30 PM. Have a nice flight!",
        questions: [
            {
                question: "Where does this conversation take place?",
                options: ["At a hotel", "At an airport", "At a restaurant", "At a store"],
                correctAnswer: 1
            },
            {
                question: "What time does the flight depart?",
                options: ["2:30 PM", "3:30 PM", "4:30 PM", "5:30 PM"],
                correctAnswer: 1
            }
        ]
    },
    {
        id: 2,
        title: "Ordering Coffee",
        text: "Good morning! I would like a large coffee with milk, please. Would you like anything else? Yes, I'll also have a croissant. That will be five dollars. Here you are. Thank you!",
        questions: [
            {
                question: "What does the customer order?",
                options: ["Tea and cookies", "Coffee and croissant", "Juice and sandwich", "Water and cake"],
                correctAnswer: 1
            },
            {
                question: "How much does the order cost?",
                options: ["Three dollars", "Four dollars", "Five dollars", "Six dollars"],
                correctAnswer: 2
            }
        ]
    }
];

// Данные для конструктора предложений
const sentenceBuilderData = [
    {
        id: 1,
        correctSentence: "I go to school every day",
        words: ["every", "go", "I", "school", "to", "day"],
        hint: "Составьте предложение о регулярном действии"
    },
    {
        id: 2,
        correctSentence: "She likes to read books",
        words: ["books", "likes", "read", "She", "to"],
        hint: "Составьте предложение о предпочтениях"
    },
    {
        id: 3,
        correctSentence: "We are studying English now",
        words: ["English", "We", "studying", "now", "are"],
        hint: "Составьте предложение о текущем действии"
    },
    {
        id: 4,
        correctSentence: "They visited Paris last year",
        words: ["last", "visited", "Paris", "year", "They"],
        hint: "Составьте предложение о прошлом действии"
    },
    {
        id: 5,
        correctSentence: "I will call you tomorrow",
        words: ["you", "I", "call", "tomorrow", "will"],
        hint: "Составьте предложение о будущем действии"
    }
];

export { quizData, quizDataByLevel, listeningData, listeningDataByLevel, sentenceBuilderData };

