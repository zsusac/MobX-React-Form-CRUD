import MobxReactForm from 'mobx-react-form';
import validatorjs from 'validatorjs';
import { observable, computed, action } from 'mobx';
import { hashHistory } from 'react-router';

/**
 * TaskFormStore plugins property
 */
const plugins = { dvr: validatorjs };

/**
 * TaskFormStore fields property
 */
const fields = ['id', 'task', 'completed'];

/**
 * TaskFormStore rules property
 */
const rules = {
    task: 'required|string|between:5,25',
    completed: 'boolean|required',
};

/**
 * TaskFormStore values property
 */
const values = {
        id: null,
        task: '',
        completed: false
    };

/**
 * TaskFormStore labels property
 */
const labels = {
  task: 'Task',
  completed: 'Completed'
};


/**
 * TaskFormStore extends MobxReactForm class and implements methods to handle task form 
 * and communication with REST server.
 * TaskFormStore flat fields are defined as separated properties
 * (https://foxhound87.github.io/mobx-react-form/docs/defining-flat-fields/separated-properties.html)
 * 
 * @class TaskFormStore
 * @extends {MobxReactForm}
 */
class TaskFormStore extends MobxReactForm {

    /**
     * List of tasks retrieved from server
     * 
     * @memberOf TaskFormStore
     */
    @observable tasks = [];

    /**
     * Form has passed client side validation
     * Submit form to server
     * 
     * @param {any} form 
     * 
     * @memberOf TaskFormStore
     */
    onSuccess(form) {
        console.log('Form Values!', form.values());
        // Check if submitted task is for update or create
        // Edited task has id property
        // New task has empty id property
        form.values().id ? this.updateTask(form.values()) : this.createTask(form.values());
    }

    /**
     * Form has failed on client side validation
     * 
     * @param {any} form 
     * 
     * @memberOf TaskFormStore
     */
    onError(form) {
        // get all form errors
        console.log('All form errors', form.errors());
        // invalidate the form with a custom error message
        form.invalidate('This is a generic error message!');
    }

    /**
     * Fetch all tasks from server
     * 
     * 
     * @memberOf TaskFormStore
     */
    @action fetchAll() {
        fetch('http://localhost:3000/tasks', {
            method: 'get'
        }).then(response => {
            
            return response.json().then(json => {
                this.tasks = json;
            });
        }).catch(err => {
            console.error('Fetch all tasks failed');
        });
    }

    /**
     * Fetch task from server by id and update TaskFormStore values property 
     * 
     * @param {any} id 
     * 
     * @memberOf TaskFormStore
     */
    @action fetchById(id) {
        fetch('http://localhost:3000/tasks/' + id, {
            method: 'get'
        }).then(response => {
            
            return response.json().then(json => {
                // update TaskFormStore values property 
                this.update(json)
            });
        }).catch(err => {
            console.error('Fetch task by id failed');
        });
    }

    /**
     * Send POST request to server with new task
     * Redirect to Task page if request was successful 
     * 
     * @param {object} task 
     * 
     * @memberOf TaskFormStore
     */
    createTask(task) {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch('http://localhost:3000/tasks',
        {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(task)
        }).then(response => {
            
            return response.json().then(json => {
                hashHistory.push('/');
            });
        }).catch(err => {
            console.error('Create failed');
        });
    }

    /**
     * Send PUT request to server with edited task
     * Redirect to Task page if request was successful 
     * 
     * @param {any} task 
     * 
     * @memberOf TaskFormStore
     */
    updateTask(task) {    
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch('http://localhost:3000/tasks/' + task.id,
        {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(task)
        }).then(response => {
            
            return response.json().then(json => {
                hashHistory.push('/');
            });
        }).catch(err => {
            console.error('Update failed');
        });
    }

    deleteTask(task) {
        fetch('http://localhost:3000/tasks/' + task.id,
        {
            method: 'DELETE'
        }).then(response => {
            
            return response.json().then(json => {
                hashHistory.push('/');
            });
        }).catch(err => {
            console.error('Delete failed');
        });
    }
}

export default new TaskFormStore({ fields, rules, values, labels }, {plugins});