import React, {useState, useEffect} from 'react'
import moment from 'moment'
import './JoinSession.css'

export default function JoinSession() {
    const [sessions, setSessions] = useState([]);
    const [joined, setJoined] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [intro,setIntro] = useState('')
    const [session, setSession] = useState('')

    async function fetchSessions(){
        const response = await fetch('http://localhost:8000/allsessions')
        const data = await response.json()
        setSessions(data.sessions)
        const res = await fetch(`http://localhost:8000/joinedsession?user_id=${sessionStorage.getItem('user_id')}`)
        const data2 = await res.json()
        let arr = []
        for(let i in data2){
            arr.push(data2[i].session_id)
        }
        setJoined(arr)
    }

    useEffect (()=> {
        fetchSessions();
    },[])

    const joinSession = (session_id) => {
        setShowPopup(true);
        setSession(session_id)
    }

    const closePopup = () => {
        setShowPopup(false);
        setSession('')
    }

    const handleJoin = async() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id : sessionStorage.getItem('user_id'), session_id : session, introductions: intro })
          };
          try {
            const response = await fetch('http://localhost:8000/joinsession', requestOptions);
          } catch(err) {
            console.log(err)
          }
        setIntro('')
        closePopup()
        setJoined([...joined, session])
    }

    return (
        <div className="App">
            <div className="App-header">
                <h1>Join a study session</h1>
                <div className="card-container">
                    {sessions.map(session => (
                        <div className="card" key={session.date}>
                            <h3>{session.name}</h3>
                            <p>Date: {moment.utc(session.date).format("MMM Do, YYYY")}</p>
                            <p>Start time: {session.start_time}</p>
                            <p>End time: {session.end_time}</p>
                            <p>Mode: {session.mode}</p>
                            <p></p>
                            <span>
                            <button className='participants'>View participants</button>
                            {joined.includes(session.session_id)? <button className='joined'>Joined</button> :
                                <button className='join' onClick={()=>joinSession(session.session_id)}>Join</button>
                            }
                            </span>
                        </div>
                    ))}
                </div>
                {showPopup ?
                    <div className="popup">
                        <div className="popup-content">
                            <div className="popup-header">
                                <h2>Join this session</h2>
                                <button className="close-button" onClick={closePopup}>X</button>
                            </div>
                            <div className="popup-body">
                                <label htmlFor="intro">Introduce yourself to all participants:</label>
                                <input type="text" id="intro" onChange={(event)=>setIntro(event.target.value)}/>
                                <button className="submit-button" onClick = {handleJoin} >Join</button>
                            </div>
                        </div>
                    </div>
                    : null
                } 
            </div>
        </div>
        
    )
}
