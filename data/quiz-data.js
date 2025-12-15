// Данные для викторины
const quizData = [
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

// Данные для аудирования (текстовые диалоги для text-to-speech)
const listeningData = [
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

export { quizData, listeningData, sentenceBuilderData };

