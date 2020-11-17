import React, { Component } from 'react';
import { Sport, Team } from '../interfaces/interfaces';
import {lineupService} from '../services/LineupService';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

interface Props {

}

interface State {
    sports: Sport[],
    selectedSport: Sport,
    teamsLoaded: boolean,
    teams: Team[],
    selectedTeam: Team,
    success: boolean,
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
            success: false,
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

    handleAdd = async (e: any) => {
        const result = await lineupService.addTeamForUser(this.state.selectedTeam);
        this.setState({
            success: result,
        })
    }

    render() {
        return (
            <div className="p-d-inline-flex p-flex-column p-jc-center">
                <h3>Add A Team</h3>
                <Dropdown className="p-mb-2 p-text-left"
                    style={{width: "200px"}}
                    optionLabel="name" 
                    value={this.state.selectedSport} 
                    options={this.state.sports} 
                    onChange={this.handleSportChange}
                    placeholder="Choose a Sport"/>
                {this.state.selectedSport &&
                    <Dropdown className="p-mb-2 p-text-left"
                        style={{width: "200px"}}
                        optionLabel="name" 
                        value={this.state.selectedTeam} 
                        options={this.state.teams} 
                        onChange={(e) => this.setState({selectedTeam: e.value})}
                        placeholder="Choose a Team"/>
                }
                {this.state.selectedTeam &&
                    <div>
                        <img src={this.state.selectedTeam.logoUrl} alt={this.state.selectedTeam.name + "logo"} height="100px"/>
                        <h3>{this.state.selectedTeam.location} {this.state.selectedTeam.name}</h3>
                        <Button label="Add" icon="pi pi-check" className="p-button-success" onClick={this.handleAdd}/>
                    </div>
                }
                
            </div>
        );
    }
}