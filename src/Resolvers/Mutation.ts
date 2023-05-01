import {v4 as uuidv4} from "uuid";
import {Cv, CvInput, User} from "../data/fakeDatabase";
import {GraphQLError} from "graphql/error";
import {generateIdsForObjects, getAllCv, getAllUsers} from "../Utils/QueryUtils";

export const Mutation = {
    addCv: (parent: unknown, args: { cv: CvInput, userId: string }, context: any) => {
        const {cv, userId} = args
        cv.id = uuidv4()
        cv.skills = generateIdsForObjects(cv.skills)
        const allUsers = getAllUsers(parent, args, context)
        const user = allUsers.find((user: User) => user.id === userId)
        if (!user) {
            throw new GraphQLError('No user with that id')
        }
        user.cvs.push(cv)
        context.pubSub.publish('CvCreated', {CvCreated: cv})
        return cv
    },


    updateCv: (parent: unknown, args: { cv: CvInput, cvId: string }, context: any) => {
        const {cv, cvId} = args
        const allCvs: Cv[] = getAllCv(parent, args, context)
        const cvToUpdate = allCvs.find((cv: Cv) => cv.id === cvId)
        if (!cvToUpdate) {
            throw new GraphQLError('No cv with that id')
        }
        cvToUpdate.name = cv.name
        cvToUpdate.age = cv.age
        cvToUpdate.job = cv.job
        //generate for every skill a new id
        cvToUpdate.skills = generateIdsForObjects(cv.skills)
        context.pubSub.publish('CvUpdated', {CvUpdated: cvToUpdate})
        return cvToUpdate
    },
    deleteCv: (parent: unknown, args: { cvId: string }, context: any) => {
        const {cvId} = args
        const allCvs: Cv[] = getAllCv(parent, args, context)
        const cvToDelete = allCvs.find((cv: Cv) => cv.id === cvId)
        if (!cvToDelete) {
            throw new GraphQLError('No cv with that id')
        }
        const user = context.data.find((user: User) => user.cvs.includes(cvToDelete))
        user.cvs = user.cvs.filter((cv: Cv) => cv.id !== cvId)
        context.pubSub.publish('DeletedCv', {CvDeleted: cvToDelete})
        return cvToDelete
    }
}
