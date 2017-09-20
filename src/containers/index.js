import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRepoContributorsData } from '../actions/index';

import RepoSearchForm from '../components/repo-search-form';
import D3Barchart from '../components/d3-barchart';
import D3Areachart from '../components/d3-areachart';






class Index extends Component{

    constructor(props){
        super(props);
        this.state = {}

        this.FormSubmit = this.FormSubmit.bind(this);
        this.renderGraphs = this.renderGraphs.bind(this);
    }

    FormSubmit(owner, repo){
        this.props.fetchRepoContributorsData(owner, repo);
    }

    renderGraphs(data){
        return(
            <div className="col">
                <h3> {data.author.login} </h3>
                <p> total: {data.total} </p>
                <D3Barchart data={data.weeks} />
            </div>
        )
    }

    render(){
        const { repoContributors } = this.props;
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
                <div className="row">
                    {repoContributors.map((data) => {
                        console.log(data)
                        return this.renderGraphs(data);
                    })}
                </div>
            </div>
        )
    }
}


function mapStateToProps(state){
    return{ 
        repoContributors: state.repoContributors,
    };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchRepoContributorsData}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);