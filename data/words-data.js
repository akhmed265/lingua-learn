// Данные словаря с категориями
const wordsData = [
    // Категория: Еда
    {
        id: 1,
        word: "apple",
        transcription: "/ˈæpl/",
        translation: "яблоко",
        category: "food",
        example: "I eat an apple every day."
    },
    {
        id: 2,
        word: "bread",
        transcription: "/bred/",
        translation: "хлеб",
        category: "food",
        example: "Please buy some bread from the store."
    },
    {
        id: 3,
        word: "water",
        transcription: "/ˈwɔːtər/",
        translation: "вода",
        category: "food",
        example: "Can I have a glass of water?"
    },
    {
        id: 4,
        word: "coffee",
        transcription: "/ˈkɔːfi/",
        translation: "кофе",
        category: "food",
        example: "I drink coffee in the morning."
    },
    {
        id: 5,
        word: "chicken",
        transcription: "/ˈtʃɪkɪn/",
        translation: "курица",
        category: "food",
        example: "We had chicken for dinner."
    },
    // Категория: Путешествия
    {
        id: 6,
        word: "airport",
        transcription: "/ˈeərpɔːrt/",
        translation: "аэропорт",
        category: "travel",
        example: "We arrived at the airport early."
    },
    {
        id: 7,
        word: "hotel",
        transcription: "/hoʊˈtel/",
        translation: "отель",
        category: "travel",
        example: "The hotel has a beautiful view."
    },
    {
        id: 8,
        word: "passport",
        transcription: "/ˈpæspɔːrt/",
        translation: "паспорт",
        category: "travel",
        example: "Don't forget your passport!"
    },
    {
        id: 9,
        word: "suitcase",
        transcription: "/ˈsuːtkeɪs/",
        translation: "чемодан",
        category: "travel",
        example: "I packed my suitcase yesterday."
    },
    {
        id: 10,
        word: "ticket",
        transcription: "/ˈtɪkɪt/",
        translation: "билет",
        category: "travel",
        example: "I bought a ticket to Paris."
    },
    // Категория: Бизнес
    {
        id: 11,
        word: "meeting",
        transcription: "/ˈmiːtɪŋ/",
        translation: "встреча",
        category: "business",
        example: "We have a meeting at 3 PM."
    },
    {
        id: 12,
        word: "contract",
        transcription: "/ˈkɒntrækt/",
        translation: "контракт",
        category: "business",
        example: "Please sign the contract."
    },
    {
        id: 13,
        word: "client",
        transcription: "/ˈklaɪənt/",
        translation: "клиент",
        category: "business",
        example: "Our client is very satisfied."
    },
    {
        id: 14,
        word: "deadline",
        transcription: "/ˈdedlaɪn/",
        translation: "срок",
        category: "business",
        example: "The deadline is tomorrow."
    },
    {
        id: 15,
        word: "salary",
        transcription: "/ˈsæləri/",
        translation: "зарплата",
        category: "business",
        example: "My salary increased this year."
    },
    // Категория: Семья
    {
        id: 16,
        word: "mother",
        transcription: "/ˈmʌðər/",
        translation: "мать",
        category: "family",
        example: "My mother is a teacher."
    },
    {
        id: 17,
        word: "father",
        transcription: "/ˈfɑːðər/",
        translation: "отец",
        category: "family",
        example: "My father works in an office."
    },
    {
        id: 18,
        word: "brother",
        transcription: "/ˈbrʌðər/",
        translation: "брат",
        category: "family",
        example: "I have an older brother."
    },
    {
        id: 19,
        word: "sister",
        transcription: "/ˈsɪstər/",
        translation: "сестра",
        category: "family",
        example: "My sister lives in London."
    },
    {
        id: 20,
        word: "cousin",
        transcription: "/ˈkʌzn/",
        translation: "двоюродный брат/сестра",
        category: "family",
        example: "I visited my cousin last week."
    },
    // Категория: Дом
    {
        id: 21,
        word: "kitchen",
        transcription: "/ˈkɪtʃɪn/",
        translation: "кухня",
        category: "home",
        example: "The kitchen is very spacious."
    },
    {
        id: 22,
        word: "bedroom",
        transcription: "/ˈbedruːm/",
        translation: "спальня",
        category: "home",
        example: "My bedroom has a large window."
    },
    {
        id: 23,
        word: "bathroom",
        transcription: "/ˈbæθruːm/",
        translation: "ванная",
        category: "home",
        example: "The bathroom needs renovation."
    },
    {
        id: 24,
        word: "garden",
        transcription: "/ˈɡɑːrdn/",
        translation: "сад",
        category: "home",
        example: "We have a beautiful garden."
    },
    {
        id: 25,
        word: "furniture",
        transcription: "/ˈfɜːrnɪtʃər/",
        translation: "мебель",
        category: "home",
        example: "We bought new furniture."
    }
];

export { wordsData, categories };

const categories = [
    { id: "all", name: "Все категории" },
    { id: "food", name: "Еда" },
    { id: "travel", name: "Путешествия" },
    { id: "business", name: "Бизнес" },
    { id: "family", name: "Семья" },
    { id: "home", name: "Дом" }
];

