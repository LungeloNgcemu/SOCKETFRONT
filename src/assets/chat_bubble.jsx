import React from 'react'

const ChatBubble = ({ message }) => {
    return (
        <div style={{fontSize: "10px", borderRadius: "20px", display: 'flex', flexDirection: 'column',  backgroundColor: "grey", margin: "10px", padding: "10px" }}>
            <p>{message}</p>
        </div>
    )
}

export default ChatBubble
