const { gql } = require("apollo-server");

const typeDefs = gql`
    schema {
        query: OurQuery
    }
    
    type OurQuery {
        "A simple greeting"
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
        date: Date!
        time: Time!
        dateTime: DateTime!
    }
    """
    { year: 2020, month: "JAN", day: 30, weekDay: "THU" }
    """
    type Date {
    year: Float!
    month: Month!
    day: Float!
    weekDay: DayOfWeek!
    }
    "{hour: 23, minute: 53, second: 46}"
    type Time {
    hours: Float!
    minutes: Float!
    seconds: Float!
    }
    """
    { date: { year: 2020, month: "JAN", day: 30, weekDay: "THU" }, time: {hour: 23, minute: 53, second: 46} }
    """
    type DateTime {
    date: Date!
    time: Time!
    }
    """
    # The object representing a quote
    ## It contains a text and author's name
    """
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

module.exports = typeDefs;