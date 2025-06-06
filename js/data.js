
// Game data and user information
const gameData = [
    {
        id: 1,
        title: "The Witcher 3: Wild Hunt",
        genre: "RPG",
        rating: 9.3,
        image: "fas fa-dragon",
        description: "Epicki RPG z otwartym światem pełnym magii i przygód.",
        price: 149.99,
        releaseDate: "2015-05-19"
    },
    {
        id: 2,
        title: "Cyberpunk 2077",
        genre: "RPG",
        rating: 8.1,
        image: "fas fa-robot",
        description: "Futurystyczny RPG w neonowym Night City.",
        price: 199.99,
        releaseDate: "2020-12-10"
    },
    {
        id: 3,
        title: "Assassin's Creed Valhalla",
        genre: "Action",
        rating: 8.5,
        image: "fas fa-sword",
        description: "Wciel się w rolę wikińskiego wojownika Eivora.",
        price: 179.99,
        releaseDate: "2020-11-10"
    },
    {
        id: 4,
        title: "Civilization VI",
        genre: "Strategy",
        rating: 9.0,
        image: "fas fa-chess",
        description: "Zbuduj imperium, które przetrwa test czasu.",
        price: 129.99,
        releaseDate: "2016-10-21"
    },
    {
        id: 5,
        title: "Red Dead Redemption 2",
        genre: "Adventure",
        rating: 9.5,
        image: "fas fa-horse",
        description: "Epicki western o życiu outławów na Dzikim Zachodzie.",
        price: 199.99,
        releaseDate: "2018-10-26"
    },
    {
        id: 6,
        title: "Portal 2",
        genre: "Adventure",
        rating: 9.8,
        image: "fas fa-portal-enter",
        description: "Genialny puzzle z portalami i czarnym humorem.",
        price: 39.99,
        releaseDate: "2011-04-19"
    },
    {
        id: 7,
        title: "Doom Eternal",
        genre: "Action",
        rating: 8.7,
        image: "fas fa-fire",
        description: "Intensywny shooter z szybką akcją i demonami.",
        price: 119.99,
        releaseDate: "2020-03-20"
    },
    {
        id: 8,
        title: "Age of Empires IV",
        genre: "Strategy",
        rating: 8.3,
        image: "fas fa-castle",
        description: "Klasyczna strategia czasu rzeczywistego powraca.",
        price: 159.99,
        releaseDate: "2021-10-28"
    }
];

const aiRecommendations = [
    {
        id: 10,
        title: "Mass Effect Legendary Edition",
        genre: "RPG",
        rating: 9.2,
        image: "fas fa-rocket",
        description: "Remastered trilogy of the legendary space RPG series.",
        price: 179.99,
        releaseDate: "2021-05-14",
        aiReason: "Polecane na podstawie Twojego zamiłowania do RPG i gier fabularnych"
    },
    {
        id: 11,
        title: "Horizon Zero Dawn",
        genre: "Action RPG",
        rating: 8.9,
        image: "fas fa-bow-arrow",
        description: "Post-apocalyptic action RPG with robotic creatures.",
        price: 129.99,
        releaseDate: "2017-02-28",
        aiReason: "Idealne połączenie akcji i elementów RPG dla Twojego poziomu doświadczenia"
    }
];

const userData = {
    name: "Jan Kowalski",
    level: 15,
    gamesPlayed: 42,
    achievements: 127,
    hoursPlayed: 320,
    favoriteGenres: ["RPG", "Action", "Strategy"],
    memberSince: "2020"
};

// AI Chatbot responses
const chatbotResponses = {
    rpg: [
        "Świetny wybór! Polecam The Witcher 3 - to absolutny klasyk RPG z niesamowitą fabułą.",
        "Jeśli lubisz RPG, sprawdź Mass Effect Legendary Edition. To epicka saga kosmiczna!",
        "Cyberpunk 2077 to futurystyczny RPG, który może Cię zainteresować."
    ],
    action: [
        "Dla fanów akcji polecam Doom Eternal - intensywny shooter pełen adrenaliny!",
        "Assassin's Creed Valhalla oferuje świetną akcję w wikińskim klimacie.",
        "Red Dead Redemption 2 łączy akcję z niesamowitą fabułą westernową."
    ],
    strategy: [
        "Civilization VI to must-have dla fanów strategii turowych!",
        "Age of Empires IV to powrót klasycznej strategii czasu rzeczywistego.",
        "Jeśli lubisz strategię, sprawdź też Total War: Warhammer III."
    ],
    adventure: [
        "Portal 2 to genialna gra przygodowa z unikalną mechaniką portali.",
        "Horizon Zero Dawn oferuje wspaniałą przygodę w post-apokaliptycznym świecie.",
        "The Legend of Zelda: Breath of the Wild to prawdziwa perła gatunku!"
    ],
    default: [
        "Mogę polecić gry na podstawie Twoich preferencji. Jaki gatunek Cię interesuje?",
        "Sprawdź nasze polecane gry na stronie głównej! Mamy coś dla każdego gracza.",
        "Chcesz poznać najnowsze trendy w świecie gier? Zapytaj o konkretny gatunek!"
    ]
};
