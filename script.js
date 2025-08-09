// Redirect if not logged in
if (window.location.pathname.endsWith("index.html")) {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "login.html";
  }
}

// Logout button
document.getElementById("logoutBtn")?.addEventListener("click", () => {
  localStorage.removeItem("loggedIn");
  window.location.href = "login.html";
});

// Sample book data
const books = [
  { id: 1, title: "Eloquent JavaScript", category: "programming", price: 350 },
  { id: 2, title: "The Alchemist", category: "fiction", price: 199 },
  { id: 3, title: "Atomic Habits", category: "selfhelp", price: 299 },
  { id: 4, title: "You Don’t Know JS", category: "programming", price: 399 },
  { id: 5, title: "The Great Gatsby", category: "fiction", price: 249 },
  { id: 6, title: "Deep Work", category: "selfhelp", price: 349 },
  { id: 7, title: "Baba Ramdev",category:"fiction", price:1000},
];

// Borrow history array
let borrowHistory = [];

// Get DOM elements
const bookList = document.getElementById("bookList");
const historyList = document.getElementById("historyList");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");

// Render books
function renderBooks(bookArray) {
  bookList.innerHTML = "";
  if(bookArray.length === 0){
    bookList.innerHTML = "<p>No books found.</p>";
    return;
  }
  bookArray.forEach(book => {
    const card = document.createElement("div");
    card.className = "book-card";
    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Category: ${capitalize(book.category)}</p>
      <p>Price: ₹${book.price}</p>
      <button onclick="borrowBook(${book.id})">Borrow</button>
    `;
    bookList.appendChild(card);
  });
}

// Borrow book function
function borrowBook(id) {
  const book = books.find(b => b.id === id);
  if (book) {
    const now = new Date();
    const entry = `${book.title} borrowed on ${now.toLocaleString()}`;
    borrowHistory.unshift(entry);
    renderHistory();
    alert(`You borrowed "${book.title}"`);
  }
}

// Render borrow history
function renderHistory() {
  historyList.innerHTML = "";
  borrowHistory.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// Capitalize helper
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Filter and search
function filterBooks() {
  const searchTerm = searchInput.value.toLowerCase();
  const selectedCategory = categoryFilter.value;

  const filtered = books.filter(book => {
    const matchesTitle = book.title.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "all" || book.category === selectedCategory;
    return matchesTitle && matchesCategory;
  });

  renderBooks(filtered);
}

// Event Listeners
searchInput.addEventListener("input", filterBooks);
categoryFilter.addEventListener("change", filterBooks);

// Initialize
renderBooks(books);
renderHistory();
