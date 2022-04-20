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
    container.innerHTML += `<div id="${book.id}">
                          <p>${book.title}</p>
                          <p>${book.author}</p>
                          <button type="submit" class="rmvBtn">Remove</button>
                          <hr />
                        </div>`;

    titleInp.value = '';
    authorInp.value = '';
  },

  display() {
    bookCollection = JSON.parse(storage.getItem('books')) || [];
    let bookContainer = '';
    bookCollection.forEach((book) => {
      bookContainer += `<div id="${book.id}">
                          <p>${book.title}</p>
                          <p>${book.author}</p>
                          <button type="submit" class="rmvBtn">Remove</button>
                          <hr />
                        </div>`;
    });
    container.innerHTML = bookContainer;
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
