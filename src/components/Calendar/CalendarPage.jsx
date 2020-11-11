import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';

import Greeting from '../greeting';
import NavBtns from '../Nav/NavBtns';
import { useContext, useEffect, useState } from 'react';
import { Link } from '@reach/router';
import UserContext from '../UserContext';
import { useCollection } from 'react-firebase-hooks/firestore';
import { formatDate, formatDeadline } from '../../utils/utils';

const CalendarPage = ({click}) => {
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [titleInput, setTitleInput] = useState('');
    const [startInput, setStartInput] = useState('');
    const [endInput, setEndInput] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { accountsRef } = useContext(UserContext);

    const eventsRef = accountsRef.collection('events');
    const[calEvents, loading, error] = useCollection(eventsRef);

    useEffect(() => {
        if (!loading) {
            const newEvents = calEvents.docs.map(event => {
                const eventData = event.data();
                let eventColour;
                switch(eventData.type) {
                    case 'job':
                        eventColour = 'red';
                        break;
                    case 'task':
                        eventColour = 'blue';
                        break;
                    case 'calendar':
                        eventColour = 'purple';
                        break;
                    default:
                        break;
              }
                const eventWithId = {
                    ...eventData,
                    id: event.id,
                    backgroundColor: eventColour,
                    borderColor: eventColour
                };
                return eventWithId;
          })
            setEvents(newEvents)
        }
    }, [calEvents, loading])
      
    let modalClass = modalOpen ? 'add-event-modal' : 'add-event-modal--closed';
    let selectedEventClass = selectedEvent ? 'selected-event' : 'selected-event--closed';

    const openModal = () => {
        setModalOpen(!modalOpen);
        setTitleInput('');
        setStartInput('');
        setEndInput('');
    }

    const handleChange = (event) => {
        switch(event.target.id) {
            case 'title':
                setTitleInput(event.target.value);
                break;
            case 'start':
                setStartInput(event.target.value);
                break;
            case 'end':
                setEndInput(event.target.value);
                break;
            default:
                break;
        };
      }

    const submitEvent = (event) => {
        eventsRef.add(endInput ? {
            title: titleInput,
            start: startInput,
            end: endInput,
            type: 'calendar'
        } : 
        {
            title: titleInput,
            start: startInput,
            type: 'calendar'
        }).then(doc => {
            console.log('event created!')
        })
        openModal();

      }

    const closeEventModal = () => {
        setSelectedEvent(null);
    }

    const openEventModal = (info) => {
        const matchingEvent = events.find(doc => {return doc.id === info.event.id})
        if (!info.event.end) {
            setSelectedEvent({
                id: info.event.id,
                title: info.event.title,
                start: `${formatDate(info.event.start)} ${info.event.start.getFullYear()}`,
                type: matchingEvent.type,

                
            })
        }
        else {
            setSelectedEvent({
                id: info.event.id,
                title: info.event.title,
                start: `${formatDate(info.event.start)} ${info.event.start.getFullYear()}`,
                end: `${formatDate(info.event.end)} ${info.event.end.getFullYear()}`,
                type: matchingEvent.type,
            })

        } 
        
    }

    const deleteEvent = () => {
        eventsRef.doc(selectedEvent.id).delete().then((res) => {closeEventModal()});

    }

    return (
        <div className="calendar--wrapper">
            <div className={modalClass}>
                <p>Event Title:</p>
                <input value={titleInput} id='title' className="add-event-modal--input" type="text" placeholder="Title" onChange={handleChange}/>
                <p>Start Date:</p>
                <input value={startInput} id='start' className="add-event-modal--input" type="date" onChange={handleChange} />
                <p>End Date(optional):</p>
                <input value={endInput} id='end' className="add-event-modal--input" type="date" onChange={handleChange}/>
                <button onClick={submitEvent}>Submit</button>
                <button onClick={openModal}>Cancel</button>
            </div>
            {selectedEvent ? <div className={selectedEventClass}>
                <div className="selected-event--header">
                    <span className="selected-event--date">
                        <p>Start Date:</p>
                        <p>{selectedEvent.start} </p>
                    </span>
                    {selectedEvent.end ? <span>
                        <p>End Date:</p>
                        <p>{selectedEvent.end} </p>
                    </span> : null}
                    
                </div>
                <div className="selected-event--main">
                    <p>{selectedEvent.title} </p>
                    <div className="selected-event--btns">
                        <button onClick={closeEventModal} >Close</button>
                        {selectedEvent.type === 'calendar' ? <button onClick={deleteEvent}>Delete</button> : null}
                    </div>
                </div>
            </div> : null}
            <div className="page-header">
                <Greeting />
                <NavBtns activePage={'calendar'} click={click} />
            </div>
            <div className="page-body">
            <div className="calendar--list">
                    <FullCalendar 
                        plugins={[ listPlugin ]}
                        events={events}
                        initialView="listWeek"
                        eventClick={(info) => {openEventModal(info)}}
                    />
                </div>
                <div className="calendar">
                    <div className="calendar-btn-box">
                        <button onClick={openModal}>Add Calendar Event</button>

                    </div>
                    <FullCalendar
                        plugins={[ dayGridPlugin ]}
                        events={events}
                        initialView="dayGridMonth"
                        height="auto"
                        eventClick={(info) => {openEventModal(info)}}
                    />
                </div>
            </div>
        </div>
    )
}

export default CalendarPage;