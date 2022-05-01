import React,{useEffect,useState} from 'react'
import axios from 'axios'
import Coin from './Coin';
import './App.css'

const App = () => {
  const [coins,setCoins] = useState([]);
  const [search,setSearch]=useState("")
  useEffect(()=>{
    axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
    .then(res => {setCoins(res.data)
    }).catch(error => console.log(error))


  },[])

  const handleChange =e =>{
     setSearch(e.target.value)
  }

  const filteredcoin = coins.filter( coin =>
    coin.name.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className='coin-app'>
      <div className='coin-search'>
        <h1 className='coin-text'>Search a cryptocurrency </h1>
        <form>
          <input className='inputtext' type='text' placeholder='seach' onChange={handleChange} />
        </form>
      </div>

      {
        filteredcoin.map(coin => {
          return <Coin 
          key ={coin.id}
          name ={coin.name}
          image={coin.image}
          symbol={coin.symbol}
          price={coin.current_price}
          volume ={coin.market_cap}
          
          />
        })
      }

    </div>

  )
}

export default App




