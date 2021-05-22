import React, { Component } from 'react';
import { CBBConference, CFBConference, CFBDivision, Sport, Team } from '../interfaces/interfaces';
import {lineupService} from '../services/LineupService';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { isTypeQueryNode } from 'typescript';

interface Props {
    onCancel: Function,
    usersTeams: Team[]
}

interface State {
    sports: Sport[],
    selectedSport: Sport,
    showTeams: boolean,
    teams: Team[],
    selectedTeam: Team,
    success: boolean,
    teamDropdownDisplaySetting: string,
    showCFBDivisions: boolean,
    cfbDivisions: CFBDivision[],
    selectedCFBDivision: CFBDivision,
    showCFBConferences: boolean,
    cfbConferences: CFBConference[],
    selectedCFBConference: CFBConference,
    showCBBConfereneces: boolean,
    cbbConferences: CBBConference[],
    selectedCBBConference: CBBConference
}

export class AddTeam extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            sports: [],
            selectedSport: null,
            showTeams: false,
            teams: [],
            selectedTeam: null,
            success: false,
            teamDropdownDisplaySetting: "name",
            showCFBDivisions: false,
            cfbDivisions: [],
            selectedCFBDivision: null,
            showCFBConferences: false,
            cfbConferences: [],
            selectedCFBConference: null,
            showCBBConfereneces: false,
            cbbConferences: [],
            selectedCBBConference: null
        }
    }

    componentDidMount = async () => {
        const sports = await lineupService.getSports();
        this.setState({
            sports: sports
        });
    }

    handleSportChange = async (sport: any) => {
        this.setState({
            selectedSport: sport.value,
            selectedTeam: null,
            selectedCBBConference: null,
            selectedCFBDivision: null,
            selectedCFBConference: null,
            showTeams: false,
            showCFBDivisions: false,
            showCFBConferences: false,
            showCBBConfereneces: false
        });

        if (sport.value.name === "CFB") {
            const cfbDivisions = await lineupService.getCFBDivisions();
            this.setState({
                teamDropdownDisplaySetting: "location",
                cfbDivisions: cfbDivisions,
                showCFBDivisions: true
            });
        } else if (sport.value.name === "CBB") {
            const cbbConferences = await lineupService.getCBBConferences();
            this.setState({
                teamDropdownDisplaySetting: "location",
                cbbConferences: cbbConferences,
                showCBBConfereneces: true
            });
        } else {
            const teams = await lineupService.getTeamsForSport(sport.value.id);
            const avaliableTeams = teams.filter(e => !this.teamsIncludes(this.props.usersTeams, e));
            this.setState({
                teamDropdownDisplaySetting: "name",
                teams: avaliableTeams,
                showTeams: true
            });
        }
    }

    handleCFBDivisionChange = async (division: any) => {
        this.setState({
            selectedCFBDivision: division.value,
            showTeams: false,
            selectedTeam: null
        })

        const cfbConferences = await lineupService.getCFBConferencesForDivision(division.value.id);
        this.setState({
            cfbConferences: cfbConferences,
            showCFBConferences: true,
        })
    }

    handleCFBConferenceChange = async (conference: any) => {
        this.setState({
            selectedCFBConference: conference.value,
            showTeams: true,
            selectedTeam: null
        });

        const teams = await lineupService.getTeamsForCFBConference(conference.value.id);
        const avaliableTeams = teams.filter(e => !this.teamsIncludes(this.props.usersTeams, e));
        this.setState({
            teams: avaliableTeams,
            showTeams: true
        });
    }

    handleCBBConferenceChange = async (conference: any) => {
        this.setState({
            selectedCBBConference: conference.value,
            showTeams: true,
            selectedTeam: null
        });

        const teams = await lineupService.getTeamsForCBBConference(conference.value.id);
        const avaliableTeams = teams.filter(e => !this.teamsIncludes(this.props.usersTeams, e));
        this.setState({
            teams: avaliableTeams,
            showTeams: true
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
            <div className="p-d-inline-flex p-flex-column p-jc-start" style={{height: "40vw"}}>
                <Dropdown className="p-mb-2 p-text-left"
                    style={{width: "200px"}}
                    optionLabel="name" 
                    value={this.state.selectedSport} 
                    options={this.state.sports} 
                    onChange={this.handleSportChange}
                    placeholder="Choose a Sport"/>
                
                {this.state.showCFBDivisions &&
                    <Dropdown className="p-mb-2 p-text-left"
                        style={{width: "200px"}}
                        optionLabel="name" 
                        value={this.state.selectedCFBDivision} 
                        options={this.state.cfbDivisions} 
                        onChange={this.handleCFBDivisionChange}
                        placeholder="Choose a Division"/>
                }
                {this.state.showCFBConferences &&
                    <Dropdown className="p-mb-2 p-text-left"
                        style={{width: "200px"}}
                        optionLabel="name" 
                        value={this.state.selectedCFBConference} 
                        options={this.state.cfbConferences} 
                        onChange={this.handleCFBConferenceChange}
                        placeholder="Choose a Conference"/>
                }
                {this.state.showCBBConfereneces &&
                    <Dropdown className="p-mb-2 p-text-left"
                        style={{width: "200px"}}
                        optionLabel="name" 
                        value={this.state.selectedCBBConference} 
                        options={this.state.cbbConferences} 
                        onChange={this.handleCBBConferenceChange}
                        placeholder="Choose a Conference"/>
                }
                {this.state.showTeams &&
                    <Dropdown className="p-mb-2 p-text-left"
                        style={{width: "200px"}}
                        optionLabel={this.state.teamDropdownDisplaySetting} 
                        value={this.state.selectedTeam} 
                        options={this.state.teams} 
                        onChange={(e) => this.setState({selectedTeam: e.value})}
                        placeholder="Choose a Team"
                        filter/>
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