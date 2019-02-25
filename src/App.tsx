import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from './router';
import { Alerts } from './containers';

class App extends React.Component {
    public render() {
        return (
            <BrowserRouter basename="/tower">
                <React.Fragment>
                    <Alerts />
                    <AppRouter />
                </React.Fragment>
            </BrowserRouter>
        );
    }
}

export default App;
