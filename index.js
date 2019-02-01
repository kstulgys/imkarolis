// const cors = require('cors')
// const express = require('express')
const { ApolloServer, gql } = require('apollo-server');

// const app = express()
// app.use(cors())

const data = {
  contact_details: {
    fullName: 'Karolis Stulgys',
    email: 'karolis.stulgys@gmail.com'
  },
  technologies: {
    frontend: [
      'react',
      'apollo-client',
      'semantic-ui',
      'material-ui',
      'antd-ui'
    ],
    backend: ['apollo-server', 'firestore/firebase', 'prisma', 'mongoDB']
  },
  projects: [
    {
      name: 'slack-clone-react-firebase',
      liveUrl: 'https://slack-clone-react-firebase.netlify.com/',
      gitRepo: 'https://github.com/kstulgys/slack-clone-react-firebase',
      description:
        'Sample chat application powered by firebase/firestore real time database',
      features: [
        'file upload',
        'user registration and authentication',
        'only registered users can write and read channels and messages'
      ],
      stack: ['react', 'firebase/firestore', 'semantic UI']
    },
    {
      name: 'twitter-clone-apollo',
      liveUrl: 'https://twitter-clone-apollo-client.herokuapp.com',
      gitRepo: 'https://github.com/kstulgys/twitter-clone-apollo',
      description: 'Sample Twitter clone',
      features: [
        'user registration',
        'client subscriptions for new posts and post likes',
        'optimistic UI'
      ],
      stack: ['react', 'mongoDB', 'apollo-server', 'apollo-client', 'antd-ui']
    }
  ]
};
// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Project {
    name: String
    liveUrl: String
    gitRepo: String
    description: String
    features: [String]
    stack: [String]
  }

  type Query {
    contact_details: Details
    technologies: Technologies
    projects: [Project]!
  }
  type Technologies {
    frontend: [String]
    backend: [String]
  }

  type Details {
    fullName: String
    email: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    contact_details: () => data.contact_details,
    technologies: () => {
      return {
        frontend: data.technologies.frontend.map(ft => ft),
        backend: data.technologies.backend.map(bt => bt)
      };
    },
    projects: () => data.projects.map(p => p)
  }
};

const defaultQuery = `
# Hello and Wellcome!
# I'm pleased you have made it to my site!
# My name is Karolis and I am a Front End Developer from Lithuania
# I made this GraphQL API as my page because everyone loves GraphQL
# If you are not familiar with it make sure to check the docs @ https://graphql.org/
# P.S if you want to know me better just click "Play" to run the default query!
# I'm looking forward to hearing from you @ karolis.stulgys@gmail.com 

query {
  contact_details {
    fullName
    email
  }

  technologies{
    frontend
    backend
  }

  projects {
    name
    liveUrl
    gitRepo
    description
    features
    stack
  }
}
`;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    data
  },
  introspection: true,
  playground: {
    settings: {
      // 'general.betaUpdates': false,
      // 'editor.cursorShape': 'line',
      'editor.fontSize': 13,
      // 'editor.fontFamily':
      // "'Source Code Pro', 'Consolas', 'Inconsolata', 'Droid Sans Mono', 'Monaco', monospace",
      'editor.theme': 'dark',
      // 'editor.reuseHeaders': true,
      // 'prettier.printWidth': 80,
      'request.credentials': 'same-origin'
      // 'tracing.hideTracingResponse': true
    },
    endpoint: 'https://0o0x85wqqw.sse.codesandbox.io/graphql',
    tabs: [
      {
        endpoint: 'https://0o0x85wqqw.sse.codesandbox.io/graphql',
        query: defaultQuery,
        name: 'Start here!'
      }
    ]
  }
});

// server.applyMiddleware({ app, path: '/graphql' })

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});

// app.listen({ port: 8000 }, () => {
// 	console.log('Apollo Server on http://localhost:4000/graphql')
// })
