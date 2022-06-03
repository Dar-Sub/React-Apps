import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios';

function App() {
  const [search, setSearch] = useState('')
  const [allData, setAllData] = useState({
    city:'',
    country:'',
    temperature:'',
    humidity:'',
    minimum_temperature:'',
    maximum_temperature:'',
    weather_icon:'10d'
  })

  useEffect(()=> {
    fetchData()
  },[])


  const fetchData = async (city) => {
    // try catch error handling
    try{
    const APIKEY = 'dc6bfeee85298d55bd9a0346c9f167fc'

    const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=imperial`)
    await setAllData({
      city: result.data.name,
      country: result.data.sys.country,
      temperature:result.data.main.temp,
      humidity:result.data.main.humidity,
      minimum_temperature:result.data.main.temp_min,
      maximum_temperature:result.data.main.temp_max,
      weather_icon:result.data.weather[0].icon
    })
  } catch (e) {
    console.log('API not loaded correctly or loaded for the first time')
  }
  }

  const handleSubmit = (event) => {
    console.log(search)
    event.preventDefault()
    fetchData(search)
  }


  const handleChange = (event) => {
    setSearch(event.target.value)
  }


  return(
    <main>
    <div className="form">
      <form onSubmit={handleSubmit}>
        <input
        value={search}
        type='text'
        name='city'
        placeholder='Location'
        onChange={handleChange}
        />
        <button for='city'>Search</button>
      </form>
      
      <section>
      <div className='header-div'>
        <div>
          <div className='data'>
        <img src={'https://openweathermap.org/img/wn/' + allData.weather_icon +'@2x.png'}/>
        <h1 className='title'>{allData.city}</h1>
        <h2 className='location'>{allData.country}</h2>

        <div className='weather-description'>
        <div>
          <h3>HUMIDITY</h3>
          <p>{allData.humidity}%</p>
        </div>
        <div>
          <h3>TEMPERATURE</h3>
          <p>{allData.temperature}°F</p>
        </div>
        <div>
          <h3>MIN TEMPERATURE</h3>
          <p>{allData.minimum_temperature}°F</p>
        </div>
        <div>
          <h3>MAX TEMPERATURE</h3>
          <p>{allData.maximum_temperature}°F</p>
          </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    </main>
  );
}

export default App;