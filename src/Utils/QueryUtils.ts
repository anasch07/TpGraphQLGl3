import {Cv, User} from "../data/fakeDatabase";

export const getAllCv = (parent: unknown, args: unknown, context: any) => {
    const allCvs: Cv[] = []
    context.data.forEach((user: User) => {
        user.cvs.forEach((cv: Cv) => {
            allCvs.push(cv)
        })
    })
    return allCvs
}

export const findCvById = (allCvs: Cv[], id: string) => {
    return allCvs.find((cv: Cv) => cv.id === id)
}

export const getAllUsers = (parent: unknown, args: unknown, context: any) => {
    return context.data
}
