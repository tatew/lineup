import React, {Component} from 'react';
import {lineupService} from '../services/LineupService'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';

export class Calendar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamName: "",
            logoUrl: "",
            events: [],
            loading: true,
            showEventDetails: false,
            eventDetails: {
                event: {
                    extendedProps: {}
                }
            },
        }
    }

    componentDidMount = async () => {
        const events = await lineupService.getEventsForUser();
        this.setState({
            events: events,
            loading: false
        })
    }

    handleEventClick = (eventInfo) => {
        this.setState({
            eventDetails: eventInfo,
            showEventDetails: true
        })
        console.log(eventInfo.event);
    }

    handleHide = () => {
        this.setState({
            showEventDetails: false
        })
    }

    render() {

        return (
            <div style={{margin: '5%'}}>
                {this.state.loading && <ProgressSpinner/>}
                {!this.state.loading && 
                    <FullCalendar 
                        plugins={[ dayGridPlugin, timeGridPlugin ]}
                        initialView="dayGridMonth"
                        headerToolbar={{
                            start: 'prev,next', 
                            center: 'title',
                            end: 'dayGridMonth,timeGridWeek,timeGridDay'
                        }}
                        events={this.state.events}
                        eventClick={e => this.handleEventClick(e)}
                    />
                }
                <Dialog header={this.state.eventDetails.event.extendedProps.fullName} visible={this.state.showEventDetails} onHide={this.handleHide} style={{width: "75vw"}}>
                    <p>{this.state.eventDetails.event.title}</p>
                </Dialog>
            </div>
        );
    }
}