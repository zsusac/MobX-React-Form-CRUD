import React, {Component} from 'react';
import {inject, observer, action} from 'mobx-react';
import TaskFormStore from '../stores/TaskFormStore.jsx';
import MobxReactFormDevTools from 'mobx-react-form-devtools';
import { Link } from 'react-router';

@inject('TaskFormStore')
@observer
class TaskEdit extends Component {

    constructor(props) {
        super(props);
        const {TaskFormStore} = this.props;
        // Reset the Form to default values.	
        TaskFormStore.reset();
        TaskFormStore.fetchById(this.props.params.id);
    }

    render () {
        const {TaskFormStore} = this.props;

        MobxReactFormDevTools.register({TaskFormStore});
        // select form to show into the devtools
        MobxReactFormDevTools.select('TaskFormStore');

        // open the devtools (closed by default)
        MobxReactFormDevTools.open(true);

        let onDelete = TaskFormStore.deleteTask.bind(this, TaskFormStore.values());
        
        return (
                <div>
                    <form onSubmit={TaskFormStore.onSubmit}>
                        <label
                            htmlFor={TaskFormStore
                            .$('task')
                            .id}>
                            {TaskFormStore
                                .$('task')
                                .label}
                        </label>
                        <input
                            {...TaskFormStore.$('task').bind({ type: 'textbox' })}
                            value={TaskFormStore
                            .$('task')
                            .value}/>
                        <p>{TaskFormStore
                                .$('task')
                                .error}</p>

                        <label
                            htmlFor={TaskFormStore
                            .$('completed')
                            .id}>
                            {TaskFormStore
                                .$('completed')
                                .label}
                        </label>
                        <input
                            {...TaskFormStore.$('completed').bind({ type: 'checkbox' })}
                            checked={TaskFormStore
                            .$('completed')
                            .value}
                            className="left"/>
                        <p>{TaskFormStore
                                .$('completed')
                                .error}</p>

                        <button type="submit" onClick={TaskFormStore.onSubmit}>Submit</button>
                        <button type="button" onClick={TaskFormStore.onClear}>Clear</button>
                        <button type="button" onClick={TaskFormStore.onReset}>Reset</button>
                        <button type="button" onClick={onDelete}>Delete</button>
                        <p>{TaskFormStore.error}</p>
                    </form>

                    <Link to={'/'}>Back</Link>


                    <MobxReactFormDevTools.UI/>          
                </div>
        )
    }
}

TaskEdit.propTypes = {
    TaskFormStore: React.PropTypes.objectOf(TaskFormStore)
}

export default TaskEdit