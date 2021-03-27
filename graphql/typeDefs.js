const { gql } = require('apollo-server-express')

module.exports = gql`

type Student{
    _id: ID
    regno: String! 
    name: String!
    marks: [Mark!]!     
}

type Mark{
    _id: ID!
    mid: Int!
    regno: String
    hid: Int!
    marks: Float!
    student: Student!
    head: Head!    
}

type Head{
    hid: Int!
    headname: String!
    total: Int!    
}

type Grade{
    gradeid: Int!
    start: Int!
    end: Float!
    grade: String,
    gpa: Float!,    
}


type Query{
    student( regno: String!): Student
    students: [Student!]!
    marks: [Mark!]!
    heads: [Head!]!
    grades: [Grade!]!
}

type Mutation{
    updatemarks(regno: String!, hid: Int!, mark:Float!): Mark
}
`