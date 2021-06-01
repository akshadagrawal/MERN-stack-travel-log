import * as React from 'react';
import { useState, useEffect } from 'react';
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import { getLogs } from './API';
import LogEntryForm from './LogEntryForm';


const App= ()=> {
  const token= "pk.eyJ1IjoiYWtzaGFkNTA1NCIsImEiOiJja3AyZzFlYm0wMHBoMnBzNXRwb2o2bm03In0.qsodPe7lDl8-2UVbp2wJUQ";
  const [logEntries, setLogEntries]= useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation]= useState(null);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 23.155144062365, 
    longitude: 74.91574985223465,
    zoom: 3
  });

  const getEntries= async ()=>{
    const logEntries= await getLogs();
      setLogEntries(logEntries);
  }

  useEffect(()=>{
    getEntries();
  },[]);

  const showAddMarkerPopup=e=>{
    setAddEntryLocation({
      longitude: e.lngLat[0],
      latitude: e.lngLat[1]
    })
  };



  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/akshad5054/ckp2u7k1a6qyx17n1qihtwjf5"
      mapboxApiAccessToken={token}
      onViewportChange={nextViewport => setViewport(nextViewport)}
      onDblClick={showAddMarkerPopup}
    >
      {logEntries.map(logEntry=>
        <React.Fragment key={logEntry._id}>
          <Marker 

                  
                  latitude={logEntry.latitude}
                  longitude={logEntry.longitude} 
                  offsetLeft={-20} 
                  offsetTop={-20}>
                  
              <svg 
                viewBox="0 0 24 24" 
                cursor="pointer"
                width="25" 
                height="25" 
                stroke="#fc6102" 
                strokeWidth="2"
                fill="none" 
                onClick={()=>{setShowPopup({
                  [logEntry._id] : true
                })}}
               >
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
                </svg>    
           </Marker>

          {showPopup[logEntry._id] ?(
              <Popup
              latitude={logEntry.latitude}
              longitude={logEntry.longitude} 
              closeButton={true}
              closeOnClick={false}
              dynamicPosition={true}
              onClose={()=>{setShowPopup({
                [logEntry._id] : false
              })}}
              anchor="top" 
              > 
              <div className= "popup">
                <h3>{logEntry.title}</h3>
                <p>{logEntry.comments}</p>
                <small>Visited on: {new Date(logEntry.visitDate).toLocaleDateString()}</small>
                {logEntry.image &&  <img src= {logEntry.image} alt=""/>}
              </div>
    
            </Popup> 
          ) : null }
        
        </React.Fragment>
      
      
      )}

      {addEntryLocation ? (

        <React.Fragment>


          <Marker 

            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude} 
            offsetLeft={-20} 
            offsetTop={-20}>

            <svg 
            viewBox="0 0 24 24" 
            cursor="pointer"
            width="25" 
            height="25" 
            stroke="#fadf66"    
            strokeWidth="2"
            fill="none" 
            
            >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle>
            </svg>    
          </Marker>


        <Popup
          latitude={addEntryLocation.latitude}
          longitude={addEntryLocation.longitude} 
          closeButton={true}
          closeOnClick={false}
          dynamicPosition={true}
          onClose={()=>{setAddEntryLocation(null)}}
          anchor="top" 
          > 
          <div className= "popup">
            <h3>Add new Log Entry!!</h3>
            <LogEntryForm onClose={()=>{
                setAddEntryLocation(null);
                getEntries();
            }} location={addEntryLocation}/>
          </div>

      </Popup> 

      </React.Fragment>
      ) : null}


  
    </ReactMapGL>




     
  );
}

export default App;