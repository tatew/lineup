import React, {Component} from 'react';
import {lineupService} from '../services/LineupService';
import {Dropdown} from 'primereact/dropdown';

export class Settings extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: [],
            selectedTeam: {}
        };
    }

    componentDidMount = async () => {
        var teams = await lineupService.getTeams();
        this.setState({
            teams: teams
        });
        console.log(teams);
    }

    render() {
        return(
            <div>
                <h1>Settings</h1>
                <Dropdown options={this.state.teams} optionLabel="name" value={this.state.selectedTeam} onChange={(e) => {this.setState({selectedTeam: e.value})}}/>
            </div>
        );
    }
}