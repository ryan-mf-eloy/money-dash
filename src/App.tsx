/**
 * Styles
 */
import { ThemeProvider } from 'styled-components';
import { defaultTheme } from './styles/themes/default';
import { GlobalStyle } from './styles/global';
/**
 * Pages
 */
import Transactions from './pages/Transactions';
import { TransactionsContextProvider } from './contexts/TransactionsContext';

function App() {
 return (
  <>
   <ThemeProvider theme={defaultTheme}>
    <GlobalStyle />

    <TransactionsContextProvider>
     <Transactions />
    </TransactionsContextProvider>
   </ThemeProvider>
  </>
 );
}

export default App;
