import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'
// import { schema } from './schema'
// import {data} from "./data/data";
import {context} from "./context";
import {makeExecutableSchema} from '@graphql-tools/schema'
import {Query} from "./Resolvers/Query";
import {Mutation} from "./Resolvers/Mutation";
import {typeDefinitions} from "./Schema/schema";



function main() {

    const schema = makeExecutableSchema({
        resolvers: [{Query,Mutation}],
        typeDefs: [typeDefinitions]
    })
    const yoga = createYoga({ schema, context: context })
    const server = createServer(yoga)
    server.listen(4000, () => {
        console.info('Server is running on http://localhost:4000/graphql')
    })
}

main()
