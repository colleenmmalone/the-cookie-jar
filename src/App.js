import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> this is the main div</p>
        <img src={logo} className="App-logo" alt="logo" />

        <p>Colleen edit</p>

      </header>
    </div>
  );
}

export default App;
//new code for update
<Route
  exact
  path="/inventory/:id/edit"
  render={props => <ItemEditForm {...props} updateItem={this.updateItem} />}
/>
updateItem = item => {
  axios.put(`http://localhost:8081/inventory/${item.id}`, item)
    .then(res => {
      this.setState({items: res.data});
      this.props.history.push('/items');
    })
    .catch(err => console.log(err));
}