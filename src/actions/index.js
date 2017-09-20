import axios from 'axios';


export const FETCH_REPO_CONTRIBUTORS_DATA = "fetch_repo_contributors_data";

const ClientID = "4e9b988b869962120abc";
const ClientSecret = "d3bc7a1a2ebd741f66283e6ae9744a58dad65919";

// https://api.github.com/repos/Yinglai921/FundIT/stats/contributors 

const ContributorsListURL = "https://api.github.com/repos/";


export function fetchRepoContributorsData(owner, repo){

    let request = axios.get(`${ContributorsListURL}${owner}/${repo}/stats/contributors?client_id=${ClientID}&client_secret=${ClientSecret}`);

    return{
        type: FETCH_REPO_CONTRIBUTORS_DATA,
        payload: request
    }
}