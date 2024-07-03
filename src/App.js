import "./App.css";
import Shape from "./Components/Shape";

const data = [
  ["1", "1", "1"],
  ["1", "0", "0"],
  ["1", "1", "1"],
];

function App() {
  return (
    <div className="App">
      <Shape parsedData={data} />
    </div>
  );
}

export default App;
