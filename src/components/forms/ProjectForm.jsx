import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import ProjectFormStore from '../../stores/ProjectFormStore.jsx';
import MobxReactFormDevTools from 'mobx-react-form-devtools';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';

@inject('ProjectFormStore')
@observer
class ProjectForm extends Component {

    constructor(props) {
        super(props);
        const {ProjectFormStore} = this.props;
        // Fetch project phases to populate dropdown.
        ProjectFormStore.fetchPhases();
    }


    /**
     * Set project phase value
     * 
     * @param {any} event 
     * @param {any} key 
     * @param {any} value 
     * 
     * @memberOf ProjectForm
     */
    onChange(event, key, value) {
        const {ProjectFormStore} = this.props;
        ProjectFormStore.$('phase').set(value);
    }

    render() {
        const {ProjectFormStore} = this.props;

        MobxReactFormDevTools.register({ProjectFormStore});
        // select form to show into the devtools
        MobxReactFormDevTools.select('ProjectFormStore');
        // open the devtools (closed by default)
        MobxReactFormDevTools.open(true);

        let onDelete = ProjectFormStore
            .deleteTask
            .bind(this, ProjectFormStore.values());

        const style = {
            margin: 12
        };

        return (
            <div>
                {/* Material UI - inject the theme into application context */}
                <MuiThemeProvider>
                    <form onSubmit={ProjectFormStore.onSubmit}>
                        <TextField
                            {...ProjectFormStore.$('name').bind({ type: 'textbox', placeholder: 'Project name' })}
                            errorText={ProjectFormStore
                            .$('name')
                            .error}/><br/>

                        <TextField
                            {...ProjectFormStore.$('description').bind()}
                            hintText="Project description"
                            multiLine={true}
                            rows={4}/><br/>

                        <SelectField
                            floatingLabelText="Project phase"
                            {...ProjectFormStore.$('phase').bind()}
                            onChange={this.onChange.bind(this)}>
                            {ProjectFormStore
                                .phases
                                .map(phase => {
                                    return <MenuItem key={phase.id} value={phase.id} primaryText={phase.name}/>
                                })}
                        </SelectField>
                        <br/>

                        <div>
                            {ProjectFormStore.$('tasks').map(field => {
                                return(
                                    
                                    <div key={field.$('id').value}>
                                        <h4>{field.$('task').value}</h4>

                                        <TextField
                                            {...field.$('task').bind({ type: 'textbox', placeholder: 'Task name' })}/>
                                    </div>
                                )
                            })}
                        </div>

                        <br />
                        <RaisedButton
                            type="submit"
                            primary={true}
                            label="Submit"
                            onClick={ProjectFormStore.onSubmit}
                            style={style}/>
                        <RaisedButton label="Clear" onClick={ProjectFormStore.onClear} style={style}/>
                        <RaisedButton label="Reset" onClick={ProjectFormStore.onReset} style={style}/>
                        <RaisedButton label="Delete" secondary={true} onClick={onDelete} style={style}/>
                        <p>{ProjectFormStore.error}</p>
                        <MobxReactFormDevTools.UI/>
                    </form>
                </MuiThemeProvider>
            </div>
        )
    }
}

ProjectForm.propTypes = {
    ProjectFormStore: React
        .PropTypes
        .objectOf(ProjectFormStore)
}

export default ProjectForm