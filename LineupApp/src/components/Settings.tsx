import React, {Component} from 'react';
import {lineupService} from '../services/LineupService';
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Team} from '../interfaces/interfaces';
import { Route } from 'react-router-dom'
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { AddTeam } from './AddTeam';

interface State {
    usersTeams: Team[],
    loading: boolean,
    showAddTeam: boolean,
}

interface Props {}

export class Settings extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            usersTeams: [],
            loading: false,
            showAddTeam: false
        };
    }

    componentDidMount = async () => {
        this.setState({
            loading: true
        })
        var teams: Team[] = await lineupService.getTeamsForUser();
        this.setState({
            usersTeams: teams,
            loading: false
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

    render() {
        const header = (
            <div className="p-grid p-fluid">
                <div className="p-col">
                    <h4 style={{textAlign: "left"}}>My Teams</h4>
                </div>
                <div className="p-col">
                    <Button style={{width: "auto", float: "right"}} label="Add a Team" icon="pi pi-plus" onClick={e => this.setState({showAddTeam: true})}/>
                </div>
            </div>
        );
        return(
            <div>
                <h3>Settings</h3>
                <Dialog onHide={() => this.setState({showAddTeam: false})} header="Add a Team" visible={this.state.showAddTeam}>
                    <AddTeam onCancel={this.updateTeams} usersTeams={this.state.usersTeams}/>
                </Dialog>
                <DataTable value={this.state.usersTeams} style={{margin: "1em"}} header={header} loading={this.state.loading}>
                    <Column field="name" header="Name"/>
                    <Column field="location" header="Location"/>
                </DataTable>
            </div>
        );
    }
}