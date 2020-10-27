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
            url: config.espnApiUrl + team.sportUrl +'/teams/' + team.abbreviation + '/schedule'
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
            start: e.date,
            fullName: e.name,
            homeLogo: e.competitions[0].competitors[0].team.logos[0].href,
            awayLogo: e.competitions[0].competitors[1].team.logos[0].href,
            venue: e.competitions[0].venue.fullName + ', ' + e.competitions[0].venue.address.city + ' ' + e.competitions[0].venue.address.state,
            completed: e.competitions[0].status.type.completed,
            state: e.competitions[0].status.type.state
        };
        return event;
    });
    return events;
}
/*========================================================*/
async function getEventsForUser() {
    const teams = await getTeamsForUser();
    let events = [];
    for (const team of teams) {
        const teamEvents = await getEventsFromScheduleData(team);
        events = events.concat(teamEvents);
    }
    return events;
}