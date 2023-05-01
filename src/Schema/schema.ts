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

enum Role {
ADMIN
USER
}
type Query {
getAllCvs: [Cv!]!
getCvById(id: ID!): Cv!
getSkillsAndUserOfCv(id: ID!): Cv!
}

#    Créer deux inputs pour l’ajout et la modification d’un cv.

input SkillInput {
designation: String!
}

input CvInput {
name: String!
age: Int!
job: String!
skills: [SkillInput!]!
}

type Mutation {
addCv(cv: CvInput!, userId: ID!): Cv!
updateCv(id: ID!, cv: CvInput!): Cv!
deleteCv(id: ID!): Cv!
}

`
