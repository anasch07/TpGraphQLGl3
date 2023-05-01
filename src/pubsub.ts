import {createPubSub} from '@graphql-yoga/subscription'
import {Cv} from "./data/fakeDatabase";

// 1
export type PubSubChannels = {
    CvCreated: [{ CvCreated: Cv }]
    CvUpdated: [{ CvUpdated: Cv }]
    DeletedCv: [{ CvDeleted: Cv }]
}

// 2
export const pubSub = createPubSub<PubSubChannels>()


