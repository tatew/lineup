import React, {Component} from 'react';
import {lineupService} from '../services/LineupService';
import { DataTable } from 'primereact/datatable';
import {Column} from 'primereact/column';
import {Team} from '../interfaces/interfaces';

interface State {
    usersTeams: Team[],
    loading: boolean
}

interface Props {}

export class Settings extends Component<Props, State> {

    constructor(props: Props) {
        super(props);
        this.state = {
            usersTeams: [],
            loading: false
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

    render() {
        const header = (
            <div>
                <p>My Teams</p>
            </div>
        );
        return(
            <div>
                <h3>Settings</h3>
                <DataTable value={this.state.usersTeams} style={{margin: "1em"}} header={header} loading={this.state.loading}>
                    <Column field="name" header="Name"/>
                    <Column field="location" header="Location"/>
                </DataTable>
            </div>
        );
    }
}