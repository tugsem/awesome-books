const form = document.querySelector('#form');
const container = document.querySelector('.container');
const storage = window.localStorage;

let bookList = [];

function displayBooks() {
  const books = JSON.parse(storage.getItem('books'));
  if (books != null) {
    bookList = books;
  }
  let bookContainer = '';
  for (let i = 0; i < bookList.length; i += 1) {
    bookContainer += `<div>
                    <p>${bookList[i].title}</p>
                    <p>${bookList[i].author}</p>
                    <button type="submit" class="rmvBtn" onclick="removeBook(${i})">Remove</button>
                    <hr />
                  </div>`;
  }
  container.innerHTML = bookContainer;
}
/* eslint-disable no-unused-vars */
function removeBook(index) {
  const newList = bookList.filter((_, i) => i !== index);
  storage.setItem('books', JSON.stringify(newList));
  window.onload = displayBooks();
}
/* eslint-enable no-unused-vars */
function addBook() {
  const title = document.querySelector('#title');
  const author = document.querySelector('#author');
  bookList.push({ title: title.value, author: author.value });
  storage.setItem('books', JSON.stringify(bookList));
  displayBooks();
  title.value = '';
  author.value = '';
}

form.addEventListener('submit', addBook);

window.onload = displayBooks();
