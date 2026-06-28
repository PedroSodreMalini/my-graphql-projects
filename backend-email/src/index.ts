import 'reflect-metadata'
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { buildSchema } from 'type-graphql'
import { UserResolver } from './resolvers/user.resolver.js'
import { ApolloServer } from '@apollo/server'
import { expressMiddleware } from '@as-integrations/express5'
import { buildContext } from './graphql/context/index.js'
import { AuthResolver } from './resolvers/auth.resolver.js'
import { EmailResolver } from '@/resolvers/email.resolver.js'

async function bootstrap () {
    const app = express()

    app.use(cors({
        origin: 'http://localhost:5173',
        credentials: true
    }))

    const schema = await buildSchema({
        resolvers: [AuthResolver, EmailResolver, UserResolver],
        validate: true,
        emitSchemaFile: './schema.graphql'
    })

    const server = new ApolloServer({
        schema: schema,
        includeStacktraceInErrorResponses: false,
    })

    await server.start()

    app.use(
        '/graphql',
        express.json(),
        expressMiddleware(server, {
            context: buildContext,
        })
    )

    app.listen(4000, () => console.log("Servidor rodando na porta 4000."))
}

bootstrap()