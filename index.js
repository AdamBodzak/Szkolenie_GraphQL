const { ApolloServer, gql } = require("apollo-server");
const Quotes = require("inspirational-quotes");
const PORT = process.env.PORT || 4000;
const typeDefs = gql`
    type Query {
        greeting: String!
        schroedingersCatGreeting: String
        interestingUrls: [String!]!
        randomDiceThrow: Int!
        counter: Int!
        fewRandomDiceThrows: [Int!]!
        pi: Float!
        isTodayFriday: Boolean!
        randomCoinTossesUntilTrue: [Boolean!]!
        today: DayOfWeek!
        workDay: [DayOfWeek!]!
        currentMonth: Month!
        monthsElapsed: [Month!]!
        unpredicTableA: [Int!]
        unpredicTableB: [Int]!
        unpredicTableC: [[Int!]!]!
        randomQuote: Quote!
        fewRandomQuotes: [Quote!]!
        time: Time
    }

    type Time {
    hours: Float
    minutes: Float
    seconds: Float
  }

    type Quote {
        text: String!
        author: String!
    }

    enum DayOfWeek {
        MON
        TUE
        WED
        THU
        SET
        FRI
        SUN
    }
    enum Month {
        JAN
        FEB
        MAR
        APR
        MAY
        JUN
        JUL
        AUG
        SEP
        OCT
        NOV
        DEC
    }
`;
let number = 1;
let arrFewRandomDiceThrows = [];
let CallingNumberUnpredicTableA = 1;
let CallingNumberUnpredicTableB = 1;
let numberTableC = 0;
let arrUnpredicTableC = [];
function rootValue() {
    const getRandomDiceThrow = (sides) => Math.ceil(Math.random() * sides);
    const getCounter = () => number++;
    const getFewRandomDiceThrows = () => {
        if (arrFewRandomDiceThrows.length<3) {
            do {
                arrFewRandomDiceThrows.push(getRandomDiceThrow(6));
            } while (arrFewRandomDiceThrows.length<3)
        } else if (arrFewRandomDiceThrows.length=7) {
            arrFewRandomDiceThrows.shift();
            arrFewRandomDiceThrows.push(getRandomDiceThrow(6));
        };
        return arrFewRandomDiceThrows;
    };
    const today = new Date();
    const DAY_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const MOUNT_OF_YER = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const randomCoinTosses = () => Math.random() > 0.5;
    const getRandomCoinTossesUntilTrue = () => {
        const result = [];
        do {
            result.push(randomCoinTosses());
        } while (!result[result.length-1])
        return result;
    };
    const getUnpredicTableA = () => {
        const arrResult = (CallingNumberUnpredicTableA % 2 === 0) ? null : [1,2,3];
        CallingNumberUnpredicTableA++;
        return arrResult;
    };
    const getUnpredicTableB = () => {
        const arrResult = [];
        if (CallingNumberUnpredicTableB === 1) {
            arrResult.splice(0,0,null,2,3);
        } else if (CallingNumberUnpredicTableB === 2) {
            arrResult.splice(0,0,1,null,3);
        } else if (CallingNumberUnpredicTableB === 3) {
            arrResult.splice(0,0,1,2,null);
        };
        CallingNumberUnpredicTableB++;
        CallingNumberUnpredicTableB = (CallingNumberUnpredicTableB === 4) ? 1 : CallingNumberUnpredicTableB;
        return arrResult;
    };
    const getUnpredicTableC = () => {
        let arrLup = [];
        if (numberTableC === 0) {
            arrUnpredicTableC.unshift([]);
            numberTableC = 1;
        } else {
            arrUnpredicTableC[0].forEach(el => {arrLup.push(el)});
            arrLup.push(arrLup.length + 1);
            arrUnpredicTableC.unshift(arrLup);
        };
        return arrUnpredicTableC;
    };
    const getFewRandomQuotes = () => {
        let arrRandomQuotes = [];
        let randomNumber = 0;

        do {
            randomNumber = Math.ceil(Math.random() * 5);
        } while (randomNumber < 3);

        for (let i = 0; i < randomNumber; i++) {
            arrRandomQuotes.push(Quotes.getQuote());
        };

        return arrRandomQuotes;
    };

    const getTime = () => {
        const hours = today.getHours();
        const minute = today.getMinutes();
        const second = today.getSeconds();
        return {
            hours: hours,
            minutes: minute,
            seconds: second
        }
    };

    const data = {
        greeting: "Hello world!",
        schroedingersCatGreeting: randomCoinTosses() ? "Miau" : null,
        interestingUrls: ["https://kusrsrecta.pl", "https://64bits.com"],
        randomDiceThrow: getRandomDiceThrow(6),
        counter: getCounter(),
        fewRandomDiceThrows: getFewRandomDiceThrows(),
        pi: Math.PI,
        isTodayFriday: today.getDay() === 5,
        randomCoinTossesUntilTrue: getRandomCoinTossesUntilTrue(),
        today: DAY_OF_WEEK[today.getDay()],
        workDay: DAY_OF_WEEK.slice(1,6),
        currentMonth: MOUNT_OF_YER[today.getMonth()],
        monthsElapsed: MOUNT_OF_YER.slice(0,today.getMonth()),
        unpredicTableA: getUnpredicTableA(),
        unpredicTableB: getUnpredicTableB(),
        unpredicTableC: getUnpredicTableC(),
        randomQuote: Quotes.getQuote(),
        fewRandomQuotes: getFewRandomQuotes(),
        time: getTime(),

    };
    return data;
};

const server = new ApolloServer({ typeDefs, rootValue, playground: true, introspection: true });

server.listen({ port: PORT }).then((result) => console.log(result.url))