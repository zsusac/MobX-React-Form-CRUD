import React, {Component} from 'react';
import {inject, observer, action} from 'mobx-react';
import TaskListItem from '../TaskListItem.jsx';
import TaskFormStore from '../../stores/TaskFormStore.jsx';
import MobxReactFormDevTools from 'mobx-react-form-devtools';
import {Link} from 'react-router';

@inject('TaskFormStore')
@observer
class Task extends Component {

    constructor(props) {
        super(props);
        const {TaskFormStore} = this.props;
        TaskFormStore.fetchAll();
    }

    render() {
        const {TaskFormStore} = this.props;

        return (
            <div>
                <Link to={'/task/new'}>New</Link>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Task</th>
                                <th>Completed</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {TaskFormStore
                                .tasks
                                .map(task => {
                                    return <TaskListItem task={task} key={task.id}/>
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

Task.propTypes = {
    TaskFormStore: React.PropTypes.objectOf(TaskFormStore)
}

export default Task