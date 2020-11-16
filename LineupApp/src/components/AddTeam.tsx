import React, { Component } from 'react';
import { Sport, Team } from '../interfaces/interfaces';
import {lineupService} from '../services/LineupService';
import { Dropdown } from 'primereact/dropdown';

interface Props {

}

interface State {
    sports: Sport[],
    selectedSport: Sport,
    teamsLoaded: boolean,
    teams: Team[],
    selectedTeam: Team
}

export class AddTeam extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            sports: [],
            selectedSport: null,
            teamsLoaded: false,
            teams: [],
            selectedTeam: null,
        }
    }

    componentDidMount = async () => {
        const sports = await lineupService.getSports();
        this.setState({
            sports: sports
        });
    }

    handleSportChange = async (e: any) => {
        this.setState({
            selectedSport: e.value,
            selectedTeam: null
        });
        const teams = await lineupService.getTeamsForSport(e.value.id);
        this.setState({
            teams: teams,
            teamsLoaded: true
        })
    }

    render() {
        return (
            <div>
                <h3>Add A Team</h3>
                <Dropdown style={{width: "200px", textAlign: "left"}} 
                    optionLabel="name" 
                    value={this.state.selectedSport} 
                    options={this.state.sports} 
                    onChange={this.handleSportChange}
                    placeholder="Choose a Sport"/>
                {this.state.teamsLoaded && 
                    <Dropdown style={{width: "200px", textAlign: "left"}} 
                        optionLabel="name" 
                        value={this.state.selectedTeam} 
                        options={this.state.teams} 
                        onChange={(e) => this.setState({selectedTeam: e.value})}
                        placeholder="Choose a Team"/>
                }
            </div>
        );
    }
}