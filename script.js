const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const addBtn = document.querySelector('#add');
const bookContainer = document.querySelector('.container');
const bookDiv = document.createElement('div');
bookDiv.classList.add('added-book remove');


const booksArray = [];

addBtn.addEventListener('click', () => {
    let title = titleInput.value;
    let author = authorInput.value;
    const obj = {};
    obj.title = title;
    obj.author = author;
    booksArray.push(obj);
    let createNewTitle = document.createElement('h2');
    createNewTitle.textContent = title;
    let createNewAuthor = document.createElement('h3');
    createNewAuthor.innerText = author;
    const removeBtn = document.createElement('button');
    removeBtn.innerText ="Remove";
    bookDiv.append(createNewTitle, createNewAuthor, removeBtn);
    bookContainer.append(bookDiv);
    console.log(bookDiv.button);
})


