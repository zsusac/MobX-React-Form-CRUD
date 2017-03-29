import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import ProjectFormStore from '../../stores/ProjectFormStore.jsx';
import MobxReactFormDevTools from 'mobx-react-form-devtools';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

@inject('ProjectFormStore')
@observer
class ProjectForm extends Component {

    constructor(props) {
        super(props);
        const {ProjectFormStore} = this.props;
        // Fetch project phases to populate dropdown.
        ProjectFormStore.fetchPhases();
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
                            {...ProjectFormStore.$('name').bind()}
                            value={ProjectFormStore
                            .$('name')
                            .value}
                            hintText="Project name"/><br/>

                        <TextField
                            {...ProjectFormStore.$('description').bind()}
                            value={ProjectFormStore
                            .$('description')
                            .value}
                            hintText="Project description"
                            multiLine={true}
                            rows={4}/><br/>

                        <SelectField
                            floatingLabelText="Project phase"
                            {...ProjectFormStore.$('phase').bind()}
                            value={ProjectFormStore
                            .$('phase')
                            .value}>
                            {ProjectFormStore
                                .phases
                                .map(phase => {
                                    return <MenuItem key={phase.id} value={phase.id} primaryText={phase.name}/>
                                })}
                        </SelectField>
                        <br/>

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