const myLibrary = [];

function Book (title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        return `${this.title} by ${this.author} has ${this.pages} and has been ${this.read}.`;
    }
};

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book (title, author, pages, read);
    myLibrary.push(newBook);
};

addBookToLibrary("Gone With The Wind", "M.C. Peters", "100", true);
addBookToLibrary("Great Expectations", "Charles Dickens", "200", true);
addBookToLibrary("1984", "George Orwell", "400", true);
addBookToLibrary("War & Peace", "Leo Tolstoy", "900", true);
addBookToLibrary("Catch 22", "Joseph Heller", "289", true);

function buildPage (myLibrary) {
    const library = document.querySelector('.library');

    myLibrary.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.setAttribute('data-index', myLibrary.indexOf(book));
        
        //add title, author, pages, and read status
        const title = document.createElement('h2');
        title.textContent = book.title;
        title.classList.add('title');
        const author = document.createElement('h3');
        author.textContent = book.author;
        author.classList.add('author');
        const pages = document.createElement('p');
        pages.textContent = `${book.pages} pages`;
        pages.classList.add('author');
        const read = document.createElement('p');
        read.textContent = book.read ? 'Read' : 'Unread';
        read.classList.add('read');
        
        //add remove button
        const remove = document.createElement('button');
        remove.textContent = 'Remove';
        remove.classList.add('remove');
        remove.addEventListener('click', (e) => {
            const card = e.target.closest('.book-card');
            removeBook(card);
        });
        
        //add toggle read button
        const toggleRead = document.createElement('button');
        toggleRead.textContent = 'Toggle Read';
        toggleRead.classList.add('toggle');
        toggleRead.addEventListener('click', () => {
            book.toggleRead(e);
        });
        
        bookCard.appendChild(title);
        bookCard.appendChild(author);
        bookCard.appendChild(pages);
        bookCard.appendChild(read);
        bookCard.appendChild(remove);
        bookCard.appendChild(toggleRead);
        library.appendChild(bookCard);
    });
};

function removeBook(card) {
    card.remove(); 
};

Book.prototype.toggleRead = function() {
    if (this.read === true) {
        this.read = false;
    } else {
        this.read = true;
    }
    console.log(this.read);
    console.log(`${myLibrary.indexOf(this)}`);
    const bookCard = document.querySelector(`[data-index="${myLibrary.indexOf(this)}"]`);
    const read = bookCard.querySelector('p.read');
    read.textContent = this.read ? 'Read' : 'Unread';
    
    return this.read;
}

const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".add");
const closeButton = document.querySelector(".close");
const submitButton = document.querySelector(".submit");

// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});

// "Close" button closes the dialog
submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    let formData = [{
        title: document.getElementById("title").value,
        author: document.getElementById("author").value,
        pages: document.getElementById("pages").value,
        read: document.getElementById("read").value
    }];
    addBookToLibrary(formData);
    buildPage(formData);
    document.getElementById("addBook").reset();
    dialog.close();
  });



buildPage(myLibrary);