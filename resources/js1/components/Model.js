import React from 'react'
import '../styles/Modal.scss'

const Overlay = ({ children }) => {
    return (
        <div className='model'
            style={{
                height: '100vh',
                width: '100vw',
                display: 'flex',
                position: 'absolute',
                overflow: 'auto'
            }}>
            {children}
        </div>
    )
}
 
const Model = ({ title, children, onCancel }) => {

    return (
        <Overlay> 
            <div className='sub-modal'>
                <div className='modal-title' ><span>{title}</span><span onClick={onCancel} className="close-button topright">&times;</span> </div>
                <div
                    style={{
                        flex: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        overflow: 'hidden'
                    }}
                >
                    <div className='modal-body'>
                        {children}
                    </div>
                </div>
            </div>
        </Overlay>
    )
}
 
export default Model;