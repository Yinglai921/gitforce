import React, { Component } from 'react';


import RepoSearchForm from '../components/repo-search-form';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRepoContributorsData } from '../actions/index';


class Index extends Component{

    constructor(props){
        super(props);
        this.state = {}

        this.FormSubmit = this.FormSubmit.bind(this);
    }

    FormSubmit(owner, repo){
        this.props.fetchRepoContributorsData(owner, repo);
    }


    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <h2> Gitforce </h2>
                </div>
                <div className="row">
                    <div className="col">
                        <RepoSearchForm onFormSubmit={this.FormSubmit}/>
                    </div>
                </div>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchRepoContributorsData}, dispatch);
}
export default connect(null, mapDispatchToProps)(Index);