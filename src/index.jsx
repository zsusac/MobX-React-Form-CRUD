import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { Router, Route, hashHistory } from 'react-router';

import Task from './components/pages/Task.jsx';
import TaskEdit from './components/pages/TaskEdit.jsx';
import TaskNew from './components/pages/TaskNew.jsx';
import TaskFormStore from './stores/TaskFormStore.jsx';

import Project from './components/pages/project/Project.jsx';
import ProjectEdit from './components/pages/project/ProjectEdit.jsx';
import ProjectFormStore from './stores/ProjectFormStore.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

const stores = { TaskFormStore, ProjectFormStore };

render((
    <Provider { ...stores }>
        <Router history={hashHistory}>
            <Route path="/" component={Task}/>
            <Route path="/task/new" component={TaskNew} />
            <Route path="/task/:id" component={TaskEdit} />
            <Route path="/project" component={Project}/>
            <Route path="/project/:id" component={ProjectEdit}/>
        </Router>
    </Provider>
), document.getElementById('root'))
