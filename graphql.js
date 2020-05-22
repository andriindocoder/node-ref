const { ApolloServer, gql } = require('apollo-server');

const movies = [
	{
		title: 'Terminator 2',
		director: 'James Cameron',
		actors: [{ name: 'Arnold Schwarzeneger'}]
	},
	{
		title: 'Alien',
		director: 'Ridley Scott',
		actors: [{ name: 'Sigourney Weaver'}]
	}
];

const typeDefs = gql`
	type Movie {
		title: String,
		director: String,
		actors: [Actor]
	}

	type Actor {
		name: String
	}

	type Query {
		movies: [Movie]
	}
`;

const resolvers = {
	Query: {
		movies: () => movies
	}
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({url}) => {
	console.log(`Server ready on ${url}`);
})

