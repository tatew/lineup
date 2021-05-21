import axios from 'axios';
import { config } from './config';
import { Team, Sport, CFBConference } from '../interfaces/interfaces';

export const lineupService = {
    getTeamSchedule,
    getTeams,
    getTeamsForUser,
    getEventsFromScheduleData,
    getEventsForUser,
    getSports,
    getTeamsForSport,
    addTeamForUser,
    removeTeamForUser
}
/*========================================================*/
async function getTeamSchedule(team: Team): Promise<any> {
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
async function getTeams(): Promise<Team[]> {
    const userJson = sessionStorage.getItem("user");
    if (userJson)
    {
        const user: any = JSON.parse(userJson);
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
            return [];
        }
    } else {
        return [];
    }
    
}
/*========================================================*/
async function getTeamsForUser(): Promise<Team[]> {
    const userJson = sessionStorage.getItem("user");
    if (userJson)
    {
        const user: any = JSON.parse(userJson);
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
            return [];
        }
    } else {
        return [];
    }
}
/*========================================================*/
async function getEventsFromScheduleData(team: Team)
{
    const scheduleData = await getTeamSchedule(team);
    const events: any[] = scheduleData.map((e: any) => {
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
    let events: Object[] = [];
    for (const team of teams) {
        const teamEvents = await getEventsFromScheduleData(team);
        events = events.concat(teamEvents);
    }
    return events;
}
/*========================================================*/
async function getSports() : Promise<Sport[]> {
    const userJson = sessionStorage.getItem("user");
    if (userJson)
    {
        const user: any = JSON.parse(userJson);
        try {
            const response = await axios({
                method: 'GET',
                url: config.apiUrl + 'lineup/sports',
                headers: {
                    'mode':'cors',
                    'Access-Control-Allow-Origin': "*",
                    'Authorization': 'Bearer ' + user.token
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    } else {
        return [];
    }
}
/*========================================================*/
async function getTeamsForSport(sportId : number) : Promise<Team[]> {
    const userJson = sessionStorage.getItem("user");
    if (userJson)
    {
        const user: any = JSON.parse(userJson);
        try {
            const response = await axios({
                method: 'GET',
                url: config.apiUrl + 'lineup/sports/' + sportId + '/teams',
                headers: {
                    'mode':'cors',
                    'Access-Control-Allow-Origin': "*",
                    'Authorization': 'Bearer ' + user.token
                }
            });
            return response.data;
        } catch (error) {
            console.log(error);
            return [];
        }
    } else {
        return [];
    }
}
/*========================================================*/
async function getCFBConferences() : Promise<CFBConference[]> {
    
}
/*========================================================*/
async function addTeamForUser(team : Team) : Promise<boolean> {
    const userJson = sessionStorage.getItem("user");
    if (userJson)
    {
        const user: any = JSON.parse(userJson);
        try {
            const response = await axios({
                method: 'POST',
                url: config.apiUrl + 'lineup/users/' + user.id + '/teams',
                headers: {
                    'mode':'cors',
                    'Access-Control-Allow-Origin': "*",
                    'Authorization': 'Bearer ' + user.token
                },
                data: team
            });
            return true;
        } catch (error) {
            console.log(error);
        }
    } else {
        return false;
    }
}

/*========================================================*/
async function removeTeamForUser(id : number) {
    const userJson = sessionStorage.getItem("user");
    if (userJson)
    {
        const user: any = JSON.parse(userJson);
        try {
            const response = await axios({
                method: 'DELETE',
                url: config.apiUrl + 'lineup/users/' + user.id + '/teams/' + id,
                headers: {
                    'mode':'cors',
                    'Access-Control-Allow-Origin': "*",
                    'Authorization': 'Bearer ' + user.token
                }
            });
            return true;
        } catch (error) {
            console.log(error);
            return false;
        }
    } else {
        return false;
    }
}