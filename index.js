// const cors = require('cors')
// const express = require('express')
const { ApolloServer, gql } = require('apollo-server')

// const app = express()
// app.use(cors())

const data = {
	me: {
		fullName: 'Karolis Stulgys',
		about: `self taught web dev who can't get enough of new challenges`,
		stack: {
			frontend: 'react',
			backend: 'yoga'
		},
		projects: [
			{ url: 'vienas', description: 'description vienas' },
			{ url: 'du', description: 'description du' }
		],
		social: [{ facebook: 'mano fb', github: 'mano github' }]
	}
}
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
	type Query {
		fullName: String
		about: String
		stack: Stack
		projects: [Project]!
	}
	type Stack {
		frontend: String
		backend: String
	}
	type Project {
		url: String
		description: String
	}
`

// Provide resolver functions for your schema fields
const resolvers = {
	Query: {
		fullName: (parent, args, { data }) => data.me.fullName,
		about: (parent, args, { data }) => data.me.about,
		stack: (parent, args, { data }) => {
			return { frontend: data.me.stack.frontend, backend: data.me.stack.backend }
		},
		projects: (parent, args, { data }) =>
			data.me.projects.map(prj => {
				return { url: prj.url, description: prj.description }
			})
	}

	// Query: {
	// 	me: (root, args, context) => 'Hello world!'
	// }
}

const server = new ApolloServer({
	typeDefs,
	resolvers,
	playground: process.env.PLAYGROUND,
	context: {
		data
	}
})

// server.applyMiddleware({ app, path: '/graphql' })

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`)
})

// app.listen({ port: 8000 }, () => {
// 	console.log('Apollo Server on http://localhost:4000/graphql')
// })
