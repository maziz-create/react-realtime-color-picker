import './App.css';
import Palette from './components/Palette'
import { init, subscribe } from './socketApi'
import { useEffect, useState } from 'react'


function App() {

  const [activeColor, setActiveColor] = useState("#282c34");

  //didMount anı dedikleri bu. component yerleştiğinde demek oluyor.
  useEffect(() => {
    init(); //component yerleşmişse servere girebiliriz.
    subscribe((color) => {
      setActiveColor(color);
    }); //aboneliğimizi başlattık.
  }, [])

  return (
    <div className="App" style={{ backgroundColor: activeColor }}>
      <Palette activeColor={activeColor} />
    </div>
  );
}

export default App;
