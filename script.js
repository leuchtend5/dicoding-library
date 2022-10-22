(() => {
  let allBook = [];

  const tableBody = document.querySelector("tbody");
  const content = document.getElementsByClassName("content");
  const searchBook = document.querySelector("li:nth-child(5)");

  // HOME PAGE TO SHOW ALL THE BOOK
  const home = document.querySelector("li:nth-child(1)");

  home.addEventListener("click", () => {
    while (tableBody.firstElementChild) {
      tableBody.firstElementChild.remove();
    }

    allBook.forEach((book) => showBook(book));
  });

  // CLOSE FORM BUTTON FUNCTION
  const closeBtn = document.querySelector("span");
  const blurBg = document.getElementsByClassName("blur-bg");

  function closeForm() {
    blurBg[0].classList.remove("active");
    formAdd[0].classList.remove("active");
  }

  closeBtn.addEventListener("click", closeForm);

  // CHECKING IF THE NEW BOOK IS ALREADY IN THE LIBRARY
  function checkSameBook(newBook) {
    return allBook.some((book) => book.title === newBook.title);
  }

  // ADD NEW BOOK FUNCTION
  const inputForm = document.getElementById("form");
  const addBookMenu = document.querySelector("li:nth-child(2)");
  const formAdd = document.getElementsByClassName("form-add-book");
  const errorText = document.getElementsByClassName("error");
  const inputTitle = document.getElementById("title");
  const inputAuthor = document.getElementById("author");
  const inputYear = document.getElementById("year");
  const inputPages = document.getElementById("pages");
  const inputRead = document.getElementById("read");

  function addNewBook() {
    const newBook = {
      title: inputTitle.value,
      author: inputAuthor.value,
      year: inputYear.value,
      pages: inputPages.value,
      isRead: inputRead.checked,
    };

    if (checkSameBook(newBook)) {
      errorText[0].textContent = "This book already in your library";
    } else {
      allBook.push(newBook);
      blurBg[0].classList.remove("active");
      formAdd[0].classList.remove("active");
    }

    showBook(newBook);
  }

  addBookMenu.addEventListener("click", () => {
    blurBg[0].classList.add("active");
    formAdd[0].classList.add("active");
    inputTitle.value = "";
    inputAuthor.value = "";
    inputYear.value = "";
    inputPages.value = "";
    inputRead.value = "";
  });

  inputForm.addEventListener("submit", (e) => {
    addNewBook();
    e.preventDefault();
  });

  // TO SHOW THE NEW BOOK ON THE PAGE
  function showBook(newBook) {
    const newRow = document.createElement("tr");
    const title = document.createElement("td");
    const author = document.createElement("td");
    const year = document.createElement("td");
    const pages = document.createElement("td");
    const isRead = document.createElement("td");
    const deleteElement = document.createElement("td");
    const isReadButton = document.createElement("button");
    const deleteButton = document.createElement("button");

    isReadButton.classList.add("status");
    deleteButton.classList.add("delete");

    tableBody.appendChild(newRow);
    newRow.appendChild(title);
    newRow.appendChild(author);
    newRow.appendChild(year);
    newRow.appendChild(pages);
    newRow.appendChild(isRead);
    newRow.appendChild(deleteElement);
    isRead.appendChild(isReadButton);
    deleteElement.appendChild(deleteButton);

    title.textContent = newBook.title;
    author.textContent = newBook.author;
    year.textContent = newBook.year;
    pages.textContent = newBook.pages;
    deleteButton.textContent = "Delete";

    if (newBook.isRead == true) {
      isReadButton.textContent = "Read";
      isReadButton.style.backgroundColor = "#74ba61";
    } else {
      isReadButton.textContent = "Not Read";
      isReadButton.style.backgroundColor = "";
    }

    isReadButton.addEventListener("click", () => {
      if (newBook.isRead == false) {
        isReadButton.textContent = "Read";
        isReadButton.style.backgroundColor = "#74ba61";
        newBook.isRead = true;
      } else {
        isReadButton.textContent = "Not Read";
        isReadButton.style.backgroundColor = "";
        newBook.isRead = false;
      }
    });

    deleteButton.addEventListener("click", () => {
      removeBook(newBook.title);
      newRow.remove();
    });
  }

  // REMOVE FUNCTION TO REMOVE THE SELECTED BOOK FROM LIBRARY AND TABLE
  function removeBook(newBookTitle) {
    return allBook.splice(
      allBook.findIndex((book) => book === newBookTitle),
      1
    );
  }

  // TO SHOW ONLY THE READ BOOKS
  const readBook = document.querySelector("li:nth-child(3)");

  readBook.addEventListener("click", () => {
    while (tableBody.firstElementChild) {
      tableBody.firstElementChild.remove();
    }

    const readBookFilter = allBook.filter((book) => book.isRead == true);

    readBookFilter.forEach((book) => showBook(book));
  });

  // TO SHOW ONLY UNREAD BOOKS
  const unreadBook = document.querySelector("li:nth-child(4)");

  unreadBook.addEventListener("click", () => {
    while (tableBody.firstElementChild) {
      tableBody.firstElementChild.remove();
    }

    const unreadBookFilter = allBook.filter((book) => book.isRead == false);

    unreadBookFilter.forEach((book) => showBook(book));
  });
})();
