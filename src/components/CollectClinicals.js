import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function CollectClinicals() {
    const [patientData, setPatientData] = useState({
        firstName: '',
        lastName: '',
        age: ''
    });
    const [componentName, setComponentName] = useState('');
    const [componentValue, setComponentValue] = useState('');
    const params = useParams();

    useEffect(() => {
        axios.get("http://localhost:8080/patientservices/api/patients/" + params.patientId)
            .then(res => {
                setPatientData(res.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [params.patientId]);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            patientId: params.patientId,
            componentName: componentName,
            componentValue: componentValue,
        };

        axios.post("http://localhost:8080/patientservices/api/clinicals", data)
            .then(res => {
                // Handle post-submit logic here
            })
            .catch(error => {
                console.error('Error posting data: ', error);
            });
    };

    return (
        <div>
            <h2>Patient Details:</h2>
            First Name: {patientData.firstName}<br />
            Last Name: {patientData.lastName}<br />
            Age: {patientData.age}
            <h2>Patient Clinical Data:</h2>
            <form onSubmit={handleSubmit}>
                Clinical Entry Type:
                <select onChange={(event) => setComponentName(event.target.value)}>
                    <option>Select One</option>
                    <option value="bp">Blood Pressure(Sys/Dys)</option>
                    <option value="hw">Height/Weight</option>
                    <option value="heartrate">Heart Rate</option>
                </select><br />
                Value:
                <input type="text" name="componentValue" onChange={(event) => setComponentValue(event.target.value)} /><br />
                <button type="submit">Confirm</button>
            </form>
        </div>
    );
}

export default CollectClinicals;
