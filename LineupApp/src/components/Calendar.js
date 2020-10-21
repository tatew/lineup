import React, {Component} from 'react';
import {lineupService} from '../services/LineupService'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';

export class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: "",
            logoUrl: "",
            events: [{
                id: 'a',
                title: 'my event',
                start: '2020-10-24T19:30Z'
            }],
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
            <div style={{margin: '5%'}}>
                <FullCalendar 
                    plugins={[ dayGridPlugin, timeGridPlugin ]}
                    initialView="dayGridMonth"
                    headerToolbar={{
                        start: 'prev,next', 
                        center: 'title',
                        end: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    events={this.state.events}
                />
            </div>
        );
    }
}