const { ApolloServer, gql } = require("apollo-server");
const PORT = process.env.PORT || 4000;
const typeDefs = gql`
    type Query {
        greeting: String
        interestingUrls: [String]
        randomDiceThrow: Int
        counter: Int
        fewRandomDiceThrows: [Int]
        pi: Float
        isTodayFriday: Boolean
        randomCoinTossesUntilTrue: [Boolean]
        today: DayOfWeek
        workDay: [DayOfWeek]
        month: MonthOfYear
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
    enum MonthOfYear {
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
    console.log(today.getMonth());
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
    const data = {
        greeting: "Hello world!",
        interestingUrls: ["https://kusrsrecta.pl", "https://64bits.com"],
        randomDiceThrow: getRandomDiceThrow(6),
        counter: getCounter(),
        fewRandomDiceThrows: getFewRandomDiceThrows(),
        pi: Math.PI,
        isTodayFriday: today.getDay() === 5,
        randomCoinTossesUntilTrue: getRandomCoinTossesUntilTrue(),
        today: DAY_OF_WEEK[today.getDay()],
        workDay: DAY_OF_WEEK.slice(1,6),
        month: MOUNT_OF_YER[today.getMonth()]
    };
    return data;
};

const server = new ApolloServer({ typeDefs, rootValue, playground: true, introspection: true });

server.listen({ port: PORT }).then((result) => console.log(result.url))