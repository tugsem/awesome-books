import luxon from './date_app.js';

const form = document.querySelector('#form');
const container = document.querySelector('.container');
const storage = window.localStorage;
const titleInp = document.querySelector('#title');
const authorInp = document.querySelector('#author');
let bookCollection = JSON.parse(storage.getItem('books') || []);

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
    this.id = Date.now();
  }
}

const methods = {

  add() {
    const book = new Book(titleInp.value, authorInp.value);
    bookCollection.push(book);
    storage.setItem('books', JSON.stringify(bookCollection));
    container.innerHTML += `
    <div class="single-book" id="${book.id}">
      <div class="bio">
          <h3 class="uppercase" >"${book.title}"</h3>
          <h3>by<h3>
          <h3 class="uppercase">${book.author}</h3>
      </div>
      <button type="submit" class="rmvBtn">Remove</button>
    </div>`;
    container.className = 'List';
    titleInp.value = '';
    authorInp.value = '';
  },

  display() {
    bookCollection = JSON.parse(storage.getItem('books')) || [];
    let bookContainer = '';
    bookCollection.forEach((book) => {
      bookContainer += `
      <div class="single-book" id="${book.id}">
        <div class="bio">
            <h3 class="uppercase" >"${book.title}"</h3>
            <h3>by<h3>
            <h3 class="uppercase">${book.author}</h3>
        </div>
        <button type="submit" class="rmvBtn">Remove</button>
    </div>`;
    });
    container.innerHTML = bookContainer;
    container.className = 'List';
  },

  remove(id) {
    bookCollection = JSON.parse(storage.getItem('books'));
    bookCollection.forEach((book) => {
      if(book.id == id ) { //eslint-disable-line
        const index = bookCollection.indexOf(book);
        bookCollection.splice(index, 1);
      }
    });
    storage.setItem('books', JSON.stringify(bookCollection));
    this.display();
  },
};

const date = document.querySelector('#date');
const dateTime = luxon.DateTime.utc().toLocaleString(luxon.DateTime.DATETIME_FULL);
date.textContent = dateTime;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  methods.add();
});

container.addEventListener('click', (e) => {
  if(e.target.className == "rmvBtn") {  //eslint-disable-line
    const element = e.target.parentNode;
    element.remove();
    methods.remove(element.id);
  }
});

window.onload = methods.display();
