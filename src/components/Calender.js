import React, {Component} from 'react';
import {lineupService} from '../services/LineupService'

export class Calender extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: "",
            logoUrl: ""
        }
    }

    componentDidMount = async () => {
        const scheduleData = await lineupService.getTeamSchedule("vt");
        this.setState({
            teamName: scheduleData.team.displayName,
            logoUrl: scheduleData.team.logo
        });
    }

    render() {
        return (
            <div>
                <p>Calender</p>
                <p>{this.state.teamName}</p>
                <img src={this.state.logoUrl}></img>
            </div>
        );
    }
}