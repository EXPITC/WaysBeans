import { React, useState, useEffect , useContext} from 'react';
import ReactMapGL, { Marker , Layer} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css'
import { UserContext } from '../../Context/userContext';
import {API, handleError} from '../../config/api'
import {io} from 'socket.io-client'

import close from '../../img/close.png'
import maponloc from '../../img/onloc.svg'
import { Wrapper, Bg, Card } from './Map.styled';

// https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=?&lon=?
let socket;
const Map = ({toggle , far ,setLocEdit ,updateLoc ,startLoc , open ,cart}) => {
    const [viewport, setViewport] = useState({})
    console.log(far)
    const {state, dispatch} = useContext(UserContext)
    const {user} = state
    // const [loc, setLoc] = useState(user.location?.split(' '))
    let hold2 = open
    let end = user?.location?.split(' ')
    end = [end[1],end[0]]
    // if (hold2){
    // } else {
    //   end = [10.81273,-7.81623]
    // }
    let start = user?.location?.split(' ')
    console.log(startLoc)
    console.log(start)
    let hold = startLoc
  if (hold) {
    start = [parseFloat(startLoc[1]), parseFloat(startLoc[0])]
    }
    console.log(start)
    // hold ? start = [start[1], start[0]] : start = [0, 1]
    // let start = [startLoc[1],startLoc[0]]
    useEffect(() => {
        setTimeout(() => {
            setViewport({
                latitude: -7.7931344997599465,
                longitude: 110.37100225029263,
                width: '100%',
                height: '100%',
                zoom:11
            })
        }, 1000)
    }, [])
  const [routeLayer, setRouteLayer] = useState({})
  const [address, setAddress] = useState(null)
  const [form, setForm] = useState({
    location: user.location,
})
  let [loc, setLoc] = useState(false)
  // console.log(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${end[1]}&lon=${end[0]}`)
  useEffect( async() => {
    if (far) {
        try {
          API.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${end[1]}&lon=${end[0]}`)
          .then((res) => { setAddress(res?.data)})
                setForm({
                    ...form,
                    location: loc[0]+' '+loc[1]
                })
        } catch (err) {
            console.log(err)
        }         
    }
  }, [])
  async function getAddress(lat,lon) {
    API.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`)
      .then((res) => { setAddress(res?.data) })
      .catch((err) => { handleError(err) })
  }
  console.log(address)
  const nameAddress = address?.display_name?.split(',')
  
  const [data, setData] = useState(null)
  
  // console.log(`https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`)
  async function getRoute(end) {
    // make a directions request using cycling profile
    // an arbitrary start will always be the same
    // only the end or destination will change
    try {
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`,
        { method: 'GET' }
      );
      const json = await query.json();
      console.log(json)
      const data = await json.routes[0];
      setData(data)
      const route = data.geometry.coordinates;
      const geojson = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: route
        }
      };
      setRouteLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: geojson
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75
        }
      })
    } catch (err) {
      handleError(err)
    }
}
useEffect(() => {
    getRoute(end)
},[])
let [startLayer, setStartLayer] = useState({
  id: 'point',
  type: 'circle',
  source: {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: start
          }
        }
      ]
    }
  },
  paint: {
    'circle-radius': 10,
    'circle-color': '#3887be'
  }
})
const [endLayer, setEndLayer] = useState({
  id: 'end',
  type: 'circle',
  source: {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'Point',
            coordinates: end
          }
        }
      ]
    }
  },
  paint: {
    'circle-radius': 10,
    'circle-color': '#f30'
  }
})
    const [val, setVal] = useState(false)
    // const mapRef = useRef()
    const doit = () => {
        setVal(false)
        setTimeout(() =>{toggle()},100)
  }
  function toMinutes(e) {
    let m = Math.floor(e % 3600 / 60).toString().padStart(2, '0');
    let s = Math.floor(e % 60).toString().padStart(2, '0');
      return  m + ':' + s
  }
  const [otwOrder, setOtwOrder] = useState(null)
  useEffect(async () => {
    socket = io('http://localhost:5000', {
        auth: {
            token: localStorage.getItem("token") 
        },
        query: {
            id: state.user.id
        }
    })
    
    socket.on('connect', () => {
      console.log(socket);
    })
    socket.on('otw' , ()=>{
        socket.emit('onTheWay', state.user.id)
        otw()
    })
    
    otw()
    socket.on("connect_error", (err) => {
        console.error(err.message); 
    });
    return () => {
        socket.disconnect()
    }
  },[otwOrder])

  const otw = () => {
    socket.emit('onTheWay', state.user.id)
    socket.on('otwData', (data) => {
        setOtwOrder(data)
    })
  }
  console.log('/\/\/\\\//\/\/\/\/')
  console.log(otwOrder)
  console.log(state.user.id)
    return (
        <Bg>
            <link
  href="https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.0.0/mapbox-gl-directions.css"
  rel="stylesheet"
/>
        <Wrapper>
          
          {far ? <>
            <ReactMapGL
            {...viewport}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              onViewportChange={(viewport) => {
                setViewport(viewport);
              }}
              mapStyle='mapbox://styles/mapbox/streets-v11'
            >
              <Layer {...startLayer} />
              <Layer {...endLayer}/> 
              <Layer {...routeLayer} />
              <Marker
                        latitude={start[1]}
                        longitude={start[0]}
                        offsetTop={(-viewport.zoom * 5) / 2}
                        offsetLeft={(-viewport.zoom * 4) / 2}
                    >
                        <img src={maponloc}
                            width={viewport.zoom *-1}
                            height={viewport.zoom *4}
                        alt="marker"/>
                    </Marker>
            </ReactMapGL>
          </> :
            <>
          <img className="x" onClick={doit} src={close} />
                <ReactMapGL 
                    onClick={(e) => {
              const [long, lat] = e.lngLat
                        setLocEdit([ lat, long])
                        setLoc([long, lat])
                        // setStart([long, lat])
                        getAddress(lat,long)
                        console.log(e)
                    }}
                {...viewport}
                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    mapStyle="mapbox://styles/expitc/ckw66dojb2fye14lcysxs3mcb"
                    // mapbox://styles/mapbox/streets-v11
                onViewportChange={(viewport) => {
                    setViewport(viewport);
                }}
                >
                    {loc ? 
                    <>
                    <Marker
                        latitude={loc[1]}
                        longitude={loc[0]}
                        offsetTop={(-viewport.zoom * 5) / 2}
                        offsetLeft={(-viewport.zoom * 4) / 2}
                    >
                        <img src={maponloc}
                            width={viewport.zoom * -1}
                            height={viewport.zoom * 4}
                        alt="marker"/>
                    </Marker>
                    </>    
                    : null}
                </ReactMapGL>
            </>
          }
                {loc ?  
                <>
                <Card>
                    <h3>Select delivery location</h3>
                    <div>
                        <div className="adasdasfaw">
                        <img src={maponloc} alt='onloc'/>
                        <div>
                            <h5>{nameAddress?nameAddress[0]:'not found'}</h5>
                            <p>{address?.display_name}</p>
                        </div>
                        </div>
                    </div>
                {cart ?
                  <>
                    {otwOrder ?
                      <button onClick={() => { doit(); updateLoc(); }}>Confirm update location</button> : null}
                  </>
                    : <button onClick={() => { doit(); }}>Confirm location</button>}
                    </Card>
                    </>
                    : null}
                {far?             <Card h>
                    <h3> delivery location</h3>
                    <div>
                        <div className="adasdasfaw">
                        <img src={maponloc} alt='onloc'/>
                        <div>
                            <h5>{nameAddress?nameAddress[0]:'not found'}</h5>
                            <p>{address?.display_name}</p>
                        </div>
                        </div>
                    </div>
                    <h3 h>Delivery Time</h3>
                    <p>{toMinutes(data?.duration)} Minutes</p>
                    <button onClick={toggle}>Confirm Order</button>
                    </Card> : null}
        </Wrapper>
        </Bg>
    )
};

export default Map;