import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import {observable, computed, action} from 'mobx';
import {hashHistory} from 'react-router';
import RestClientService from '../services/RestClientService.jsx';

/**
 * ProjectFormStore plugins property
 */
const plugins = {
    dvr: validatorjs
};

/**
 * ProjectFormStore fields property
 */
const fields = ['id', 'name', 'description', 'phase', 'tasks'];

/**
 * ProjectFormStore rules property
 */
const rules = {
    name: 'required|string|between:5,25',
    description: 'string|required|between:5,255',
    phase: 'integer|required'
};

/**
 * ProjectFormStore values property
 */
const values = {
    id: null,
    name: '',
    description: '',
    phase: null,
    tasks: []
};

/**
 * ProjectFormStore labels property
 */
const labels = {
    name: 'Name',
    description: 'Description',
    phase: 'Phase',
    tasks: 'Tasks'
};

/**
 * ProjectFormStore extends MobxReactForm class and implements methods to handle task form
 * and communication with REST server.
 * ProjectFormStore flat fields are defined as separated properties
 * (https://foxhound87.github.io/mobx-react-form/docs/defining-flat-fields/separated-properties.html)
 *
 * @class ProjectFormStore
 * @extends {MobxReactForm}
 */
class ProjectFormStore extends MobxReactForm {
    
    /**
     * List of projects retrieved from server
     *
     * @memberOf ProjectFormStore
     */
    @observable projects = [];

    /**
     * List of project phases retrieved from server
     *
     * @memberOf ProjectFormStore
     */
    @observable phases = [];

    /**
     * Form has passed client side validation
     * Submit form to server
     *
     * @param {any} form
     *
     * @memberOf ProjectFormStore
     */
    onSuccess(form) {
        console.log('Form Values!', form.values());
        // Check if submitted task is for update or create Edited task has id property
        // New task has empty id property
        /*
        form
            .values()
            .id
            ? this.updateTask(form.values())
            : this.createTask(form.values());
        */
    }

    /**
     * Form has failed on client side validation
     *
     * @param {any} form
     *
     * @memberOf ProjectFormStore
     */
    onError(form) {
        // get all form errors
        console.log('All form errors', form.errors());
        // invalidate the form with a custom error message
        form.invalidate('This is a generic error message!');
    }

    /**
     * Fetch all projects from server
     *
     *
     * @memberOf ProjectFormStore
     */
    @action fetchAll() {
        RestClientService.callGet('/projects').then(response => {

            return response
                .json()
                .then(json => {
                    this.projects = json;
                });
        }).catch(err => {
            console.error('Fetch all projects failed', err);
        });
    }

    /**
     * Fetch project from server by id and update ProjectFormStore values property
     *
     * @param {any} id
     *
     * @memberOf ProjectFormStore
     */
    @action fetchById(id) {
        RestClientService.callGet('/projects/' + id).then(response => {

            return response
                .json()
                .then(json => {
                    // update ProjectFormStore values property
                    this.update(json)
                });
        }).catch(err => {
            console.error('Fetch project by id failed');
        });
    }

    /**
     * Fetch phases from server
     *
     * @memberOf ProjectFormStore
     */
    @action fetchPhases() {
        // To reduce number of REST api calls, fetch phases only when list is empty
        if (this.phases.length == 0) {
            RestClientService.callGet('/phases').then(response => {

                return response
                    .json()
                    .then(json => {
                        this.phases = json;
                    });
            }).catch(err => {
                console.error('Fetch phases failed');
            });
        }
    }

    /**
     * Send DELETE request to server for given project
     * Redirect to Project page if request was successful
     * 
     * @param {any} task 
     * 
     * @memberOf ProjectFormStore
     */
    deleteTask(project) {
        RestClientService.callDelete('/projects/' + project.id).then(response => {

            return response
                .json()
                .then(json => {
                    hashHistory.push('/project');
                });
        }).catch(err => {
            console.error('Delete failed');
        });
    }

    /**
     * Returns phase name for given phase id
     * 
     * @param {any} id 
     * @returns 
     * 
     * @memberOf ProjectFormStore
     */
    getPhaseName(id) {
        switch (id) {
            case '1':
                return 'Project Initiation';
            case '2':
                return 'Project Planning';
            case '3':
                return 'Project Execution';
            case '4':
                return 'Project Performance/Monitoring';
            case '5':
                return 'Project Closure';
            default:
                return 'Undefined';
        }
    }

}

export default new ProjectFormStore({
    fields,
    rules,
    values,
    labels
}, {plugins});
