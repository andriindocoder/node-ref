import { v4 } from 'https://deno.land/std/uuid/mod.ts'
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
const addBook = async ({request, response} : {request: any, response: any}) => {
    const body = await request.body()

    if(!request.hasBody) {
        response.status = 400
        response.body = {
            success: false,
            msg: 'No Data'
        }
    } else {
        const book: Book = body.value
        book.id = v4.generate()
        books.push(book)
        response.status = 201
        response.body = {
            success: true,
            data: book
        }
    }
}

// @desc Update book
// @route PUT api/v1/books/:id
const updateBook = async({params, request, response} : {params: {id:string}, request: any, response: any}) => {
    const book: Book | undefined = books.find(p => p.id === params.id)

    if(book) {
        const body = await request.body()

        const updateData: { title?: string; author?:string} = body.value

        books = books.map(p => p.id === params.id ? { ...p, ...updateData} : p)

        response.status = 200
        response.body = {
            success: true,
            data: books
        }
    } else {
        response.status = 404
        response.body = {
            success: false,
            msg: 'No book found'
        }
    }
}

// @desc Delete book
// @route DELETE api/v1/books/:id
const deleteBook = ({params, response} : {params: { id: string}, response: any}) => {
    books = books.filter(p => p.id !== params.id)
    response.body = {
        success: true,
        msg: 'Books removed'
    }
}

export { getBooks, getBook, addBook, updateBook, deleteBook }