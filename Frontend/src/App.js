import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Header } from './Components/Header';
import { HomePage } from './Components/HomePage';
import { FarmerCard } from './Components/FarmerCard';
import { FarmProductCard } from './Components/FarmProductCard';
import { FarmerProfile } from './Components/FarmerProfile';
import { FarmProductList } from './Components/FarmProductList';
// import { AddFarmProduct } from './Components/AddFarmProduct';
import { FarmerProvider } from './Components/FarmerContext';
import { FarmInventory } from './Components/FarmInventory';
import './Components/styles.css';
import { ManageMenu } from './Components/Manage';
import { FarmerForm } from './Components/FarmerForm';
import { CropForm } from './Components/CropForm';
import { FarmerCropsList } from './Components/FarmerCropsList';
// import { FarmProductList } from './Components/FarmProductList';

function App() {
  return (
    <FarmerProvider>
      <div className='body'>
        <Header />
        <br /><br /><br /><br /><br />
        <center>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/farmercard" element={<FarmerCard />} />
            <Route path="/farmproductcard" element={<FarmProductCard />} />
            <Route path="/farmproductcard" element={<FarmProductCard />} />
            <Route path = "/farminventory" element={<FarmInventory/>} />
            <Route path="/farmerprofile" element={<FarmerProfile />} />
            <Route path="/farmproductlist" element={<FarmProductList />} />
            <Route path="/manage" element ={<ManageMenu/>}/>
            <Route path="/addfarmer" element ={<FarmerForm/>}/>
            <Route path="/addcrop" element ={<CropForm/>}/>
            <Route path="/farmercroplist" element ={<FarmerCropsList/>}/>
            {/* <Route path="/addfarmproduct" element={<AddFarmProduct />} /> */}
          </Routes>
        </center>
        <br/><br/><br/><br/><br/><br/><br/>
      </div>
    </FarmerProvider>
  );
}

export default App;
