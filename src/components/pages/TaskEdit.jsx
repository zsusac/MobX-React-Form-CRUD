import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import TaskFormStore from '../../stores/TaskFormStore.jsx';
import {Link} from 'react-router';
import TaskForm from '../forms/TaskForm.jsx';

@inject('TaskFormStore')
@observer
class TaskEdit extends Component {

    constructor(props) {
        super(props);
        const {TaskFormStore} = this.props;
        // Reset the TaskForm to default values.
        TaskFormStore.reset();
        // Fetch task and populate TaskForm with task data
        TaskFormStore.fetchById(this.props.params.id);
    }

    render() {

        return (
            <div>
                <TaskForm/>
                <Link to={'/'}>Back</Link>
            </div>
        )
    }
}

TaskEdit.propTypes = {
    TaskFormStore: React
        .PropTypes
        .objectOf(TaskFormStore)
}

export default TaskEdit