import { types } from "../types/types"
import moment from 'moment'


const initialState = {
    events: [{
        id: new Date().getTime(),
        title: 'Cumpleaños del jefe',
        start: moment().toDate(),
        end: moment().add( 2, 'hours' ).toDate(),
        bgColor: '#fafafa',
        color: 'white',
        user:{
            _id: '123',
            name: 'ian'
        }
    }],
    activeEvent: null
}

export default (state = initialState, action ) => {
    switch ( action.type ) {

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload
            }

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null
            }

        case types.eventAddNew:
            return {
                ...state,
                events: [
                    ...state.events,
                    action.payload
                ]
            }

        case types.eventUpdated:
            return {
                ...state,
                events: state.events.map(
                    e => ( e.id === action.payload.id ) ? action.payload : e 
                )
            }

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter(
                    e => ( e.id !== state.activeEvent.id ) 
                ),
                activeEvent: null
            }

    default:
        return state
    }
}
