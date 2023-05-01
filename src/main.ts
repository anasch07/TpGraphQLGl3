import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'
import { schema } from './schema'
import {data} from "./data/data";
import {context} from "./context";



function main() {
    const yoga = createYoga({ schema, context: context })
    const server = createServer(yoga)
    server.listen(4000, () => {
        console.info('Server is running on http://localhost:4000/graphql')
    })
}

main()
