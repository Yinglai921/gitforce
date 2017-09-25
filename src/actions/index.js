import axios from 'axios';


export const FETCH_REPO_CONTRIBUTORS_DATA = "fetch_repo_contributors_data";
export const FETCH_COMMITS = "fetch_commits";
export const FETCH_COMMITS_TREE = "fetch_commits_tree";

const ClientID = "4e9b988b869962120abc";
const ClientSecret = "d3bc7a1a2ebd741f66283e6ae9744a58dad65919";

// https://api.github.com/repos/Yinglai921/FundIT/stats/contributors 

const RootURL = "https://api.github.com/repos/";


export function fetchRepoContributorsData(owner, repo){

    let request = axios.get(`${RootURL}${owner}/${repo}/stats/contributors?client_id=${ClientID}&client_secret=${ClientSecret}`);

    return{
        type: FETCH_REPO_CONTRIBUTORS_DATA,
        payload: request
    }
}

export function fetchCommits(owner, repo, branch){

    let request = axios.get(`${RootURL}${owner}/${repo}/commits?sha=${branch}&client_id=${ClientID}&client_secret=${ClientSecret}`);
    

    return{
        type: FETCH_COMMITS,
        payload: request
    }
}

export function fetchCommitsTree(owner, repo, sha){
    let request = axios.get(`${RootURL}${owner}/${repo}/git/trees/${sha}?recursive=1&client_id=${ClientID}&client_secret=${ClientSecret}`);

    return{
        type: FETCH_COMMITS_TREE,
        payload: request
    }

}