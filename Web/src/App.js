//style
import { GlobalStyles } from './GlobalStyles';
import RouterSetup from './components/RouterSetup';
import { UserContextProvider } from './Context/userContext';
import {API} from './config/api';
if (localStorage?.token) {
  API.defaults.headers.common['Authorization'] = `Bearer ${localStorage.token}`
} else {
  delete API.defaults.headers.common['Authorization']
}
function App() {

  return (
    <UserContextProvider>
      <RouterSetup/>
      <GlobalStyles/>
    </UserContextProvider>
  );
}

export default App;