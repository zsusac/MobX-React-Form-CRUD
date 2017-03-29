import React, {Component} from 'react';
import {observer} from 'mobx-react';
import { Link } from 'react-router';

@observer
class ProjectListItem extends Component {
    render() {
        const {project, getPhaseName} = this.props;
        
        return (
            <tr>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td>{getPhaseName(project.phase)}</td>
                <td><Link to={'/project/' + project.id}>Edit</Link></td>
            </tr>
        );
    }
}

ProjectListItem.propTypes = {
    project: React.PropTypes.shape({
        id: React.PropTypes.number.isRequired,
        name: React.PropTypes.string.isRequired,
        description: React.PropTypes.string.isRequired,
        phase: React.PropTypes.number.isRequired
    }).isRequired
};

export default ProjectListItem