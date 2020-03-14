const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')
const Kayttaja = require('./models/kayttaja')
const { PubSub } = require('apollo-server')
const pubsub = new PubSub()

mongoose.set('useFindAndModify', false)

const MONGODB_URI = 'mongodb+srv://Antero:perse12@cluster0-2shec.mongodb.net/test?retryWrites=true'

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  },
  {
    name: 'Fyodor Dostoevsky',
    id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
    born: 1821
  },
  { 
    name: 'Joshua Kerievsky', // birthyear not known
    id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
  },
  { 
    name: 'Sandi Metz', // birthyear not known
    id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
  },
]


let books = Book.find({}).populate('author', { name: 1 })

const typeDefs = gql`
type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }

type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
  }

  type Kayttaja {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: Kayttaja
  }
  type Mutation {
    addBook(
    title: String!
    published: Int!
    name: String!
    genres: [String]!
    ): Book
  editAuthor(
    name: String!
    born: Int!
  ): Author
  createKayttaja(
    username: String!
    favoriteGenre: String!
  ): Kayttaja
  login(
    username: String!
    password: String!
  ): Token
}

  type Subscription {
    bookAdded: Book!
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async ( root, args ) => {

      if (!args.author && !args.genre)
      return await Book.find({}).populate('author', { name: 1 })
      if (args.author && !args.genre)
        return (books.filter(b => b.author === args.author))
      if (!args.author && args.genre)
        return Book.find({genres: { $in: [args.genres] }}).populate('author', { name: 1 }) //(books.filter(b => b.genres.includes(args.genre)))
      else
        return books.filter(b => b.author === args.author).filter(b => b.genres.includes(args.genre))
        },
    allAuthors: () => {return Author.find({})},
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root) => {
      a = await Author.findOne({ name: root.name })
      return (await books.find({ author: { $in: [a] }})).length}
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      if (! await Author.findOne({ name: args.name })) {
        const author = new Author({ ...args, name: args.name })
      const book = new Book({ ...args, author: author._id })

      try {
        await author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      const b = await Book.findOne({ title: args.title }).populate('author', { name: 1 })

      pubsub.publish('BOOK_ADDED', { bookAdded: b } )
      
      return b
      }
      const auth = await Author.findOne({ name: args.name })
      const book = new Book({ ...args, author: auth._id })
      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      const b = await Book.findOne({ title: args.title }).populate('author', { name: 1 })
      console.log(b)

      pubsub.publish('BOOK_ADDED', { bookAdded: b } )

      return b
    },
    editAuthor: async (root, args, context) => {
      const currentUser = await context.currentUser
      console.log(currentUser)
      if (!currentUser) {
        throw new AuthenticationError("not authenticated")
      }

      const author = await Author.findOne({ name: args.name })
      if (!author) {
        return null
      }
      author.born = args.born
      //authors = authors.map(a => a.name === args.name ? updatedAuthor : a)

      return author.save()
    },
    createKayttaja: (root, args) => {
      const kayttaja = new Kayttaja({ username: args.username, favoriteGenre: args.favoriteGenre })
  
      return kayttaja.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const kayttaja = await Kayttaja.findOne({ username: args.username })
      
      if ( !kayttaja || args.password !== 'salainen' ) {
        throw new UserInputError("wrong credentials")
      }
  
      const userForToken = {
        username: kayttaja.username,
        id: kayttaja._id,
      }
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => {
        console.log(pubsub.asyncIterator(['BOOK_ADDED']))
        return pubsub.asyncIterator(['BOOK_ADDED'])
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), JWT_SECRET
      )
      const currentUser = await Kayttaja
        .findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})