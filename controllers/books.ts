import { Book } from '../types.ts';

let books: Book[] = [
    {
        id: "1",
        title: "The Da Vinci Code",
        author: "Dan Brown"
    },
    {
        id: "2",
        title: "Harry Potter and the Sorcerer's Stone",
        author: "JK Rowling"
    },
    {
        id: "3",
        title: "The Lord of The Rings",
        author: "JRR Tolkien"
    }
]

// @desc GET all books
// @route GET api/v1/books
const getBooks = ({response} : {response: any}) => {
    response.body = {
        success: true,
        data: books
    }
}

// @desc GET single book
// @route GET api/v1/books/:id
const getBook = ({params, response} : {params: {id:string}, response: any}) => {
    const book: Book | undefined = books.find(p => p.id === params.id)

    if(book) {
        response.status = 200
        response.body = {
            success: true,
            data: book
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No book found'
        }
    }
}

// @desc Add book
// @route POST api/v1/books
const addBook = ({response} : {response: any}) => {
    
}

// @desc Update book
// @route PUT api/v1/books/:id
const updateBook = ({response} : {response: any}) => {
    
}

// @desc Delete book
// @route DELETE api/v1/books/:id
const deleteBook = ({response} : {response: any}) => {
    
}

export { getBooks, getBook, addBook, updateBook, deleteBook }