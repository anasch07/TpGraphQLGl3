import {makeExecutableSchema} from '@graphql-tools/schema'
import {Cv, User} from "./data/fakeDatabase";
import {ContextType} from "./context";
import { v4 as uuidv4 } from 'uuid';
import {typeDefinitions} from "./Schema/schema";
import {Query} from "./Resolvers/Query";





const resolvers = {
    Query: {
        getAllCvs: (parent: unknown, args: unknown, context: ContextType) => {
            const allCvs: Cv[] = []
            context.data.forEach((user: User) => {
                user.cvs.forEach((cv: Cv) => {
                    allCvs.push(cv)
                })
            })
            return allCvs
        },
        getCvById: (parent: unknown, args: any, context: any) => {
            const id = args.id
            const allCvs: Cv[] = []
            context.data.forEach((user: User) => {
                user.cvs.forEach((cv: Cv) => {
                    allCvs.push(cv)
                })
            })
            return allCvs.find((cv: Cv) => cv.id === id)
        },
        getSkillsAndUserOfCv: (parent: unknown, args: any, context: any) => {
            const id = args.id
            const allCvs: Cv[] = []
            context.data.forEach((user: User) => {
                user.cvs.forEach((cv: Cv) => {
                    allCvs.push(cv)
                })
            })
            const cv = allCvs.find((cv: Cv) => cv.id === id)
            // @ts-ignore
            const user = context.data.find((user: User) => user.cvs.includes(cv))
            return {
                ...cv,
                user: user,
            }
        }
    },
    Mutation: {
        addCv: (parent: unknown, args:any, context: any) => {
            const cv = args.cv
            cv.id = uuidv4()
            const id = context.data[0].id
            const user = context.data.find((user: User) => user.id === id)
            user.cvs.push(cv)
            return cv
        },
        updateCv: (parent: unknown, args:any, context: any) => {
            const cv = args.cv
            const id = args.id
            const allCvs: Cv[] = []
            context.data.forEach((user: User) => {
                user.cvs.forEach((cv: Cv) => {
                    allCvs.push(cv)
                })
            })
            const cvToUpdate = allCvs.find((cv: Cv) => cv.id === id)
            if (!cvToUpdate) {
                throw new Error('No cv with that id')
            }
            cvToUpdate.name = cv.name
            cvToUpdate.age = cv.age
            cvToUpdate.job = cv.job
            cvToUpdate.skills = cv.skills
            return cvToUpdate
        },
        deleteCv: (parent: unknown, args:any, context: any) => {
            const id = args.id
            const allCvs: Cv[] = []
            context.data.forEach((user: User) => {
                user.cvs.forEach((cv: Cv) => {
                    allCvs.push(cv)
                })
            })
            const cvToDelete = allCvs.find((cv: Cv) => cv.id === id)
            if (!cvToDelete) {
                throw new Error('No cv with that id')
            }
            const user = context.data.find((user: User) => user.cvs.includes(cvToDelete))
            user.cvs = user.cvs.filter((cv: Cv) => cv.id !== id)
            return cvToDelete
        }
        }
}

export const schema = makeExecutableSchema({
    resolvers: [{Query}],
    typeDefs: [typeDefinitions]
})
