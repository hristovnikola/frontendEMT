import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Categories from "../categories/categories";
import Header from "../Header/header";
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";
import Books from "../Books/BookList/books";
import BooksService from "../../repository/booksRepository";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            categories: [],
            authors: [],
            selectedBook: {},
        }
    }

    render() {
        return (
            <div>
                <Router>
                    <Header/>
                    <Route path={"/books/categories"} exact render={() =>
                        <Categories categories={this.state.categories}/>}/>

                    <Route path={"/books/add"} exact render={() =>
                        <BookAdd categories={this.state.categories}
                                 authors={this.state.authors}
                                 onAddBook={this.addBook}/>}/>

                    <Route path={"/books/edit/:id"} exact render={() =>
                        <BookEdit categories={this.state.categories}
                                  authors={this.state.authors}
                                  onEditBook={this.editBook}
                                  book={this.state.selectedBook}/>}/>

                    <Route path={"/books"} exact render={() =>
                        <Books books={this.state.books}
                               onDelete={this.deleteBook}
                               onEdit={this.getBook}
                               onRentBook={this.rentBook}/>}/>

                    <Route path={"/"} exact render={() =>
                        <Books books={this.state.books}
                               onDelete={this.deleteBook}
                               onEdit={this.getBook}
                               onRentBook={this.rentBook}/>}/>

                    <Redirect to={"/books"}/>
                </Router>
            </div>
        );
    }

    componentDidMount() {
        this.loadBooks();
        this.loadCategories();
        this.loadAuthors();
    }

    loadBooks = () => {
        BooksService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            })
    }

    loadCategories = () => {
        BooksService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            })
    }

    loadAuthors = () => {
        BooksService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            })
    }

    rentBook = (id) => {
        BooksService.rentBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    deleteBook = (id) => {
        BooksService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            })
    }

    addBook = (name, author, category, availableCopies) => {
        BooksService.addBook(name, author, category, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }

    getBook = (id) => {
        BooksService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    editBook = (id, name, author, category, availableCopies) => {
        BooksService.editBook(id, name, author, category, availableCopies)
            .then(() => {
                this.loadBooks();
            })
    }
}
export default App;
