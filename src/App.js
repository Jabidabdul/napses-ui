
import RoutePages from './RoutePages'
import {BrowserRouter} from 'react-router-dom'
import { AmountProvider } from './context/totalAmount';

function App() {
  return (
    <AmountProvider>
        <div className="App">
          <BrowserRouter>
              <RoutePages />
          </BrowserRouter>
        </div>
    </AmountProvider>

  );
}

export default App;
