import React, {Component} from 'react';
import {observer} from 'mobx-react';
import { Link } from 'react-router';

@observer
class TaskListItem extends Component {
    render() {
        const task = this.props.task;
        
        return (
            <tr>
                <td>{task.task}</td>
                <td>{task.completed ? 'Yes' : 'No'}</td>
                <td><Link to={'/task/' + task.id}>Edit</Link></td>
            </tr>
        );
    }
}

TaskListItem.propTypes = {
    task: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        task: React.PropTypes.string.isRequired,
        completed: React.PropTypes.bool.isRequired
  }).isRequired
};

export default TaskListItem