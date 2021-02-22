import '../css/ModalTodo.css';
import React, { useState, useRef, Fragment, useEffect } from 'react';
import ReactDom from 'react-dom'
import Cookies from 'universal-cookie';
import axios from 'axios'
import Message from './message'
import ProgresBar from './progres'

const cookies = new Cookies();

function Modal(props) {

    const [input, setInput] = useState(props.edit ? props.edit.todoName : '');
    const inputRef = useRef(null);
    const [colorButton, setColorButton] = useState({ color: 'Green', priority: 'Baja' })
    const [file, setFile] = useState('');
    const [fileName, setFileName] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState(props.edit ? { filePath: props.edit.todoImg } : '');
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    useEffect(() => {
        if (props.edit.todoPriority === 'Baja') {
            setColorButton({ color: 'Green', priority: 'Baja' })
        } else if (props.edit.todoPriority === 'Media') {
            setColorButton({ color: 'Yellow', priority: 'Media' })
        } else {
            setColorButton({ color: 'Red', priority: 'Alta' })
        }
    }, [props.edit.todoPriority])

    const buttonPriority = () => {
        if (colorButton.color === 'Green') {
            setColorButton({ color: 'Yellow', priority: 'Media' })
        } else if (colorButton.color === 'Yellow') {
            setColorButton({ color: 'Red', priority: 'Alta' })
        } else {
            setColorButton({ color: 'Green', priority: 'Baja' })
        }

    }

    const onChange = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await axios.post('http://localhost:8080/imageupload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }, onUploadProgress: ProgressEvent => {
                    setUploadPercentage(parseInt(Math.round(ProgressEvent.loaded * 100) / ProgressEvent.total))
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            });
            const filePath = res.data;
            setUploadedFile({ filePath });
            setMessage('File Uplaoded')

        } catch (error) {
            setMessage('Hubo un error con el servidor')
        }
    }


    const handleChange = (e) => {
        setInput(e.target.value);
    }

    const editTodo = (e) => {
        e.preventDefault();
        props.onSubmit({
            _id: props.edit._id,
            todoName: input,
            userId: cookies.get('userId'),
            todoPriority: colorButton.priority,
            todoImg: uploadedFile.filePath || '',
        })

        setInput('')
    }

    if (!props.edit.modal) return null

    return ReactDom.createPortal(
        <>
            <div className='OVERLAY_STYLE'></div>
            <div className='MODAL_STYLES'>
                <Fragment>
                    <form className='todo-form'>
                        <input
                            type='text'
                            placeholder='Editar una tarea'
                            value={input} name='text'
                            className='todo-input'
                            onChange={handleChange}
                            ref={inputRef}
                        />
                        {/* eslint-disable-next-line no-sequences*/}
                        <button className='todo-button' onClick={props.onClose, editTodo}>Actualizar</button>
                    </form>
                </Fragment>
                <Fragment>
                    {message ? <Message msg={message} /> : null}
                    <form className='modalForm' onSubmit={onSubmit}>
                        <div className='row mb-3'>
                            <div className='col-sm'>
                                <h3>Prioridad</h3>
                            </div>
                            <div className='col-sm'>
                                <button type="button" onClick={() => buttonPriority()} className={`ButtonUI ${colorButton.color}`}>{colorButton.priority}</button>
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-sm'>
                                <h3>Expiración</h3>
                            </div>
                            <div className='col-sm'>
                                <input type="date" className="datepicker-input" />
                            </div>
                        </div>
                        <div className='row mb-3'>
                            <div className='col-sm'>
                                <h3>Imagen</h3>
                            </div>
                            <div className='col-sm'>
                                <div className="custom-file">
                                    <input type="file" className="custom-file-input" id="customFileLang" lang="es" onChange={onChange} />
                                    <label className="custom-file-label" htmlFor="customFileLang">{fileName}</label>
                                </div>
                            </div>
                        </div>
                        <ProgresBar percentage={uploadPercentage} />
                        <div className='row mb-3'>

                            {uploadedFile ? <div className='row mt-5'>
                                <div className='col-md-6 m-auto'>
                                    <h3 className='text-center'>{uploadedFile.fileName}</h3>
                                    <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='Imagen de un todo' />
                                </div>
                            </div> : null}
                        </div>
                        <input type='submit' value='Upload' className='btn btn-primary btn-block mt-5' />
                    </form>
                </Fragment>
            </div>
        </>,
        document.getElementById('portal')
    )
}

export default Modal
