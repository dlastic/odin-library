class Library {
  constructor() {
    this.books = [];
  }

  addBook(title, author, pages, read) {
    const id = crypto.randomUUID();
    const book = new Book(title, author, pages, read, id);
    this.books.push(book);
  }

  removeBookById(id) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
    }
  }

  toggleReadStatusById(id) {
    const book = this.books.find((book) => book.id === id);
    if (book) {
      book.toggleReadStatus();
    }
  }

  getBooks() {
    return this.books;
  }
}

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
  }

  renderCard(onToggleRead, onRemove) {
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

    toggleButton.addEventListener("click", onToggleRead);
    removeButton.addEventListener("click", onRemove);

    card.appendChild(title);
    card.appendChild(author);
    card.appendChild(pages);
    card.appendChild(toggleButton);
    card.appendChild(removeButton);

    return card;
  }
}

const LibraryUI = (() => {
  const addBookButton = document.querySelector(".add-book");
  const modal = document.querySelector(".modal");
  const overlay = document.querySelector(".overlay");
  const closeModalButton = document.querySelector(".close-modal");
  const bookForm = document.querySelector("#book-form");
  const titleInput = document.querySelector("#title");
  const authorInput = document.querySelector("#author");
  const pagesInput = document.querySelector("#pages");
  const readInput = document.querySelector("#read");
  const bookList = document.querySelector(".container");

  const openModal = () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };

  const closeModal = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };

  const handleAddBook = (e) => {
    e.preventDefault();

    const title = titleInput.value;
    const author = authorInput.value;
    const pages = parseInt(pagesInput.value);
    const read = readInput.value === "true";

    myLibrary.addBook(title, author, pages, read);
    displayBooks();
    closeModal();
    bookForm.reset();
  };

  const handleRemoveBook = (id) => {
    myLibrary.removeBookById(id);
    displayBooks();
  };

  const handleToggleReadStatus = (id) => {
    myLibrary.toggleReadStatusById(id);
    displayBooks();
  };

  const displayBooks = () => {
    const books = myLibrary.getBooks();
    bookList.innerHTML = "";

    books.forEach((book) => {
      const card = book.renderCard(
        () => handleToggleReadStatus(book.id),
        () => handleRemoveBook(book.id)
      );
      bookList.appendChild(card);
    });
  };

  const bindEvents = () => {
    addBookButton.addEventListener("click", openModal);
    closeModalButton.addEventListener("click", closeModal);
    bookForm.addEventListener("submit", handleAddBook);
  };

  const init = () => bindEvents();

  return { init };
})();

const myLibrary = new Library();
LibraryUI.init();
