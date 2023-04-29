import React, {useState, useEffect} from 'react'
import moment from 'moment'
import './JoinSession.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';

export default function JoinSession(props) {
    const [sessions, setSessions] = useState([]);
    const [joined, setJoined] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [intro,setIntro] = useState('')
    const [session, setSession] = useState({})
    const [showParticipants, setShowParticipants] = useState(false);
    const [participants, setParticipants] = useState([])
    const [creator, setCreator] = useState({})
    const [selected, setSelected] = useState('all');
    const [all, setAll] = useState([])
    const [my, setMy] = useState([])

    async function fetchSessions(){
        const response = await fetch('http://localhost:8000/allsessions')
        const data = await response.json()
        setAll(data.sessions)
        console.log(data.sessions)
        setSessions(data.sessions)
        const res = await fetch(`http://localhost:8000/joinedsession?user_id=${sessionStorage.getItem('user_id')}`)
        const data2 = await res.json()
        let arr = []
        for(let i in data2){
            arr.push(data2[i].session_id)
        }
        setJoined(arr)
        let arr2 = []
        for(let i of arr){
            const res = await fetch(`http://localhost:8000/getsession?sess=${i}`)
            const data = await res.json()
            arr2.push(data.sessions[0])
        }
        setMy(arr2)
        const now = await fetch('http://localhost:8000/happeningnow')
        const nowData = await now.json()
        console.log(nowData)

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
        setSession(session)
        const res = await fetch(`http://localhost:8000/getparticipants?session_id=${session.session_id}`)
        const data = await res.json()
        setParticipants(data)
        console.log(participants)
        const res1 = await fetch(`http://localhost:8000/user?user_id=${session.user_id}`)
        const user = await res1.json()
        setCreator(user[0])
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

    const handleButtonClick =(s)=>{
        setSelected(s);
        if(s == "my"){
            setSessions(my)
        }
        else if(s == "all"){
            setSessions(all)
        }

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
                <nav className="nav">
                    <div className='nav-headers'>
                    <Link className={`nav-buttons ${selected === 'all' ? 'selected' : ''}`} to="#" onClick={() => handleButtonClick('all')}>All</Link>
                    <Link className={`nav-buttons ${selected === 'now' ? 'selected' : ''}`} to="#" onClick={() => handleButtonClick('now')}>Happening now</Link>
                    <Link className={`nav-buttons ${selected === 'my' ? 'selected' : ''}`} to="#" onClick={() => handleButtonClick('my')}>My study sessions</Link>            
                    </div>                
                </nav>
                
                <div className="card-container">
                    {sessions.map(session => (
                        <div className="card" key={session.date}>
                            <div class="card-body">
                            <h3>{session.name}</h3>
                            <p>Date: {moment.utc(session.date).format("MMM Do, YYYY")}</p>
                            <p>Start time: {session.start_time}</p>
                            <p>End time: {session.end_time}</p>
                            <p>Mode: {session.mode}</p>
                            <p>Description: {session.description}</p>
                            </div>
                            <div class="card-buttons">
                            <span>
                            <button className='participants' onClick={()=>viewParticipants(session)}>View participants</button>
                            {joined.includes(session.session_id)? <button className='joined'>Joined</button> :
                                <button className='join' onClick={()=>joinSession(session)}>Join</button>
                            }
                            </span>
                            </div>
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
                                <div className='list-elementss'>
                                    <h2>Creator: {creator.firstname} {creator.lastname}</h2>
                                    <p>Description: {session.description}</p>
                                </div>
                                {participants.map(participant =>(
                                    <div className='list-elementss'>
                                        {participant.user_id == creator.user_id ? "" : (
                                        <>
                                        <h2>{participant.firstname} {participant.lastname}</h2>
                                        <p>Introduction: {participant.introductions}</p>
                                        </>)}
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
