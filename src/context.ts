import {fakeDatabase} from './data/fakeDatabase';
import {pubSub} from './pubsub'
import {YogaInitialContext} from "graphql-yoga";

export type ContextType = {
    data: typeof fakeDatabase
    pubSub: typeof pubSub
}

export async function createContext(
    initialContext: YogaInitialContext
): Promise<ContextType> {
    return {
        data: fakeDatabase,
        pubSub
    }
}
