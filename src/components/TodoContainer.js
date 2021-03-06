import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import TodoList from './TodoList';
import Header from './Header';
import InputTodo from './InputTodo';


class TodoContainer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            todos: [],
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(id) {
        //Note how we are wrapping the object in the setState callback with a parenthesis, (). 
        //An alternative is to use the return statement to explicitly return the object 
        this.setState(preState => ({
            todos: preState.todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed,
                    }
                }
                return todo;
            })
        }));
    }

    delTodo = id => {
        this.setState({
            todos: [
                ...this.state.todos.filter(todo => {
                    return todo.id !== id;
                })
            ]
        });
        console.log("deleted",id);
    };

    addTodoItem = title => {
        const newTodo = {
            id: uuidv4(),
            title: title,
            completed: false
        };

        this.setState({
            todos: [...this.state.todos, newTodo]
        });

        console.log(title);
    };

    setUpdate = (updatedTitle, id) => {
        this.setState({
            todos: this.state.todos.map(todo => {
                if (todo.id === id) {
                    todo.title = updatedTitle;
                }
                return todo;
            }),
        })
        console.log(updatedTitle, id);
    }

    componentDidMount() {
        const temp = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(temp);

        if (loadedTodos) {
            this.setState({
                todos: loadedTodos
            })
        }
    }

    componentDidUpdate(prePros, preState) {
        if (preState.todos !== this.state.todos) {
            const temp = JSON.stringify(this.state.todos);
            localStorage.setItem("todos", temp);
        }
    }

    render() {
        return (
            <div className="container">
                <div className="inner">
                    <Header />
                    <InputTodo addTodoProps={this.addTodoItem}/>
                    <TodoList 
                        todos={this.state.todos} 
                        handleChangeProps={this.handleChange} 
                        deleteTodoProps={this.delTodo}
                        setUpdate={this.setUpdate}
                    />
                </div>
            </div>
        )
    }
}

export default TodoContainer;