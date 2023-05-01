import {ContextType} from "../context";
import {Cv, User} from "../data/fakeDatabase";
import {GraphQLError} from "graphql/error";
import {findCvById, getAllCv, getAllUsers} from "../Utils/QueryUtils";

export const Query = {
    getAllCvs: (parent: unknown, args: unknown, context: ContextType) => {
        return getAllCv(parent, args, context)
    },
    getCvById: (parent: unknown, args: any, context: any) => {
        const {id} = args
        const allCvs: Cv[] = getAllCv(parent, args, context)
        const cv = findCvById(allCvs, id)
        if (!cv) {
            throw new GraphQLError('No cv with that id')
        }
        return cv
    },
    getSkillsAndUserOfCv: (parent: unknown, args: any, context: any) => {
        const {id} = args
        const allCvs: Cv[] = getAllCv(parent, args, context)
        const cv = findCvById(allCvs, id)
        if (!cv) {
            throw new GraphQLError('No cv with that id')
        }
        // @ts-ignore
        const user = context.data.find((user: User) => user.cvs.includes(cv))
        console.log("user", user)
        return {
            skills: cv.skills,
            ...user
        }
    },
    getAllUsers: (parent: unknown, args: unknown, context: ContextType) => {
        return getAllUsers(parent, args, context)
    }
}


//write me git.ignore for node_modules
