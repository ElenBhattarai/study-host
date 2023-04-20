import React, {useState, useEffect} from 'react'
import moment from 'moment'

export default function JoinSession() {
    const [sessions, setSessions] = useState([]);

    async function fetchSessions(){
        const response = await fetch('http://localhost:8000/allsessions')
        const data = await response.json()
        console.log(data.sessions)
        setSessions(data.sessions)
    }

    useEffect (()=> {
        fetchSessions();
    },[])

    return (
        <div>
             {sessions.map(session => (
                <div className="card" key={session.date}>
                    <h3>{session.name}</h3>
                    <p>Date: {moment.utc(session.date).format("MMM Do, YYYY")}</p>
                    <p>Start time: {session.start_time}</p>
                    <p>End time: {session.end_time}</p>
                    <p>Mode: {session.mode}</p>
                    <p></p>
                </div>
            ))}
        </div>
        
    )
}
