import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchRepoContributorsData, fetchCommits, fetchCommitsTree } from '../actions/index';

import RepoSearchForm from '../components/repo-search-form';
import D3Barchart from '../components/d3-barchart';
import D3Areachart from '../components/d3-areachart';
import D3ForcedTree from '../components/d3-forced-tree';



class Index extends Component{

    constructor(props){
        super(props);
        this.state = {
            owner: "",
            repo: "",
        }

        this.FormSubmit = this.FormSubmit.bind(this);
        this.renderGraphs = this.renderGraphs.bind(this);
        this.fetchCommitsTree = this.fetchCommitsTree.bind(this);
    }

    FormSubmit(owner, repo){
        this.props.fetchRepoContributorsData(owner, repo);
        this.props.fetchCommits(owner, repo, "master"); // default branch == master
        this.setState({owner});
        this.setState({repo});
    }

    fetchCommitsTree(){
        const sha = this.props.commits[0].sha;
        this.props.fetchCommitsTree(this.state.owner, this.state.repo, sha);
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
        const { repoContributors, commitsTree } = this.props;
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

                <div>
                    <button onClick={this.fetchCommitsTree} className="btn btn-primary">Get Tree</button>
                </div>

                <div className="row" id="graph">
                    <D3ForcedTree data={commitsTree} />
                </div>

            </div>
        )
    }
}


function mapStateToProps(state){
    return{ 
        repoContributors: state.repoContributors,
        commits: state.commits,
        commitsTree: state.commitsTree,
    };
}


function mapDispatchToProps(dispatch){
    return bindActionCreators({fetchRepoContributorsData, fetchCommits, fetchCommitsTree}, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);