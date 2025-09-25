import React from 'react';
import { Button, Card } from 'antd';
import { useNavigate } from 'react-router-dom';


const CrossRoad = () => {
    const navigate = useNavigate();

    const navigateToSocketIO = () => {
        navigate('/socketio');
    };
    const navigateToSignalR = () => {
        navigate('/signalr');
    };
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100vw',
                height: '100vh',
                gap: '20px'
            }}
        >
            <h1>Sockets</h1>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '20px',
                    width: '100%',
                    height: 'auto'
                }}
            >
                <Card style={{ height: '400px', width: '400px' }} size="middle" title="SocketIO">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Button type="primary" onClick={navigateToSocketIO}>SocketIO</Button>
                    </div>
                </Card>

                <Card style={{ height: '400px', width: '400px' }} size="middle" title="SignalR">
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                        <Button type="primary" onClick={navigateToSignalR}>SignalR</Button>
                    </div>
                </Card>

            </div>
        </div>
    );
}

export default CrossRoad;
