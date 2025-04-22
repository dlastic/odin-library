const myLibrary = [];
const addBookButton = document.querySelector(".add-book");
const modal = document.querySelector(".modal");
const closeModalButton = document.querySelector(".close-modal");
const bookForm = document.querySelector("#book-form");

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

Book.prototype.toggleReadStatus = function() {
  this.read = !this.read;
};

function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID();
  const book = new Book(title, author, pages, read, id);
  myLibrary.push(book);
}

function displayBooks() {
  const bookList = document.querySelector(".container");
  bookList.innerHTML = "";  

  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");
    bookCard.innerHTML = `
      <h2>${book.title}</h2>
      <p>${book.author}</p>
      <p>${book.pages} pages</p>
      <button class="toggle-read-button" data-id="${book.id}">${book.read ? "Read" : "Not Read"}</button>
      <button class="remove-button" data-id="${book.id}">Remove</button>
    `;
    bookList.appendChild(bookCard);
  });

  const toggleReadButtons = document.querySelectorAll(".toggle-read-button");
  toggleReadButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const bookId = e.target.getAttribute("data-id");
      const book = myLibrary.find((book) => book.id === bookId);
      if (book) {
        book.toggleReadStatus();
        displayBooks();
      }
    });
  });

  const removeButtons = document.querySelectorAll(".remove-button");
  removeButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const bookId = e.target.getAttribute("data-id");
      removeBookFromLibrary(bookId);
    });
  });
}

function removeBookFromLibrary(id) {
  const bookIndex = myLibrary.findIndex((book) => book.id === id);

  if (bookIndex !== -1) {
    myLibrary.splice(bookIndex, 1);
    displayBooks();
  }
}

addBookButton.addEventListener("click", () => {
  modal.classList.remove("hidden")  
})

closeModalButton.addEventListener("click", () => {
  modal.classList.add("hidden")
});

bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#title").value;
  const author = document.querySelector("#author").value;
  const pages = parseInt(document.querySelector("#pages").value);
  const read = document.querySelector("#read").value === "true";

  addBookToLibrary(title, author, pages, read);
  displayBooks();
  modal.classList.add("hidden");
  bookForm.reset();
});