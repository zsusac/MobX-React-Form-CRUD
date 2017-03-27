import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import TaskFormStore from '../../stores/TaskFormStore.jsx';
import {Link} from 'react-router';
import TaskForm from '../forms/TaskForm.jsx';

@inject('TaskFormStore')
@observer
class TaskNew extends Component {

    constructor(props) {
        super(props);
        const {TaskFormStore} = this.props;
        // Reset the TaskForm to default values.
        TaskFormStore.reset();
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

TaskNew.propTypes = {
    TaskFormStore: React
        .PropTypes
        .objectOf(TaskFormStore)
}

export default TaskNew