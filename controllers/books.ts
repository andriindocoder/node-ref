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

export { getBooks }