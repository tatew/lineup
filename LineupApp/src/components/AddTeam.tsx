import React, { Component } from 'react';
import { Sport, Team } from '../interfaces/interfaces';
import {lineupService} from '../services/LineupService';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

interface Props {
    onCancel: Function,
    usersTeams: Team[]
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
        const avaliableTeams = teams.filter(e => !this.teamsIncludes(this.props.usersTeams, e));
        this.setState({
            teams: avaliableTeams,
            teamsLoaded: true
        });
    }

    teamsIncludes = (teams: Team[], team: Team) => {
        let result = false;
        for (let i = 0; i < teams.length; i++) {
            if (teams[i].id === team.id) {
                result = true;
            }
        }
        return result;
    }

    handleAdd = async (e: any) => {
        const result = await lineupService.addTeamForUser(this.state.selectedTeam);
        this.setState({
            success: result,
        })
        this.props.onCancel(true);
    }

    render() {
        return (
            <div className="p-d-inline-flex p-flex-column p-jc-start" style={{height: "30vw"}}>
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
                        <Button icon="pi pi-times" className="p-button-danger p-button-rounded" style={{margin: "1em"}} onClick={() => this.props.onCancel(false)}/>
                        <Button icon="pi pi-check" className="p-button-success p-button-rounded" style={{margin: "1em"}} onClick={this.handleAdd}/>
                    </div>
                }
                
            </div>
        );
    }
}