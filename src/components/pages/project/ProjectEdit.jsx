import React, { Component } from 'react'
import {inject, observer} from 'mobx-react';
import ProjectFormStore from '../../../stores/ProjectFormStore.jsx';
import {Link} from 'react-router';
import ProjectForm from '../../forms/ProjectForm.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

@inject('ProjectFormStore')
@observer
class ProjectEdit extends Component {
    render () {
        return (
            <div>
                {/* Material UI - inject the theme into application context */}
                <MuiThemeProvider>
                    <ProjectForm />
                </MuiThemeProvider>
            </div>
        )
    }
}

ProjectEdit.propTypes = {
    ProjectFormStore: React
        .PropTypes
        .objectOf(ProjectFormStore)
}

export default ProjectEdit