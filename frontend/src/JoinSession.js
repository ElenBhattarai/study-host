import React, {useState, useEffect} from 'react'
import moment from 'moment'
import './JoinSession.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function JoinSession() {
    const [sessions, setSessions] = useState([]);
    const [joined, setJoined] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [intro,setIntro] = useState('')
    const [session, setSession] = useState({})
    const [showParticipants, setShowParticipants] = useState(false);
    const [participants, setPartcipants] = useState([])

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

    const joinSession = (session) => {
        setShowPopup(true);
        setSession(session)
    }

    const closePopup = () => {
        setShowPopup(false);
        setSession({})
    }

    const viewParticipants = async(session) => {
        setShowParticipants(true);
        const res = await fetch(`http://localhost:8000/getparticipants?session_id=${session.session_id}`)
        const data = await res.json()
        setPartcipants(data)
    }

    const closeParticipants = () => {
        setShowParticipants(false)
    }

    const handleJoin = async() => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id : sessionStorage.getItem('user_id'), session_id : session.session_id, introductions: intro })
          };
          try {
            const response = await fetch('http://localhost:8000/joinsession', requestOptions);
          } catch(err) {
            console.log(err)
          }
        setIntro('')
        closePopup()
        setJoined([...joined, session.session_id])
        toast.success(`Study session ${session.name} sucessfully joined! `, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    }

    return (
        <div className="App">
            <ToastContainer position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
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
                            <button className='participants' onClick={()=>viewParticipants(session)}>View participants</button>
                            {joined.includes(session.session_id)? <button className='joined'>Joined</button> :
                                <button className='join' onClick={()=>joinSession(session)}>Join</button>
                            }
                            </span>
                        </div>
                    ))}
                </div>

                {showPopup && (
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
                )} 

                {showParticipants && (
                    <div className="popup">
                        <div className="popup-content">
                            <div className="popup-header">
                                <h2>Participants</h2>
                                <button className="close-button" onClick={closeParticipants}>X</button>
                            </div>
                            <div className="popup-body2">
                                {participants.map(participant =>(
                                    <div className='list-elements'>
                                        <h3>{participant.firstname} {participant.lastname}</h3>
                                        <p>introduction: {participant.introductions}</p>

                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
        
    )
}
