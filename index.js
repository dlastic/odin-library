const myLibrary = [];
const addBookButton = document.querySelector(".add-book");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const closeModalButton = document.querySelector(".close-modal");
const bookForm = document.querySelector("#book-form");

class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }

  toggleReadStatus() {
    this.read = !this.read;
    displayBooks();
  }

  removeFromLibrary() {
    const index = myLibrary.findIndex((book) => book.id === this.id);

    if (index !== -1) {
      myLibrary.splice(index, 1);
      displayBooks();
    }
  }

  renderCard() {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <h3>${this.title}</h3>
      <p>${this.author}</p>
      <p>${this.pages} pages</p>
      <button class="toggle-read-button ${this.read ? "read" : "not-read"}">${
      this.read ? "Read" : "Not Read"
    }</button>
      <button class="remove-button">Remove</button>
    `;

    card.querySelector(".toggle-read-button").addEventListener("click", () => {
      this.toggleReadStatus();
    });

    card.querySelector(".remove-button").addEventListener("click", () => {
      this.removeFromLibrary();
    });

    return card;
  }
}

function addBookToLibrary(title, author, pages, read) {
  const id = crypto.randomUUID();
  const book = new Book(title, author, pages, read, id);
  myLibrary.push(book);
}

function displayBooks() {
  const bookList = document.querySelector(".container");
  bookList.innerHTML = "";

  myLibrary.forEach((book) => {
    const card = book.renderCard();
    bookList.appendChild(card);
  });
}

addBookButton.addEventListener("click", () => {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

closeModalButton.addEventListener("click", () => {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
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
  overlay.classList.add("hidden");
  bookForm.reset();
});
