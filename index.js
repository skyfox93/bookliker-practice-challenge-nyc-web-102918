
document.addEventListener("DOMContentLoaded", function() {
  const bookList= document.querySelector('#list')
  const showPanel= document.querySelector('#show-panel')
  let allBooks=[]

  function addBooks(books){
    bookList.innerHTML= books.reduce(function(booksHTML,book){
      return booksHTML + `<li data-type="book-li" data-id="${book.id}"> ${book.title} </li>`
    }, '')
  }
  function usersReducer(userHTML,user){
    return userHTML+ `<li> ${user.username}</li>`
  }
  function showBook(book){
    showPanel.innerHTML=`
    <h2> ${book.title}</h2>
    <img src=${book.img_url}>
    <p> ${book.description}</p>
    <ul id="user-list"> Liked By:
    ${book.users.reduce(usersReducer,'')}
     </ul>
    <button data-id=${book.id} id=like-btn> ${book.users.find((user)=> user.id ===1) ? "Unlike" : "Like"} </button>`
  }

  function handleBookClick(e){
    if(event.target.dataset.type ==='book-li'){
      const foundBook=allBooks.find((book)=>book.id==e.target.dataset.id)
      if (foundBook){showBook(foundBook)}
    }
  }
  function likeBook(event){
    const id= event.target.dataset.id
    const foundBook=allBooks.find((book)=>book.id==id)
    function sentUsers(){
      const usersCopy=foundBook.users.slice();
      const me=usersCopy.find((user)=> user.id ===1)
      if(me){
        const myIndex=usersCopy.indexOf(me);
        usersCopy.splice(myIndex,1);
        return usersCopy
      }
      else {
        return [...foundBook.users, {"id": 1, "username":
        "pouros"}]
      }
    }

    adapter.patch(`/books/${id}`, {
      users: sentUsers()
    }).then((bookJSON)=> {
      let bookIndex=allBooks.findIndex((book)=>book.id===bookJSON.id)
      allBooks[bookIndex]=bookJSON
      showBook(bookJSON)
    })

  }
  function handlePanelClick(event){
    if (event.target.id==='like-btn'){likeBook(event)}
  }

  bookList.addEventListener('click', handleBookClick)
  showPanel.addEventListener('click', handlePanelClick)
  const adapter=Adapter('http://localhost:3000')
  adapter.get('/books').then((books)=>{allBooks=books;addBooks(books)})
});
