import axios from 'axios';

export const lineupService = {
    getTeamSchedule
}

async function getTeamSchedule(teamAbv) {
    try {
        const response = await axios({
            method: 'GET',
            url: 'http://site.api.espn.com/apis/site/v2/sports/football/college-football/teams/' + teamAbv + '/schedule'
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}