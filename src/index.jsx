import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, Route, hashHistory } from 'react-router';
import Task from './components/Task.jsx';
import TaskEdit from './components/TaskEdit.jsx';
import TaskNew from './components/TaskNew.jsx';
import TaskFormStore from './stores/TaskFormStore.jsx';

const stores = { TaskFormStore };

render((
    <Provider { ...stores }>
        <Router history={hashHistory}>
            <Route path="/" component={Task}/>
            <Route path="/task/new" component={TaskNew} />
            <Route path="/task/:id" component={TaskEdit} />
        </Router>
    </Provider>
), document.getElementById('root'))