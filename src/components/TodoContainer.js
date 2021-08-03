import React from 'react';
import TodoList from './TodoList';
import Header from './Header';

class TodoContainer extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            todos: [
                {
                    id: 1,
                    title: "Setup development environment",
                    completed: true,
                },
                {
                    id: 2,
                    title: "Develop website and add content",
                    completed: false,
                },
                {
                    id: 3,
                    title: "Deploy to live server",
                    completed: false,
                }
            ]
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

    render() {
        return (
            <div>
                <Header />
                <TodoList 
                    todos={this.state.todos} 
                    handleChangeProps={this.handleChange} 
                    deleteTodoProps={this.delTodo}
                />
            </div>
        )
    }
}

export default TodoContainer;