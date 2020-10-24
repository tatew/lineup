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
            events: [],
        }
    }

    componentDidMount = async () => {
        const team = {
            abbreviation: "tb",
            sport: "baseball/mlb"
        }
        const events = await lineupService.getEventsFromScheduleData(team);
        console.log(events);
        this.setState({
            events: events
        })
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