import ReactDOM from 'react-dom/client';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { BaseProvider, LightTheme } from 'baseui';
import App from './App';

const engine = new Styletron();

const container = document.getElementById('root');
if (!container) throw new Error("Root container missing in index.html");

const root = ReactDOM.createRoot(container);

root.render(
  <StyletronProvider value={engine}>
    <BaseProvider theme={LightTheme}>
      <App />
    </BaseProvider>
  </StyletronProvider>
);
