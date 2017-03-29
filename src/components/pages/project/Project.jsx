import React, { Component } from 'react';
import {inject, observer, action} from 'mobx-react';
import ProjectFormStore from '../../../stores/ProjectFormStore.jsx';
import {Link} from 'react-router';
import ProjectListItem from '../../ProjectListItem.jsx';

@inject('ProjectFormStore')
@observer
class Project extends Component {
    constructor(props) {
        super(props);
        const {ProjectFormStore} = this.props;
        ProjectFormStore.fetchAll();
    }

    render () {
        return (
            <div>
                <Link to={'/project/new'}>New</Link>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Description</th>
                                <th>Phase</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {ProjectFormStore
                                .projects
                                .map(project => {
                                    return <ProjectListItem project={project} key={project.id} getPhaseName={ProjectFormStore.getPhaseName}/>
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

Project.propTypes = {
    ProjectFormStore: React.PropTypes.objectOf(ProjectFormStore)
}

export default Project