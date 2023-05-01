import {v4 as uuidv4} from "uuid";
import {Cv, CvInput, User} from "../data/fakeDatabase";
import {GraphQLError} from "graphql/error";
import {getAllUsers} from "../Utils/QueryUtils";

export const Mutation = {
    addCv: (parent: unknown, args: { cv: CvInput, userId: string }, context: any) => {
        const {cv, userId} = args
        cv.id = uuidv4()
        const allUsers = getAllUsers(parent, args, context)
        console.log(allUsers)
        const user = allUsers.find((user: User) => user.id === userId)
        if (!user) {
            throw new GraphQLError('No user with that id')
        }
        user.cvs.push(cv)
        return cv
    },


    updateCv: (parent: unknown, args: any, context: any) => {
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
            throw new GraphQLError('No cv with that id')
        }
        cvToUpdate.name = cv.name
        cvToUpdate.age = cv.age
        cvToUpdate.job = cv.job
        cvToUpdate.skills = cv.skills
        return cvToUpdate
    },
    deleteCv: (parent: unknown, args: any, context: any) => {
        const id = args.id
        const allCvs: Cv[] = []
        context.data.forEach((user: User) => {
            user.cvs.forEach((cv: Cv) => {
                allCvs.push(cv)
            })
        })
        const cvToDelete = allCvs.find((cv: Cv) => cv.id === id)
        if (!cvToDelete) {
            throw new GraphQLError('No cv with that id')
        }
        const user = context.data.find((user: User) => user.cvs.includes(cvToDelete))
        user.cvs = user.cvs.filter((cv: Cv) => cv.id !== id)
        return cvToDelete
    }
}
