import React, {ChangeEvent, Component} from 'react';
import {lineupService} from '../services/LineupService';
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Team, Sport} from '../interfaces/interfaces';
import { Route } from 'react-router-dom'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { AddTeam } from './AddTeam';
import { InputText } from 'primereact/inputtext';
import { MultiSelect } from 'primereact/multiselect';

interface State {
    usersTeams: Team[],
    loading: boolean,
    showAddTeam: boolean,
    showRemoveTeamFail: boolean,
    globalFilter: string,
    sports: Sport[]
    selectedSport: Sport
}

interface Props {}

export class Settings extends Component<Props, State> {
    dt: DataTable;

    constructor(props: Props) {
        super(props);
        this.state = {
            usersTeams: [],
            loading: false,
            showAddTeam: false,
            showRemoveTeamFail: false,
            globalFilter: "",
            sports: [],
            selectedSport: null
        };
    }

    componentDidMount = async () => {
        this.setState({
            loading: true
        })
        var teams: Team[] = await lineupService.getTeamsForUser();
        const sports = await lineupService.getSports();
        this.setState({
            usersTeams: teams,
            loading: false,
            sports: sports
        });
    }

    updateTeams = async (update: boolean) => {
        if (update) {
            this.setState({
                loading: true,
                showAddTeam: false,
            })
            var teams: Team[] = await lineupService.getTeamsForUser();
            this.setState({
                usersTeams: teams,
                loading: false
            });
        } else {
            this.setState({
                showAddTeam: false
            });
        }
    }

    removeTeamForUser = async (teamId : number) => {
        const result = await lineupService.removeTeamForUser(teamId);
        if (result) {
            let teams = this.state.usersTeams.filter(t => t.id !== teamId);
            this.setState({
                usersTeams: teams
            });
        } else {
            this.setState({
                showRemoveTeamFail: true,
            });
        }
    }

    deleteTemplate = (rowData: any, column: any) => {
        return (
            <div>
                <Button icon="pi pi-times" onClick={() => this.removeTeamForUser(rowData.id)} className="p-button-danger p-button-rounded"/>
            </div>
        );
    }

    logoTemplate = (rowData: any, column: any) => {
        return <img src={rowData.logoUrl} alt={`${rowData.name}'s Logo`} width="100%" style={{maxWidth: "90px"}}/>
    }

    onSportChange = (e: any) => {
        this.dt.filter(e.value, 'sportName', 'in');
        this.setState({selectedSport: e.value})
    }

    render() {
        const header = (
            <div className="p-grid p-fluid">
                <div className="p-col">
                    <Button 
                        style={{width: "auto", float: "left"}} 
                        label="Add a Team" 
                        icon="pi pi-plus" 
                        onClick={e => this.setState({showAddTeam: true})}
                        className="p-button-outlined"/>
                </div>
                <div className="p-col">
                    <h4>My Teams</h4>
                </div>
                <div className="p-col">
                    <InputText 
                        type="search" 
                        onInput={(e: any) => this.setState({globalFilter: e.target.value})} 
                        placeholder="Search"
                        style={{width: "50%", minWidth: "175px", float: "right"}}/>
                </div>
            </div>
        );

        const sportFilter = <MultiSelect style={{width: "100%"}} onChange={this.onSportChange} value={this.state.selectedSport} options={this.state.sports} optionLabel="name" optionValue="name" placeholder="ALL"/>

        return(
            <div>
                <h3>Settings</h3>
                <Dialog onHide={() => this.setState({showAddTeam: false})} header="Add a Team" visible={this.state.showAddTeam}>
                    <AddTeam onCancel={this.updateTeams} usersTeams={this.state.usersTeams}/>
                </Dialog>
                <Dialog onHide={() => this.setState({showRemoveTeamFail: false})} header="Error" visible={this.state.showRemoveTeamFail}>
                    <p>An error occured when trying to remove the team, please try again</p>
                    <Button label="Ok" onClick={() => this.setState({showRemoveTeamFail: false})}/>
                </Dialog>
                <DataTable 
                        value={this.state.usersTeams} 
                        style={{margin: "1em"}} 
                        header={header} 
                        loading={this.state.loading}
                        globalFilter={this.state.globalFilter} emptyMessage="No records found"
                        sortMode="multiple"
                        ref={(el) => this.dt = el}>
                    <Column field="sportName" header="Sport" style={{width: "13%"}} sortable filter filterElement={sportFilter}/>        
                    <Column body={this.logoTemplate} header="Logo" style={{width: "13%"}}/>
                    <Column field="location" header="Location" sortable/>
                    <Column field="name" header="Name" sortable/>
                    <Column body={this.deleteTemplate} header="Remove" style={{textAlign: "left", width: "10%", maxWidth: "100px"}}/>
                </DataTable>
            </div>
        );
    }
}