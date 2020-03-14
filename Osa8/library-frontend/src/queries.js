import { gql  } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`
export const ALL_BOOKS = gql`
query {
  allBooks {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      name: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const EDIT_BIRTHYEAR = gql`
  mutation changeBirthyear($name: String!, $born: Int!) {
    editAuthor(
      name: $name, 
      born: $born
    ) {
      name
      id
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const ME = gql`
query {
  me {
    username
    favoriteGenre
  }
}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      genres
      id
      title
      published
      author {
        id
        name
      }
    }
  }

`