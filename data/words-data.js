// Данные словаря с категориями и уровнями CEFR
const wordsData = [
    // ===== УРОВЕНЬ A1 (Начальный) =====
    // Категория: Еда
    { id: 1, word: "apple", transcription: "/ˈæpl/", translation: "яблоко", category: "food", level: "A1", example: "I eat an apple every day." },
    { id: 2, word: "bread", transcription: "/bred/", translation: "хлеб", category: "food", level: "A1", example: "Please buy some bread from the store." },
    { id: 3, word: "water", transcription: "/ˈwɔːtər/", translation: "вода", category: "food", level: "A1", example: "Can I have a glass of water?" },
    { id: 4, word: "coffee", transcription: "/ˈkɔːfi/", translation: "кофе", category: "food", level: "A1", example: "I drink coffee in the morning." },
    { id: 5, word: "milk", transcription: "/mɪlk/", translation: "молоко", category: "food", level: "A1", example: "The milk is in the fridge." },
    { id: 6, word: "egg", transcription: "/eɡ/", translation: "яйцо", category: "food", level: "A1", example: "I had eggs for breakfast." },
    { id: 7, word: "banana", transcription: "/bəˈnænə/", translation: "банан", category: "food", level: "A1", example: "Do you like bananas?" },
    
    // Категория: Семья
    { id: 8, word: "mother", transcription: "/ˈmʌðər/", translation: "мать", category: "family", level: "A1", example: "My mother is a teacher." },
    { id: 9, word: "father", transcription: "/ˈfɑːðər/", translation: "отец", category: "family", level: "A1", example: "My father works in an office." },
    { id: 10, word: "brother", transcription: "/ˈbrʌðər/", translation: "брат", category: "family", level: "A1", example: "I have an older brother." },
    { id: 11, word: "sister", transcription: "/ˈsɪstər/", translation: "сестра", category: "family", level: "A1", example: "My sister lives in London." },
    { id: 12, word: "son", transcription: "/sʌn/", translation: "сын", category: "family", level: "A1", example: "Their son is five years old." },
    { id: 13, word: "daughter", transcription: "/ˈdɔːtər/", translation: "дочь", category: "family", level: "A1", example: "She has a beautiful daughter." },
    
    // Категория: Дом
    { id: 14, word: "kitchen", transcription: "/ˈkɪtʃɪn/", translation: "кухня", category: "home", level: "A1", example: "The kitchen is very spacious." },
    { id: 15, word: "bedroom", transcription: "/ˈbedruːm/", translation: "спальня", category: "home", level: "A1", example: "My bedroom has a large window." },
    { id: 16, word: "bathroom", transcription: "/ˈbæθruːm/", translation: "ванная", category: "home", level: "A1", example: "The bathroom needs renovation." },
    { id: 17, word: "table", transcription: "/ˈteɪbl/", translation: "стол", category: "home", level: "A1", example: "We sit at the table for dinner." },
    { id: 18, word: "chair", transcription: "/tʃer/", translation: "стул", category: "home", level: "A1", example: "Please sit on the chair." },
    
    // Категория: Цвета
    { id: 19, word: "red", transcription: "/red/", translation: "красный", category: "colors", level: "A1", example: "The apple is red." },
    { id: 20, word: "blue", transcription: "/bluː/", translation: "синий", category: "colors", level: "A1", example: "The sky is blue today." },
    { id: 21, word: "green", transcription: "/ɡriːn/", translation: "зеленый", category: "colors", level: "A1", example: "I like green grass." },
    
    // ===== УРОВЕНЬ A2 (Элементарный) =====
    // Категория: Еда
    { id: 22, word: "chicken", transcription: "/ˈtʃɪkɪn/", translation: "курица", category: "food", level: "A2", example: "We had chicken for dinner." },
    { id: 23, word: "restaurant", transcription: "/ˈrestrɒnt/", translation: "ресторан", category: "food", level: "A2", example: "Let's go to a restaurant tonight." },
    { id: 24, word: "menu", transcription: "/ˈmenjuː/", translation: "меню", category: "food", level: "A2", example: "Could I see the menu, please?" },
    { id: 25, word: "delicious", transcription: "/dɪˈlɪʃəs/", translation: "вкусный", category: "food", level: "A2", example: "This food is absolutely delicious." },
    
    // Категория: Путешествия
    { id: 26, word: "airport", transcription: "/ˈeərpɔːrt/", translation: "аэропорт", category: "travel", level: "A2", example: "We arrived at the airport early." },
    { id: 27, word: "hotel", transcription: "/hoʊˈtel/", translation: "отель", category: "travel", level: "A2", example: "The hotel has a beautiful view." },
    { id: 28, word: "passport", transcription: "/ˈpæspɔːrt/", translation: "паспорт", category: "travel", level: "A2", example: "Don't forget your passport!" },
    { id: 29, word: "suitcase", transcription: "/ˈsuːtkeɪs/", translation: "чемодан", category: "travel", level: "A2", example: "I packed my suitcase yesterday." },
    { id: 30, word: "ticket", transcription: "/ˈtɪkɪt/", translation: "билет", category: "travel", level: "A2", example: "I bought a ticket to Paris." },
    { id: 31, word: "luggage", transcription: "/ˈlʌɡɪdʒ/", translation: "багаж", category: "travel", level: "A2", example: "Where is my luggage?" },
    { id: 32, word: "journey", transcription: "/ˈdʒɜːni/", translation: "путешествие", category: "travel", level: "A2", example: "It was a long journey to the mountains." },
    
    // Категория: Работа
    { id: 33, word: "office", transcription: "/ˈɒfɪs/", translation: "офис", category: "work", level: "A2", example: "I work in an office downtown." },
    { id: 34, word: "colleague", transcription: "/ˈkɒliːɡ/", translation: "коллега", category: "work", level: "A2", example: "My colleague helped me with the project." },
    { id: 35, word: "meeting", transcription: "/ˈmiːtɪŋ/", translation: "встреча", category: "work", level: "A2", example: "We have a meeting at 3 PM." },
    { id: 36, word: "computer", transcription: "/kəmˈpjuːtər/", translation: "компьютер", category: "work", level: "A2", example: "I use my computer every day." },
    
    // ===== УРОВЕНЬ B1 (Средний) =====
    // Категория: Бизнес
    { id: 37, word: "contract", transcription: "/ˈkɒntrækt/", translation: "контракт", category: "business", level: "B1", example: "Please sign the contract." },
    { id: 38, word: "client", transcription: "/ˈklaɪənt/", translation: "клиент", category: "business", level: "B1", example: "Our client is very satisfied." },
    { id: 39, word: "deadline", transcription: "/ˈdedlaɪn/", translation: "срок", category: "business", level: "B1", example: "The deadline is tomorrow." },
    { id: 40, word: "salary", transcription: "/ˈsæləri/", translation: "зарплата", category: "business", level: "B1", example: "My salary increased this year." },
    { id: 41, word: "negotiate", transcription: "/nɪˈɡəʊʃieɪt/", translation: "вести переговоры", category: "business", level: "B1", example: "We need to negotiate the terms." },
    { id: 42, word: "promotion", transcription: "/prəˈməʊʃn/", translation: "продвижение по службе", category: "business", level: "B1", example: "She got a promotion last month." },
    { id: 43, word: "budget", transcription: "/ˈbʌdʒɪt/", translation: "бюджет", category: "business", level: "B1", example: "We need to stick to the budget." },
    { id: 44, word: "strategy", transcription: "/ˈstrætədʒi/", translation: "стратегия", category: "business", level: "B1", example: "We developed a new marketing strategy." },
    
    // Категория: Эмоции и чувства
    { id: 45, word: "anxious", transcription: "/ˈæŋkʃəs/", translation: "тревожный, обеспокоенный", category: "emotions", level: "B1", example: "I'm anxious about the exam." },
    { id: 46, word: "confident", transcription: "/ˈkɒnfɪdənt/", translation: "уверенный", category: "emotions", level: "B1", example: "She is very confident in her abilities." },
    { id: 47, word: "embarrassed", transcription: "/ɪmˈbærəst/", translation: "смущенный", category: "emotions", level: "B1", example: "I was embarrassed by my mistake." },
    { id: 48, word: "relieved", transcription: "/rɪˈliːvd/", translation: "облегченный", category: "emotions", level: "B1", example: "I was relieved to hear the good news." },
    
    // Категория: Образование
    { id: 49, word: "assignment", transcription: "/əˈsaɪnmənt/", translation: "задание", category: "education", level: "B1", example: "I have to finish my assignment by Friday." },
    { id: 50, word: "lecture", transcription: "/ˈlektʃər/", translation: "лекция", category: "education", level: "B1", example: "The lecture was very interesting." },
    { id: 51, word: "scholarship", transcription: "/ˈskɒləʃɪp/", translation: "стипендия", category: "education", level: "B1", example: "She received a scholarship to study abroad." },
    { id: 52, word: "graduate", transcription: "/ˈɡrædʒuət/", translation: "выпускник, заканчивать обучение", category: "education", level: "B1", example: "I will graduate next year." },
    
    // Категория: Окружающая среда
    { id: 53, word: "pollution", transcription: "/pəˈluːʃn/", translation: "загрязнение", category: "environment", level: "B1", example: "Air pollution is a serious problem." },
    { id: 54, word: "recycle", transcription: "/ˌriːˈsaɪkl/", translation: "перерабатывать", category: "environment", level: "B1", example: "We should recycle more plastic." },
    { id: 55, word: "sustainable", transcription: "/səˈsteɪnəbl/", translation: "устойчивый, экологичный", category: "environment", level: "B1", example: "We need sustainable energy sources." },
    
    // ===== УРОВЕНЬ B2 (Выше среднего) =====
    // Категория: Бизнес
    { id: 56, word: "merger", transcription: "/ˈmɜːdʒər/", translation: "слияние", category: "business", level: "B2", example: "The merger between the two companies was announced." },
    { id: 57, word: "acquisition", transcription: "/ˌækwɪˈzɪʃn/", translation: "приобретение", category: "business", level: "B2", example: "The company announced a major acquisition." },
    { id: 58, word: "stakeholder", transcription: "/ˈsteɪkhəʊldər/", translation: "заинтересованная сторона", category: "business", level: "B2", example: "We need to consider all stakeholders." },
    { id: 59, word: "dividend", transcription: "/ˈdɪvɪdend/", translation: "дивиденд", category: "business", level: "B2", example: "The company pays annual dividends." },
    { id: 60, word: "revenue", transcription: "/ˈrevənjuː/", translation: "доход, выручка", category: "business", level: "B2", example: "Our revenue increased by 20% this quarter." },
    
    // Категория: Наука и технологии
    { id: 61, word: "algorithm", transcription: "/ˈælɡərɪðəm/", translation: "алгоритм", category: "technology", level: "B2", example: "The algorithm processes data efficiently." },
    { id: 62, word: "artificial intelligence", transcription: "/ˌɑːtɪˈfɪʃl ɪnˈtelɪdʒəns/", translation: "искусственный интеллект", category: "technology", level: "B2", example: "Artificial intelligence is transforming industries." },
    { id: 63, word: "cybersecurity", transcription: "/ˈsaɪbərsɪˌkjʊərəti/", translation: "кибербезопасность", category: "technology", level: "B2", example: "Cybersecurity is crucial for online safety." },
    { id: 64, word: "innovation", transcription: "/ˌɪnəˈveɪʃn/", translation: "инновация", category: "technology", level: "B2", example: "Innovation drives economic growth." },
    
    // Категория: Медицина
    { id: 65, word: "diagnosis", transcription: "/ˌdaɪəɡˈnəʊsɪs/", translation: "диагноз", category: "health", level: "B2", example: "The doctor made an accurate diagnosis." },
    { id: 66, word: "symptom", transcription: "/ˈsɪmptəm/", translation: "симптом", category: "health", level: "B2", example: "The symptoms appeared suddenly." },
    { id: 67, word: "treatment", transcription: "/ˈtriːtmənt/", translation: "лечение", category: "health", level: "B2", example: "The new treatment showed promising results." },
    { id: 68, word: "prescription", transcription: "/prɪˈskrɪpʃn/", translation: "рецепт", category: "health", level: "B2", example: "The doctor wrote a prescription for antibiotics." },
    
    // Категория: Образование
    { id: 69, word: "curriculum", transcription: "/kəˈrɪkjələm/", translation: "учебная программа", category: "education", level: "B2", example: "The curriculum was updated this year." },
    { id: 70, word: "dissertation", transcription: "/ˌdɪsəˈteɪʃn/", translation: "диссертация", category: "education", level: "B2", example: "She is writing her dissertation on linguistics." },
    { id: 71, word: "tuition", transcription: "/tjuˈɪʃn/", translation: "обучение, плата за обучение", category: "education", level: "B2", example: "University tuition fees are very high." },
    
    // Категория: Политика
    { id: 72, word: "legislation", transcription: "/ˌledʒɪsˈleɪʃn/", translation: "законодательство", category: "politics", level: "B2", example: "New legislation was passed last month." },
    { id: 73, word: "democracy", transcription: "/dɪˈmɒkrəsi/", translation: "демократия", category: "politics", level: "B2", example: "Democracy requires active participation." },
    { id: 74, word: "election", transcription: "/ɪˈlekʃn/", translation: "выборы", category: "politics", level: "B2", example: "The election results were announced yesterday." },
    
    // ===== УРОВЕНЬ C1 (Продвинутый) =====
    // Категория: Бизнес
    { id: 75, word: "entrepreneurship", transcription: "/ˌɒntrəprəˈnɜːʃɪp/", translation: "предпринимательство", category: "business", level: "C1", example: "Entrepreneurship requires courage and innovation." },
    { id: 76, word: "amortization", transcription: "/əˌmɔːtɪˈzeɪʃn/", translation: "амортизация", category: "business", level: "C1", example: "The amortization period is 10 years." },
    { id: 77, word: "consolidation", transcription: "/kənˌsɒlɪˈdeɪʃn/", translation: "консолидация", category: "business", level: "C1", example: "The consolidation of the departments improved efficiency." },
    { id: 78, word: "subsidiary", transcription: "/səbˈsɪdiəri/", translation: "дочерняя компания", category: "business", level: "C1", example: "The company has subsidiaries in 20 countries." },
    { id: 79, word: "leverage", transcription: "/ˈliːvərɪdʒ/", translation: "использовать, рычаг", category: "business", level: "C1", example: "We need to leverage our existing resources." },
    
    // Категория: Наука
    { id: 80, word: "hypothesis", transcription: "/haɪˈpɒθəsɪs/", translation: "гипотеза", category: "science", level: "C1", example: "The scientist tested her hypothesis." },
    { id: 81, word: "methodology", transcription: "/ˌmeθəˈdɒlədʒi/", translation: "методология", category: "science", level: "C1", example: "The research methodology was rigorous." },
    { id: 82, word: "empirical", transcription: "/ɪmˈpɪrɪkl/", translation: "эмпирический", category: "science", level: "C1", example: "We need empirical evidence to support this." },
    { id: 83, word: "paradigm", transcription: "/ˈpærədaɪm/", translation: "парадигма", category: "science", level: "C1", example: "This represents a paradigm shift in thinking." },
    { id: 84, word: "theoretical", transcription: "/θɪəˈretɪkl/", translation: "теоретический", category: "science", level: "C1", example: "The theoretical framework is sound." },
    
    // Категория: Философия и психология
    { id: 85, word: "consciousness", transcription: "/ˈkɒnʃəsnəs/", translation: "сознание", category: "philosophy", level: "C1", example: "The nature of consciousness is still debated." },
    { id: 86, word: "metaphysical", transcription: "/ˌmetəˈfɪzɪkl/", translation: "метафизический", category: "philosophy", level: "C1", example: "This is a metaphysical question." },
    { id: 87, word: "paradox", transcription: "/ˈpærədɒks/", translation: "парадокс", category: "philosophy", level: "C1", example: "This situation presents an interesting paradox." },
    { id: 88, word: "epistemology", transcription: "/ɪˌpɪstɪˈmɒlədʒi/", translation: "эпистемология", category: "philosophy", level: "C1", example: "Epistemology deals with the nature of knowledge." },
    
    // Категория: Литература
    { id: 89, word: "allegory", transcription: "/ˈæləɡəri/", translation: "аллегория", category: "literature", level: "C1", example: "The novel is an allegory of modern society." },
    { id: 90, word: "metaphor", transcription: "/ˈmetəfər/", translation: "метафора", category: "literature", level: "C1", example: "The author used powerful metaphors throughout." },
    { id: 91, word: "prose", transcription: "/prəʊz/", translation: "проза", category: "literature", level: "C1", example: "Her prose is elegant and refined." },
    
    // Категория: Право
    { id: 92, word: "jurisdiction", transcription: "/ˌdʒʊərɪsˈdɪkʃn/", translation: "юрисдикция", category: "law", level: "C1", example: "This falls under federal jurisdiction." },
    { id: 93, word: "litigation", transcription: "/ˌlɪtɪˈɡeɪʃn/", translation: "судебное разбирательство", category: "law", level: "C1", example: "The company is involved in ongoing litigation." },
    { id: 94, word: "precedent", transcription: "/ˈpresɪdənt/", translation: "прецедент", category: "law", level: "C1", example: "This case sets an important legal precedent." },
    
    // ===== УРОВЕНЬ C2 (Профессиональный) =====
    // Категория: Бизнес
    { id: 95, word: "arbitrage", transcription: "/ˈɑːbɪtrɑːʒ/", translation: "арбитраж", category: "business", level: "C2", example: "Currency arbitrage can be profitable." },
    { id: 96, word: "derivative", transcription: "/dɪˈrɪvətɪv/", translation: "дериватив, производный", category: "business", level: "C2", example: "Financial derivatives are complex instruments." },
    { id: 97, word: "hedge fund", transcription: "/hedʒ fʌnd/", translation: "хедж-фонд", category: "business", level: "C2", example: "The hedge fund reported strong returns." },
    { id: 98, word: "insolvency", transcription: "/ɪnˈsɒlvənsi/", translation: "неплатежеспособность", category: "business", level: "C2", example: "The company filed for insolvency." },
    { id: 99, word: "synergy", transcription: "/ˈsɪnədʒi/", translation: "синергия", category: "business", level: "C2", example: "The merger created significant synergies." },
    
    // Категория: Наука
    { id: 100, word: "quantum mechanics", transcription: "/ˈkwɒntəm mɪˈkænɪks/", translation: "квантовая механика", category: "science", level: "C2", example: "Quantum mechanics revolutionized physics." },
    { id: 101, word: "thermodynamics", transcription: "/ˌθɜːməʊdaɪˈnæmɪks/", translation: "термодинамика", category: "science", level: "C2", example: "The laws of thermodynamics are fundamental." },
    { id: 102, word: "phylogenetics", transcription: "/ˌfaɪləʊdʒɪˈnetɪks/", translation: "филогенетика", category: "science", level: "C2", example: "Phylogenetics studies evolutionary relationships." },
    { id: 103, word: "nanotechnology", transcription: "/ˌnænəʊtekˈnɒlədʒi/", translation: "нанотехнология", category: "science", level: "C2", example: "Nanotechnology has many applications." },
    
    // Категория: Философия
    { id: 104, word: "existentialism", transcription: "/ˌeɡzɪˈstenʃəlɪzəm/", translation: "экзистенциализм", category: "philosophy", level: "C2", example: "Existentialism emphasizes individual freedom." },
    { id: 105, word: "phenomenology", transcription: "/fɪˌnɒmɪˈnɒlədʒi/", translation: "феноменология", category: "philosophy", level: "C2", example: "Phenomenology explores conscious experience." },
    { id: 106, word: "hermeneutics", transcription: "/ˌhɜːmɪˈnjuːtɪks/", translation: "герменевтика", category: "philosophy", level: "C2", example: "Hermeneutics is the theory of interpretation." },
    
    // Категория: Литература
    { id: 107, word: "synecdoche", transcription: "/sɪˈnekdəki/", translation: "синекдоха", category: "literature", level: "C2", example: "The author employed synecdoche effectively." },
    { id: 108, word: "alliteration", transcription: "/əˌlɪtəˈreɪʃn/", translation: "аллитерация", category: "literature", level: "C2", example: "The poem uses alliteration beautifully." },
    { id: 109, word: "anachronism", transcription: "/əˈnækrənɪzəm/", translation: "анахронизм", category: "literature", level: "C2", example: "The historical novel contained an anachronism." },
    
    // Категория: Право
    { id: 110, word: "extradition", transcription: "/ˌekstrəˈdɪʃn/", translation: "экстрадиция", category: "law", level: "C2", example: "The extradition request was approved." },
    { id: 111, word: "eminent domain", transcription: "/ˈemɪnənt dəˈmeɪn/", translation: "принудительное отчуждение", category: "law", level: "C2", example: "The property was seized under eminent domain." },
    { id: 112, word: "habeas corpus", transcription: "/ˌheɪbiəs ˈkɔːpəs/", translation: "хабеас корпус", category: "law", level: "C2", example: "The lawyer filed a habeas corpus petition." }
];

// Категории
const categories = [
    { id: "all", name: "Все категории" },
    { id: "food", name: "Еда" },
    { id: "family", name: "Семья" },
    { id: "home", name: "Дом" },
    { id: "colors", name: "Цвета" },
    { id: "travel", name: "Путешествия" },
    { id: "work", name: "Работа" },
    { id: "business", name: "Бизнес" },
    { id: "emotions", name: "Эмоции" },
    { id: "education", name: "Образование" },
    { id: "environment", name: "Окружающая среда" },
    { id: "technology", name: "Технологии" },
    { id: "health", name: "Здоровье" },
    { id: "politics", name: "Политика" },
    { id: "science", name: "Наука" },
    { id: "philosophy", name: "Философия" },
    { id: "literature", name: "Литература" },
    { id: "law", name: "Право" }
];

// Уровни CEFR
const cefrLevels = [
    { id: "all", name: "Все уровни" },
    { id: "A1", name: "A1 - Начальный", color: "#4CAF50" },
    { id: "A2", name: "A2 - Элементарный", color: "#8BC34A" },
    { id: "B1", name: "B1 - Средний", color: "#FFC107" },
    { id: "B2", name: "B2 - Выше среднего", color: "#FF9800" },
    { id: "C1", name: "C1 - Продвинутый", color: "#F44336" },
    { id: "C2", name: "C2 - Профессиональный", color: "#9C27B0" }
];

export { wordsData, categories, cefrLevels };
