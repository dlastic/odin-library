const myLibrary = [];

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
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
    const bookCard = document.createElement("div");
    bookCard.classList.add("card");
    bookCard.innerHTML = `
      <h2>${book.title}</h2>
      <p>${book.author}</p>
      <p>${book.pages} pages</p>
      <button>${book.read ? "Read" : "Not Read"}</button>      
      <button class="remove-button" data-id="${book.id}">Remove</button>
    `;
    bookList.appendChild(bookCard);
  });
}