import Header from "./components/Header/Header";
import Post from "./components/Post/Post";
import Users from "./components/Users/Users";
import "./styles/app.scss";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Users></Users>
      <Post></Post>
    </div>
  );
}

export default App;
