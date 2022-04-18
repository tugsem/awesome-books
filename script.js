const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const addBtn = document.querySelector('#add');
const bookContainer = document.querySelector('.container');
const bookDiv = document.createElement('div');
bookDiv.classList.add('added-book');
const removeBtn = document.createElement('button');

const booksArray = [];
class newBook {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}
addBtn.addEventListener('click', () => {
    let title = titleInput.value;
    let author = authorInput.value;
    let addObj = new newBook(title, author);
    booksArray.push(addObj);
    let createNewTitle = document.createElement('h2');
    createNewTitle.textContent = title;
    let createNewAuthor = document.createElement('h3');
    createNewAuthor.innerText = author;
    removeBtn.innerText ="Remove";
    bookDiv.append(createNewTitle, createNewAuthor, removeBtn);
    bookContainer.append(bookDiv);
    console.log(booksArray);
})

