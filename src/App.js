import DragDrop from "./components/dragDrop/DragDrop";
import { store } from "./redux/store";
import { Provider } from "react-redux";
function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <DragDrop />
      </Provider>
    </div>
  );
}

export default App;
