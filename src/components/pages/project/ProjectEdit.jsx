import React, { Component } from 'react'
import {inject, observer} from 'mobx-react';
import ProjectFormStore from '../../../stores/ProjectFormStore.jsx';
import {Link} from 'react-router';
import ProjectForm from '../../forms/ProjectForm.jsx';

@inject('ProjectFormStore')
@observer
class ProjectEdit extends Component {
    
    constructor(props) {
        super(props);
        const {ProjectFormStore} = this.props;
        // Reset the ProjectFormStore to default values.
        ProjectFormStore.reset();
        // Fetch project and populate ProjectForm with project data
        ProjectFormStore.fetchById(this.props.params.id);
    }

    render () {

        return (
            <div>
                <ProjectForm />
                <Link to={'/project'}>Back</Link>
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