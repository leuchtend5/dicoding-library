(() => {
  let allBook = [];

  let menuClicked = {
    home: false,
    read: false,
    unread: false,
    search: false,
  };

  function resetTable() {
    while (tableBody.firstElementChild) {
      tableBody.firstElementChild.remove();
    }
  }

  function loopAllBook() {
    allBook.forEach((book) => showBook(book));
  }

  const tableBody = document.querySelector("tbody");

  // SEARCH FUNCTION
  const searchMenu = document.querySelector("li:nth-child(5)");
  const searchContent = document.getElementsByClassName("search-container");
  const searchInput = document.getElementsByClassName("search");
  const searchButton = document.getElementsByClassName("search-btn");
  const notFoundText = document.getElementsByClassName("not-found-text");

  function searchFunction(userInput) {
    const searchResult = allBook.filter((book) =>
      book.title.toLowerCase().includes(userInput.toLowerCase())
    );
    if (searchResult.length == 0) {
      notFoundText[0].textContent = "Not Found";
    } else {
      notFoundText[0].textContent = "";
      searchResult.forEach((book) => showBook(book));
    }
  }

  searchButton[0].addEventListener("click", () => {
    resetTable();
    searchFunction(searchInput[0].value);
  });

  searchMenu.addEventListener("click", () => {
    searchContent[0].classList.add("active");
    searchInput[0].value = "";
    menuClicked = {
      home: false,
      read: false,
      unread: false,
      search: true,
    };
    localStorage.setItem("menu clicked", JSON.stringify(menuClicked));
    resetTable();
  });

  // HOME PAGE TO SHOW ALL THE BOOK
  const homeMenu = document.querySelector("li:nth-child(1)");

  homeMenu.addEventListener("click", () => {
    searchContent[0].classList.remove("active");
    menuClicked = {
      home: true,
      read: false,
      unread: false,
      search: false,
    };
    localStorage.setItem("menu clicked", JSON.stringify(menuClicked));

    resetTable();
    loopAllBook();
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
      return;
    } else {
      showBook(newBook);
      allBook.push(newBook);
      setLocalStorage();
      blurBg[0].classList.remove("active");
      formAdd[0].classList.remove("active");
    }
  }

  addBookMenu.addEventListener("click", () => {
    blurBg[0].classList.add("active");
    formAdd[0].classList.add("active");
    inputTitle.value = "";
    inputAuthor.value = "";
    inputYear.value = "";
    inputPages.value = "";
    inputRead.checked = false;
    errorText[0].textContent = "";
  });

  inputForm.addEventListener("submit", (e) => {
    addNewBook();
    menuClicked = {
      home: true,
      read: false,
      unread: false,
      search: false,
    };
    document.dispatchEvent(new Event("changeData"));
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
        newBook.isRead = true;
        setLocalStorage();
        document.dispatchEvent(new Event("changeData"));
      } else {
        newBook.isRead = false;
        setLocalStorage();
        document.dispatchEvent(new Event("changeData"));
      }
    });

    deleteButton.addEventListener("click", () => {
      if (confirm("are you sure to remove this book ?")) {
        removeBook(newBook.title);
        newRow.remove();
      }
    });
  }

  // REMOVE FUNCTION TO REMOVE THE SELECTED BOOK FROM LIBRARY AND TABLE
  function removeBook(newBookTitle) {
    allBook.splice(
      allBook.findIndex((book) => book.title === newBookTitle),
      1
    );
    setLocalStorage();
  }

  // TO SHOW ONLY THE READ BOOKS
  const readMenu = document.querySelector("li:nth-child(3)");

  function readBookFunction() {
    const readBookFilter = allBook.filter((book) => book.isRead == true);
    readBookFilter.forEach((book) => showBook(book));
  }

  readMenu.addEventListener("click", () => {
    searchContent[0].classList.remove("active");
    menuClicked = {
      home: false,
      read: true,
      unread: false,
      search: false,
    };
    localStorage.setItem("menu clicked", JSON.stringify(menuClicked));

    resetTable();
    readBookFunction();
  });

  // TO SHOW ONLY UNREAD BOOKS
  const unreadMenu = document.querySelector("li:nth-child(4)");

  function unreadBookFunction() {
    const unreadBookFilter = allBook.filter((book) => book.isRead == false);
    unreadBookFilter.forEach((book) => showBook(book));
  }

  unreadMenu.addEventListener("click", () => {
    searchContent[0].classList.remove("active");
    menuClicked = {
      home: false,
      read: false,
      unread: true,
      search: false,
    };
    localStorage.setItem("menu clicked", JSON.stringify(menuClicked));

    resetTable();
    unreadBookFunction();
  });

  // SET AND GET ITEM FROM LOCAL STORAGE
  function setLocalStorage() {
    localStorage.setItem("all books", JSON.stringify(allBook));
  }

  function getLocalStorage() {
    if (localStorage.getItem("all books")) {
      allBook = JSON.parse(localStorage.getItem("all books"));
    } else {
      allBook = [];
    }
  }

  function showCurrentData() {
    getLocalStorage();
    let getMenuClicked = JSON.parse(localStorage.getItem("menu clicked"));
    if (getMenuClicked.home) {
      resetTable();
      loopAllBook();
    } else if (getMenuClicked.read) {
      resetTable();
      readBookFunction();
    } else if (getMenuClicked.search) {
      resetTable();
      searchFunction(searchInput[0].value);
      searchContent[0].classList.add("active");
    } else {
      resetTable();
      unreadBookFunction();
    }
  }

  // KEEP THE CURRENT ACTIVE PAGE WHEN USER REFRESH THE PAGE
  window.addEventListener("load", () => {
    document.addEventListener("changeData", showCurrentData);
    document.dispatchEvent(new Event("changeData"));
  });
})();
