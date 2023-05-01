export const typeDefinitions = /* GraphQL */ `
    type Skill {
        id: ID!
        designation: String!
    }
    type Cv {
        id: ID!
        name: String!
        age: Int!
        job: String!
        skills: [Skill!]!
    }
    type User {
        id: ID!
        name: String!
        email: String!
        role: Role!
        cvs: [Cv!]!
    }

    type UserSkills {
        id: ID!
        name: String!
        email: String!
        role: Role!
        skills: [Skill!]!

    }

    enum Role {
        ADMIN
        USER
    }

    input SkillInput {
        designation: String!
        id: ID
    }

    input CvInput {
        name: String!
        age: Int!
        job: String!
        skills: [SkillInput!]!
        id: ID
    }
    type Query {
        getAllCvs: [Cv!]!
        getCvById(id: ID!): Cv!
        getSkillsAndUserOfCv(id: ID!): UserSkills!
        getAllUsers: [User!]!
    }

    type Mutation {
        addCv(cv: CvInput!, userId: ID!): Cv!
        updateCv(cvId: ID!, cv: CvInput!): Cv!
        deleteCv(cvId: ID!): Cv!
    }

    type Subscription {
        CvCreated: Cv!
        CvUpdated: Cv!
        CvDeleted: Cv!
    }


`
