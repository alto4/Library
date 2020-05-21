// Variable Declarations
let libraryBooks = [];
const newButton = document.querySelector('.btn-new');
const submitButton = document.querySelector('.btn-submit');
const bookForm = document.querySelector('.book-form');

// Process New Book form Entry
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');


// Event Listeners
// Show New Book Form
newButton.addEventListener('click', function () {
    bookForm.classList.toggle('open');
})

submitButton.addEventListener('click', function (e) {
    e.preventDefault();
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read = false;

    addBookToLibrary(title, author, pages, read);
    render();

});

// Constructor Function for Book objects
function Book(title, author, pages, read) {
    // Book properties
    this.title = title
    this.author = author
    this.pages = pages
    this.read = read

    // Book methods
    this.info = function () {
        let readString;
        if (read === true) {
            readString = 'has been read';
        } else {
            readString = 'not yet read';
        }
        return `${title} by ${author}, ${pages} pages, ${readString}`;
    }
}

// addBookToLibrary Function - adds a new book to the myLibrary array
function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);

    libraryBooks.push(newBook);
}

// Add permanent sample entries to libraryBooks for degugging render()
// addBookToLibrary('1984', 'George Orwell', 307, true);
// addBookToLibrary('Odd Thomas', 'Dean Koontz', 412, true);
// addBookToLibrary('Dreams of Spring', 'George R. Martin', 951, false);
// addBookToLibrary('The Brothers Karamazov', 'Fyodor Dostoyevsky', 1851, true);

// render Function - show libraryBooks objects in the browser
function render(books) {
    const body = document.querySelector('body');
    const bookList = document.createElement('div');
    bookList.style.width = '800px';
    bookList.style.margin = "1rem auto";
    bookList.style.display = 'grid';
    bookList.style.gridTemplateColumns = 'repeat(3, 1fr)';
    bookList.style.gridGap = '1rem';

    libraryBooks.forEach(book => {
        const bookListItem = document.createElement('div');
        bookListItem.classList.add('book-card');

        const bookTitle = document.createElement('h2');
        const bookAuthor = document.createElement('h3');
        const bookPages = document.createElement('span');
        const bookRead = document.createElement('p');

        bookTitle.innerText = book.title;
        bookAuthor.innerText = `By: ${book.author}`;
        bookPages.innerText = `Pages: ${book.pages}`;
        bookRead.innerText = 'Status: ';
        if (book.read === true) {
            bookRead.innerText += 'Read';
        } else {
            bookRead.innerText += 'Unread'
        }

        bookListItem.appendChild(bookTitle);
        bookListItem.appendChild(bookAuthor);
        bookListItem.appendChild(bookPages);
        bookListItem.appendChild(bookRead);
        bookListItem.style.width = '240px';
        bookListItem.style.padding = '2rem';
        bookListItem.style.textAlign = 'center';

        bookList.appendChild(bookListItem);
    });

    body.append(bookList);

}