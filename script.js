const form = document.querySelector('#form');
const container = document.querySelector('.container');
const storage = window.localStorage;
const titleInp = document.querySelector('#title');
const authorInp = document.querySelector('#author');

class Book {
  constructor() {
    this.bookList = JSON.parse(storage.getItem('books')) || [];
  }

  addBook(title, author) {
    const book = { title, author };
    this.bookList.push(book);
    storage.setItem('books', JSON.stringify(this.bookList));
    this.displayBooks();
    titleInp.value = '';
    authorInp.value = '';
  }

  displayBooks() {
    this.bookList = JSON.parse(storage.getItem('books'));
    let bookContainer = '';
    for (let i = 0; i < this.bookList.length; i += 1) {
      bookContainer += `<div>
                          <p>${this.bookList[i].title}</p>
                          <p>${this.bookList[i].author}</p>
                          <button type="submit" class="rmvBtn" onclick="remove(${i})">Remove</button>
                          <hr />
                        </div>`;
    }
    container.innerHTML = bookContainer;
  }

  removeBook(index) {
    const newList = this.bookList.filter((_, i) => i !== index);
    storage.setItem('books', JSON.stringify(newList));
    this.displayBooks();
  }
}
const book = new Book();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (titleInp.value && authorInp.value) {
    book.addBook(titleInp.value, authorInp.value);
  }
});

function remove(index) { //eslint-disable-line
  book.removeBook(index);
}

book.displayBooks();