import React, {Component} from 'react';
import {lineupService} from '../services/LineupService'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import { nodeModuleNameResolver } from 'typescript';

interface Props {}
interface State {
    teamName: string,
    logoUrl: string,
    events: any[],
    loading: boolean,
    showEventDetails: boolean,
    eventDetails: EventDetails,
}
//TODO change this
interface EventDetails {
    event: any
}

export class Calendar extends Component<Props, State> {
    constructor(props: Props) {
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
        const noDupEvents = events.filter((item: any, index) => {
            return events.findIndex((e: any) => e.id === item.id) === index;
        });
        this.setState({
            events: noDupEvents,
            loading: false
        })
    }

    handleEventClick = (eventInfo: any) => {
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
        const selectedEvent = this.state.eventDetails.event;
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
                <Dialog header="Event Details" visible={this.state.showEventDetails} onHide={this.handleHide} style={{width: "75vw"}}>
                    <div className="p-d-flex p-jc-center">
                        <div className="p-m-2"><img src={selectedEvent.extendedProps.awayLogo} alt="away logo" height="100px" width="100px"/></div>
                        <div className="p-m-2 p-as-center"><h1>vs</h1></div>
                        <div className="p-m-2"><img src={selectedEvent.extendedProps.homeLogo} alt="home logo" height="100px" width="100px"/></div>
                    </div>
                    <h4 style={{textAlign: "center"}}>{selectedEvent.extendedProps.fullName}</h4>
                    <h4 style={{textAlign: "center"}}>{new Date(selectedEvent.start).toLocaleString("en-US").replace(/(.*)\D\d+/, '$1')}</h4>
                    <h5 style={{textAlign: "center"}}>{selectedEvent.extendedProps.venue}</h5>
                </Dialog>
            </div>
        );
    }
}