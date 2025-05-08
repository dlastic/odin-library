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
    const title = document.createElement("h3");
    const author = document.createElement("p");
    const pages = document.createElement("p");
    const toggleButton = document.createElement("button");
    const removeButton = document.createElement("button");

    card.classList.add("card");
    title.classList.add("title");
    author.classList.add("author");
    pages.classList.add("pages");
    toggleButton.classList.add(
      "toggle-read-button",
      this.read ? "read" : "not-read"
    );
    removeButton.classList.add("remove-button");

    title.textContent = this.title;
    author.textContent = this.author;
    pages.textContent = `${this.pages} pages`;
    toggleButton.textContent = this.read ? "Read" : "Not Read";
    removeButton.textContent = "Remove";

    toggleButton.addEventListener("click", () => {
      this.toggleReadStatus();
    });

    removeButton.addEventListener("click", () => {
      this.removeFromLibrary();
    });

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(toggleButton);
    card.appendChild(removeButton);

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
