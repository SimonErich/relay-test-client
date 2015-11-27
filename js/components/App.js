import React from 'react';
import Relay from 'react-relay';
import AddTodoMutation from '../mutations/AddTodoMutation'

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer('http://todo.localhost.com/graphql')
);

class App extends React.Component {

  addTodo() {
    Relay.Store.update(new AddTodoMutation({
      todo: { title: "Neues Todo: "+ new Date().getTime() }
    }));
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.addTodo}>Neu</button>
        <h1>Widget list</h1>
        <ul>
          {this.props.viewer.todos.edges.map(edge =>
            <li>{edge.node.title} (ID: {edge.node.id})</li>
          )}
        </ul>
      </div>
    );
  }
}

export default Relay.createContainer(App, {
  fragments: {
    viewer: () => Relay.QL`
      fragment on User {
        todos(first: 10) {
          edges {
            node {
              id,
              title,
            },
          },
        },
      }
    `,
  },
});
