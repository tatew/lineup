import axios from 'axios';
import { config } from './config';

export const lineupService = {
    getTeamSchedule,
    getTeams,
    getTeamsForUser,
    getEventsFromScheduleData,
    getEventsForUser
}
/*========================================================*/
async function getTeamSchedule(team) {
    try {
        const response = await axios({
            method: 'GET',
            url: config.espnApiUrl + team.sport +'/teams/' + team.abbreviation + '/schedule'
        });
        return response.data.events;
    } catch (error) {
        console.log(error);
        return false;
    }
}
/*========================================================*/
async function getTeams() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    try {
        const response = await axios({
            method: 'GET',
            url: config.apiUrl + 'lineup/teams',
            headers: {
                'mode':'cors',
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + user.token
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}
/*========================================================*/
async function getTeamsForUser() {
    let user = JSON.parse(sessionStorage.getItem("user"));
    try {
        const response = await axios({
            method: 'GET',
            url: config.apiUrl + 'lineup/users/' + user.id + '/teams',
            headers: {
                'mode':'cors',
                'Access-Control-Allow-Origin': "*",
                'Authorization': 'Bearer ' + user.token
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return false;
    }
}
/*========================================================*/
async function getEventsFromScheduleData(team)
{
    const scheduleData = await getTeamSchedule(team);
    const events = scheduleData.map(e => {
        const event = {
            id: e.id,
            title: e.shortName,
            start: e.date
        };
        return event;
    });
    return events;
}
/*========================================================*/
async function getEventsForUser() {
    const teams = await getTeamsForUser();

}