import { readFileSync } from "fs"
import path from "path"

import resolvers from 'graphql/resolvers'

import runServer from "lib/server/run-server"

const typeDefs = readFileSync(path.join(process.cwd(), `/src/graphql/schema/schema.graphql`), { encoding: "utf8" })

runServer({ typeDefs, resolvers })