import {ListTasksView} from "./view/listTasks";
import CreateTaskView from "./view/createTaskView";
import "./app.css"
import CreateCategory from "./view/createCategory";
function App() {

  return (
<>
<CreateTaskView></CreateTaskView>
<ListTasksView></ListTasksView>
<CreateCategory />

</>
  );
}

export default App;
