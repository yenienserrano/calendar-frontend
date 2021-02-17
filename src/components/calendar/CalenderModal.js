import React, { useEffect, useState } from 'react'
import { uiCloseModal } from '../../actions/ui';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';
import Swal from 'sweetalert2';
import { eventAddNew, eventClearActive, eventUpdated } from '../../actions/events';

 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
Modal.setAppElement('#root')

const now = moment().minutes( 0 ).seconds( 0 ).add( 1, 'hours' )
const endEvent = now.clone().add( 1, 'hours' )

const eventInit = {
    title: '',
    notes: '',
    start: now.toDate(),
    end: endEvent.toDate()  
}

export const CalenderModal = () => {

    const { isOpen } = useSelector( state => state.ui );
    const { activeEvent } = useSelector( state => state.calendar );
    const dispatch = useDispatch();

    const [ startDate, setStartDate ] = useState( now.toDate() )
    const [ endDate, setEndDate ] = useState( endEvent.toDate() )
    const [ validTitle, setValidTitle ] = useState( true )
    const [ formValue, setFormValue ] = useState( eventInit )

    const { title, notes, start, end } = formValue

    useEffect(() => {
        if( activeEvent ){
            setFormValue( activeEvent ) 
        } else {
            setFormValue( eventInit )
        }

    }, [ activeEvent, setFormValue ])

    const handleInputChange = ({target}) => {
        setFormValue({
            ...formValue,
            [target.name]: target.value
        })
    }

    const handleStartDateChange = (e) => {
        setStartDate( e )
        setFormValue({
            ...formValue,
            start: e
        })
    }

    const handleEndDateChange = (e) => {
        setEndDate( e )
        setFormValue({
            ...formValue,
            end: e
        })
    }
    

    const closeModal = () => {
        dispatch( eventClearActive() )
        dispatch( uiCloseModal() )
        setFormValue( eventInit )
    }

    const handleSubmit = ( e ) => {
        e.preventDefault()
        
        const momentStart = moment( start )
        const momentEnd = moment( end )

        if( momentEnd.isSameOrBefore( momentStart ) ) {
            return Swal.fire('Error', 'La fecha de inicio tiene que ser antes de la fecha de fin', 'error')
        }

        if( title.length < 2 ){
            return setValidTitle( false )
        }
        setValidTitle( true )

        if( activeEvent ) {
            dispatch( eventUpdated( formValue ) )
        } else {

            dispatch( eventAddNew({
                ...formValue,
                id: new Date().getTime(),
                user: {
                    _id: '1234',
                    name: 'ian'
                }
            }) )

        }    

        closeModal()
    }

    return (
        <Modal
          isOpen={ isOpen }
          onRequestClose={ closeModal }
          style={ customStyles }
          className="modal"
          overlayClassName="modal-fondo"
          closeTimeoutMS={ 200 }
        > 
        <h1> { ( activeEvent ) ? 'Editar evento' : 'Nuevo evento' } </h1>
        <hr />
        <form 
            className="container"
            onSubmit={ handleSubmit }
        >

            <div className="form-group">
                <label>Fecha y hora inicio</label>
            
                <DateTimePicker
                    onChange={ handleStartDateChange }
                    value={ start }
                    className="form-control"
                />

            </div>

            <div className="form-group">
                <label>Fecha y hora fin</label>
                <DateTimePicker
                    onChange={ handleEndDateChange }
                    value={ end }
                    minDate={ start }
                    className="form-control"
                />
            </div>

            <hr />
            <div className="form-group">
                <label>Titulo y notas</label>
                <input 
                    type="text" 
                    className={`form-control ${ !validTitle && 'is-invalid' }`}
                    placeholder="Título del evento"
                    name="title"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div className="form-group">
                <textarea 
                    type="text" 
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name="notes"
                    value={ notes }
                    onChange={ handleInputChange }
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button
                type="submit"
                className="btn btn-outline-primary btn-block"
            >
                <i className="far fa-save"></i>
                <span> Guardar</span>
            </button>

        </form>
        
        </Modal>
    )
}
