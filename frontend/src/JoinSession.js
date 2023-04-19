import React, {useState, useEffect} from 'react'

export default function JoinSession() {
    const [sessions, setSessions] = useState([])

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
                <div key={session.date}>
                    <h3>{session.name}</h3>
                    <p>Start time: {session.start_time}</p>
                    <p>End time: {session.end_time}</p>
                    <p></p>
                </div>
            ))}

        </div>
        
    )
}
