import {ContextType} from "../context";
import {Cv, User} from "../data/fakeDatabase";

export const Query = {
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
}

//write me git.ignore for node_modules
