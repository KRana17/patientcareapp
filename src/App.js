import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import FindPatients from './components/FindPatients';
import DisplayPatients from './components/DisplayPatients';
import CollectClinicals from './components/CollectClinicals';
import AddPatient from './components/AddPatient';
import AnalyzeData from './components/AnalyzeData';
import Home from './components/Home';
import ChartGenerator from './components/ChartGenerator';

class App extends Component {
  render() {
    return (
      <div className="App">
       <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/findPatients" element={<FindPatients />} />
    <Route path="/displayPatients/:firstName/:lastName" element={<DisplayPatients />} />
    <Route path="/patientDetails/:patientId" element={<CollectClinicals />} />
    <Route path="/addPatient" element={<AddPatient />} />
    <Route path="/analyze/:patientId" element={<AnalyzeData />} />
    <Route path="/chart/:componentName/:patientId" element={<ChartGenerator />} />
</Routes>
      </div>
    );
  }
}

export default App;
