// Variable Declarations
let libraryBooks = [];
const newButton = document.querySelector(".btn-new");
const submitButton = document.querySelector(".btn-submit");
const bookForm = document.querySelector(".book-form");
const deleteAllButton = document.querySelector(".btn-delete-all");

// Create Booklist container
const body = document.querySelector("body");
const bookList = document.createElement("div");
bookList.style.width = "800px";
bookList.style.margin = "1rem auto";
bookList.style.display = "grid";
bookList.style.gridTemplateColumns = "repeat(3, 1fr)";
bookList.style.gridGap = "1rem";

// Process New Book form Entry
const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");

// Event Listeners
// Show New Book Form - when New Book button is clicked, show the book input form
newButton.addEventListener("click", function () {
  bookForm.classList.toggle("open");
});

// Event Listener for Submit Button - Add New Book with inputted data
submitButton.addEventListener("click", function (e) {
  e.preventDefault();
  let title = titleInput.value;
  let author = authorInput.value;
  let pages = pagesInput.value;
  let read = false;

  addBookToLibrary(title, author, pages, read);
  renderBook(libraryBooks[libraryBooks.length - 1]);
  addDataAttr(bookList);
});

// Constructor Function for Book objects
function Book(title, author, pages, read) {
  // Book properties
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  // Book methods
  this.info = function () {
    let readString;
    if (read === true) {
      readString = "has been read";
    } else {
      readString = "not yet read";
    }
    return `${title} by ${author}, ${pages} pages, ${readString}`;
  };

  // toggleRead
  function toggleRead() {
    this.read.toggle();
  }
}

// addBookToLibrary Function - adds a new book to the myLibrary array
function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  libraryBooks.push(newBook);
}

// Add permanent sample entries to libraryBooks for degugging render()
addBookToLibrary("1984", "George Orwell", 307, true);
addBookToLibrary("Odd Thomas", "Dean Koontz", 412, true);
addBookToLibrary("Dreams of Spring", "George R. Martin", 951, false);
addBookToLibrary("The Brothers Karamazov", "Fyodor Dostoyevsky", 1851, true);

// render Function - show libraryBooks objects in the browser
function render(books) {
  libraryBooks.forEach((book) => {
    renderBook(book);
  });

  addDataAttr(bookList);

  body.append(bookList);
}

// renderBook Function - renders a new book card in the DOM
function renderBook(book) {
  const bookListItem = document.createElement("div");
  bookListItem.classList.add("book-card");

  const bookTitle = document.createElement("h2");
  const bookAuthor = document.createElement("h3");
  const bookPages = document.createElement("span");
  const bookRead = document.createElement("p");
  const deleteButton = document.createElement("button");
  const readButton = document.createElement("button");

  bookTitle.innerText = book.title;
  bookAuthor.innerText = `By: ${book.author}`;
  bookPages.innerText = `Pages: ${book.pages}`;
  bookRead.innerText = "Status: ";
  if (book.read === true) {
    bookRead.innerText += "Read";
  } else {
    bookRead.innerText += "Unread";
  }
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("btn");
  deleteButton.classList.add("btn-delete");

  if (book.read) {
    readButton.innerText = "Mark Unread";
  } else {
    readButton.innerText = "Mark Read";
  }

  readButton.classList.add("btn");
  readButton.classList.add("btn-read");

  bookListItem.appendChild(bookTitle);
  bookListItem.appendChild(bookAuthor);
  bookListItem.appendChild(bookPages);
  bookListItem.appendChild(bookRead);
  bookListItem.appendChild(deleteButton);
  bookListItem.appendChild(readButton);
  bookListItem.style.width = "240px";
  bookListItem.style.padding = "2rem";
  bookListItem.style.textAlign = "center";

  bookList.appendChild(bookListItem);
  insertDeleteButtons();
}

render();
insertDeleteButtons();

// deleteBook Function
function deleteBook(e) {
  e.target.parentElement.remove();
  libraryBooks.splice(e.target.parentElement.getAttribute("data-num"), 1);
  addDataAttr(bookList);
}

// deleteAllBooks Function
function deleteAllBooks() {
  let deleteButtons = document.querySelectorAll(".btn-delete");

  deleteButtons.forEach((button) => {
    button.parentElement.remove();
    libraryBooks = [];
  });
}

function insertDeleteButtons() {
  // Event Listener for Delete Button
  let deleteButtons = document.querySelectorAll(".btn-delete");
  let index = 0;

  deleteButtons.forEach((btn) => {
    btn.addEventListener("click", deleteBook);
    btn.setAttribute("data-num", index);
    index++;
  });
}

// Event Listener for Delete All Books button
deleteAllButton.addEventListener("click", deleteAllBooks);

let readButtons = document.querySelectorAll(".btn-read");

function addDataAttr(items) {
  let index = 0;
  items = Array.from(items.children);
  items.forEach((item) => {
    item.setAttribute("data-num", index);
    console.log(item);
    index++;
  });
}
// toggleRead Function - changes the status from read to unread and vice-versa
function toggleRead(e) {
  let targettedBook = e.target.parentElement;
  let targettedBookData = targettedBook.getAttribute("data-num");
  console.log(targettedBookData);
  libraryBooks[targettedBookData].read = !libraryBooks[targettedBookData].read;
  console.log(libraryBooks[targettedBookData].read);
  if (libraryBooks[targettedBookData].read) {
    e.target.innerText = "Mark Unread";
  } else {
    e.target.innerText = "Mark Read";
  }

  let readPara = targettedBook.querySelector("p");
  console.log(readPara);
  if (libraryBooks[targettedBookData].read) {
    readPara.innerText = "Status: Read";
  } else {
    readPara.innerText = "Status: Unread";
  }
}

readButtons.forEach((readButton) => {
  readButton.addEventListener("click", toggleRead);
});
