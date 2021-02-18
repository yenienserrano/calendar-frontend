import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uiOpenModal } from '../../actions/ui'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'

import { CalendarEvent } from './CalendarEvent'
import { CalenderModal } from './CalenderModal'
import { Navbar } from '../ui/Navbar'
import { messages } from '../../helpers/calendar-messages-es'

import 'moment/locale/es'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { eventClearActive, eventSetActive, eventStartLoaded } from '../../actions/events'
import { AddNewFab } from '../ui/AddNewFab'
import { DeletedFab } from '../ui/DeletedFab'


moment.locale('es')
const localizer = momentLocalizer(moment)


export const CalendarScreen = () => {

    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { uid } = useSelector( state => state.auth );

    const [lastView, setLastView] = useState( localStorage.getItem( 'lastView' ) || 'month' )

    useEffect(() => {
        dispatch( eventStartLoaded() )
    }, [ dispatch ])


    const eventStyleGetter = ( event, start, end, isSelected ) => {
        
        const style = {
            backgroundColor: ( event.user._id === uid ) ? '#367cf7': '#465660',
            borderRadius: '0px',
            opacity: '0.8',
            display: 'block',
            color: 'white'
        }

        return {
            style
        }

    }

    const onDoubleClickEvent = (e) => {
        dispatch( uiOpenModal() )
    }

    const onSelectEvent = (e) => {
        dispatch( eventSetActive( e ) )
    }

    const onViewChange = (e) => {
        setLastView( e )
        localStorage.setItem('lastView', e)
    }

    const onSelectSlot = (e) => {
        dispatch( eventClearActive() )
    }

    return (
        <div className="calendar-screen">
            <Navbar />

            <Calendar
                localizer={ localizer }
                events={ events }
                startAccessor="start"
                endAccessor="end"
                messages={ messages }
                eventPropGetter={ eventStyleGetter }
                onDoubleClickEvent={ onDoubleClickEvent }
                onSelectEvent={ onSelectEvent }
                onView={ onViewChange }
                view={ lastView }
                onSelectSlot={ onSelectSlot }
                selectable={ true }
                components={{
                    event: CalendarEvent
                }}
            />
            
            <AddNewFab />

            {
                activeEvent 
                &&
                <DeletedFab />
            }


            <CalenderModal />

        </div>
    )
}
