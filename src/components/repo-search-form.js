import React, { Component } from 'react';


class RepoSearchForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            owner: "",
            repo: ""
        }

        this.onFormSubmit = this.onFormSubmit.bind(this);
        this.onOwnerInputChange = this.onOwnerInputChange.bind(this);
        this.onRepoInputChange = this.onRepoInputChange.bind(this);
    }

    onFormSubmit(event){
        event.preventDefault();
        this.props.onFormSubmit(this.state.owner, this.state.repo);
    }

    onOwnerInputChange(event){
        this.setState({owner: event.target.value});
    }

    onRepoInputChange(event){
        this.setState({repo: event.target.value});
    }



    render(){
        return(
            <form onSubmit={this.onFormSubmit} className="form-inline">
                <div className="form-group mx-sm-3">
                    <label> Owner name: </label>
                    <input className="form-control" value={this.state.owner} onChange={this.onOwnerInputChange}/>
                </div>
                <div className="form-group mx-sm-3">
                    <label> Repo name: </label>
                    <input className="form-control" value={this.state.repo} onChange={this.onRepoInputChange}/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>              
            </form>
        )
    }
}

export default RepoSearchForm;