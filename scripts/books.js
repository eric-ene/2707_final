import { imageEntry } from './components.js'

document.addEventListener('DOMContentLoaded', setup);

async function setup() {    
    await setupBooks();
}

async function setupBooks() {
    const booksParent = document.getElementById('books-parent');

    let response = await fetch('../data/books.json');
    let booksJson = await response.json();
    let booksList = booksJson.books;

    // sort books by title, taking numbers into account
    // the { numeric: true } thingy makes titles with numbers sort correctly
    // without it: [4, 3, 2, 1, 33] -> [1, 2, 3, 33, 4]
    //    with it: [4, 3, 2, 1, 33] -> [1, 2, 3, 4, 33]
    booksList.sort((a, b) => a.title.localeCompare(b.title, undefined, { numeric: true, sensitivity: 'base' }));

    booksList.forEach((book, index) => {
        booksParent.appendChild(imageEntry(index, book))
    });
}