// variable declarement
const newBookButton = document.getElementById("newBook");
const overlay = document.getElementById("overlay");
const modal = document.getElementById("modal");
const closeModalButton = document.getElementById("closeModal");
const form = document.querySelector("form");
const listContainer = document.querySelector("ul");

const myLibrary = [];

function Book(title, author, page, readed) {
  this.title = title;
  this.author = author;
  this.page = page;
  this.readed = readed === "on";
}

// close and open modal function
function handleModal() {
  overlay.classList.toggle("hidden");
  modal.classList.toggle("hidden");
}

// button to open the form
newBookButton.addEventListener("click", handleModal);
closeModalButton.addEventListener("click", handleModal);
// make the book from the form submit
function getBookData(event) {
  event.preventDefault();
  //   get the form from the target
  const form = event.target;
  const formData = new FormData(form);
  const newBook = new Book(
    formData.get("title"),
    formData.get("author"),
    formData.get("pages"),
    formData.get("readed")
  );
  form.reset();
  return newBook;
}

//add the book
function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
}

form.addEventListener("submit", (e) => {
  const newBook = getBookData(e);
  addBookToLibrary(newBook);
  handleModal();
  showLibrary();
  //   console.log(myLibrary);
});

// change read function
function handleRead(index) {
  myLibrary[index].readed = !myLibrary[index].readed;
  showLibrary();
}

// remove book function
function removeBook(index) {
  myLibrary.splice(index, 1);
  showLibrary();
}

// show the book
function showLibrary() {
  // clear the list
  listContainer.innerHTML = "";

  //   loop the mylibrary to show the whole books
  myLibrary.map((book, index) => {
    const li = document.createElement("li");
    li.textContent = `${book.title} by ${book.author}`;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "delete";
    const checkbox = document.createElement("input");
    const thisContainer = document.createElement("div");
    thisContainer.classList.add("checkbox-container");

    checkbox.type = "checkbox";
    checkbox.checked = book.readed;
    checkbox.addEventListener("click", () => handleRead(index));
    deleteButton.addEventListener("click", () => removeBook(index));

    thisContainer.appendChild(deleteButton);
    thisContainer.appendChild(checkbox);
    li.appendChild(thisContainer);
    listContainer.appendChild(li);
  });
}
