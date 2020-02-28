class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
class UI {

    static displaybooks() {
        const storedbooks = [
            {
                title: 'hello',
                author: 'M.S H',
                isbn: '12345'
            },
            {
                title: 'Hello2',
                author: 'M.S',
                isbn: '123466'
            }
        ];
        console.log("chala");
        // const books=storedbooks;
        const books = Store.getbooks();
        books.forEach((book) => UI.addbooktolist(book))
    }
    static addbooktolist(book) {
        const list = document.querySelector("#book-list");
        const row = document.createElement('tr');
        row.innerHTML = `
                    <td>${book.title}</td>
                    <td>${book.author}</td>
                    <td>${book.isbn}</td>
                    <td><a href='#' class="btn btn-danger btn-sm delete">X</a><td>    
                    `;
        list.appendChild(row);


    }
    static clearField() {
        document.getElementById("title").value = '';
        document.getElementById("author").value = '';
        document.getElementById("isbn").value = '';
    }
    static showAlertMessage(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
        setTimeout(() => {
            document.querySelector('.alert').remove();
        }, 3000);
    }
    static deleteBook(el) {
        if (el.classList.contains('delete')) {
            if (confirm("Are You Sure")) {
                el.parentElement.parentElement.remove();
                // UI.showAlertMessage('Book Deleted Succesfully', 'success');
            }
        }
    }


}
//Sorage for local
class Store {
    static getbooks() {
        let books;
        if (localStorage.getItem("books") === null)
            books = [];
        else
            books = JSON.parse(localStorage.getItem("books"));
        return books;
    }
    static Addbooks(book) {
        let books = Store.getbooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }
    static removeBook(isbn) {
        const books = Store.getbooks();
        books.forEach((book, index) => {
            if (book.isbn === isbn)
                books.splice(index, 1);
        })
        localStorage.setItem('books', JSON.stringify(books));
    }
}
//Page Loaded
document.addEventListener('DOMContentLoaded', UI.displaybooks());
//Event: ADD a Book
document.querySelector('#book-form').addEventListener('submit', (p) => {
    console.log("Chala tha");
    p.preventDefault();
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const isbn = document.getElementById("isbn").value;
    if (title === "" || author === "" || isbn === "") {
        UI.showAlertMessage("book not Added", "danger");

    }
    else {
        const book = new Book(title, author, isbn);
        Store.Addbooks(book);
        UI.addbooktolist(book);
        UI.clearField();
        UI.showAlertMessage("Book Added Succesfully", "success");
    }
})
//Event: Remove Book
document.querySelector('#book-list').addEventListener('click', (e) => {
    //delete book from UI
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlertMessage("Book Deleted Succesfully", "success");

})
