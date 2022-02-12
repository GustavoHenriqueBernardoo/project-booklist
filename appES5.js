// Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

// UI constructor

function UI() {}

// Add Book To list
UI.prototype.addBookToList = function(book){
  const list = document.getElementById('book-list');
  // Create a element TR
  const row = document.createElement('tr')
  // Insert colunms into the HTML
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X<a></td> 
  `;// this last line is the close "button"

  list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(message, className){
  // Create a div
  const div = document.createElement('div');
  // Add class Name
  div.className = `alert ${className}`;
  // Add Text
  div.appendChild(document.createTextNode(message));
  // Get a parent to insert the div into it
  const container = document.querySelector('.container');
  // Get form, form is after the container
  const form = document.querySelector('#book-form');
  //        insertBefore(what you want insert, what we want to insert before)
  // Insert Alert
  container.insertBefore(div, form );

  // Timeout after 3 sec
  setTimeout(function(){
    document.querySelector('.alert').remove();
  }, 3000)
}

// Delete Book
UI.prototype.deleteBook = function(target){
  if(target.className === 'delete'){
    target.parentElement.parentElement.remove();
  }
}

// Clear Fields
UI.prototype.clearFields = function(){
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

// Event Listeners for Add book
document.getElementById('book-form').addEventListener('submit', function(e){
  // Get form values
  const title = document.getElementById('title').value,
        author = document.getElementById('author').value,
        isbn = document.getElementById('isbn').value;
  
  // Instantiate book
  const book = new Book(title, author, isbn)

  // Instantiate UI
  const ui = new UI();

  // Validate 
  if(title === '' || author === '' || isbn === ''){
    // Calling the function Error Alert
    ui.showAlert('Please fill in all fields ', 'error')
  }else{
    // Calling the function Add book to list
    ui.addBookToList(book);
    
    // Show Sucess message
    ui.showAlert('Book Added!', 'success')

    // Calling the function Clear Fields
    ui.clearFields();
  }

   e.preventDefault();
})

// Event Listener for Delete

document.getElementById('book-list').addEventListener('click', function(e){
  // Instantiate UI
  const ui = new UI();

  //Delete book
  ui.deleteBook(e.target)

  // show message
  ui.showAlert('Book Removed!!', 'success')

  e.preventDefault();
})