import {createYoga} from 'graphql-yoga'
import {createServer} from 'http'
import {makeExecutableSchema} from '@graphql-tools/schema'
import {Query} from "./Resolvers/Query";
import {Mutation} from "./Resolvers/Mutation";
import {typeDefinitions} from "./Schema/schema";
import {Subscription} from "./Resolvers/Subscription";
import {createContext} from './context'


function main() {

    const schema = makeExecutableSchema({
        resolvers: [{Query, Mutation, Subscription}],
        typeDefs: [typeDefinitions]
    })
    const yoga = createYoga({schema, context: createContext})
    const server = createServer(yoga)
    server.listen(4000, () => {
        console.info('Server is running on http://localhost:4000/graphql')
    })
}

main()
