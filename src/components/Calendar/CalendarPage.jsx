import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import Modal from 'react-modal';

import { useContext, useEffect, useState } from 'react';
import UserContext from '../UserContext';
import { useCollection } from 'react-firebase-hooks/firestore';
import { formatDate } from '../../utils/utils';

const CalendarPage = () => {
    const [events, setEvents] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [eventOpen, setEventOpen] = useState(false);
    const [titleInput, setTitleInput] = useState('');
    const [startInput, setStartInput] = useState('');
    const [endInput, setEndInput] = useState('');
    const [selectedEvent, setSelectedEvent] = useState(null);
    const { accountsRef, setActivePage } = useContext(UserContext);

    const eventsRef = accountsRef.collection('events');
    const[calEvents, loading] = useCollection(eventsRef);

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
                if (eventData.type === 'task') {
                    const marked = eventData.complete ? `${eventData.title} ✓` : eventData.title;
                    const eventWithId = {
                        ...eventData,
                        title: marked,
                        id: event.id,
                        backgroundColor: eventColour,
                        borderColor: eventColour,
                    }
                    return eventWithId;
                }
                else {
                    const eventWithId = {
                        ...eventData,
                        id: event.id,
                        backgroundColor: eventColour,
                        borderColor: eventColour
                    };
                    return eventWithId;
                }
          })
            setEvents(newEvents)
        }
    }, [calEvents, loading])

    useEffect(() => {
        setActivePage('calendar');
    }, [])

    useEffect(() => {
        if (selectedEvent) setEventOpen(true);
        else setEventOpen(false);
    }, [selectedEvent])
      
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
                event.target.classList.remove('add-job--incomplete-field')
                break;
            case 'start':
                setStartInput(event.target.value);
                event.target.classList.remove('add-job--incomplete-field')
                break;
            case 'end':
                setEndInput(event.target.value);
                break;
            default:
                break;
        };
      }

    const submitEvent = (event) => {
        if (titleInput && startInput) {
            const newEvent = {
                title: titleInput,
                start: startInput,
                type: 'calendar',
            };
            if (endInput) newEvent.end = endInput;

            eventsRef.add(newEvent)
            .then(doc => {
                console.log('event created!')
            })
            openModal();

        } else {
            const elements = event.target.parentElement.children;
            const arr = [...elements];
            console.log(arr)
            arr.forEach(item => {
                if (item.id === 'title' && !item.value) {
                    item.classList.add('add-job--incomplete-field');
                    console.log(item.classList)
                };
                if (item.id === 'start' && !item.value) {
                    item.classList.add('add-job--incomplete-field');
                }
            })
        }

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
        <Modal isOpen={modalOpen} className="Modal" overlayClassName="Overlay">
            
                <p>Event Title:</p>
                <input value={titleInput} id='title' className="add-event-modal--input" type="text" placeholder="Title" onChange={handleChange}/>
                <p>Start Date:</p>
                <input value={startInput} id='start' className="add-event-modal--input" type="date" onChange={handleChange} />
                <p>End Date(optional):</p>
                <input value={endInput} id='end' className="add-event-modal--input" type="date" onChange={handleChange}/>
                <button onClick={submitEvent}>Submit</button>
                <button onClick={openModal}>Cancel</button>
            
        </Modal>
        <Modal isOpen={eventOpen} className="Modal" overlayClassName="Overlay">
            {selectedEvent ? <div className={selectedEventClass}>
                <div className="selected-event--header">
                    <span className="selected-event--date">
                        <p className="selected-event--item-title">Start Date:</p>
                        <p>{selectedEvent.start} </p>
                    </span>
                    {selectedEvent.end ?
                     <span className="selected-event--date">
                        <p className="selected-event--item-title">End Date:</p>
                        <p>{selectedEvent.end} </p>
                    </span>
                     : null}   
                </div>
                <div className="selected-event--main">
                    <p className="selected-event--detail">{selectedEvent.title} </p>
                    <div className="selected-event--btns">
                        <button onClick={closeEventModal} >Close</button>
                        {selectedEvent.type === 'calendar' ? 
                        <button onClick={deleteEvent}>Delete</button>
                         : null}
                    </div>
                </div>
            </div> : null}
        </Modal>
            
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
                        <button className="job-page--btns--button" onClick={openModal}>Add Event</button>

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
        
    )
}

export default CalendarPage;