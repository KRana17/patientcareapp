import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function DisplayPatients() {
    const [patientData, setPatientData] = useState([]);
    const params = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8080/patientservices/api/patients?firstName=${params.firstName}&lastName=${params.lastName}`)
            .then(res => {
                setPatientData(res.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [params.firstName, params.lastName]);

    return (
        <div>
            <h2>Patients:</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Age</th>
                    </tr>
                </thead>
                <tbody>
                    {patientData.map(patient => <RowCreator key={patient.id} item={patient} />)}
                </tbody>
            </table>
        </div>
    );
}

function RowCreator({ item }) {
    return (
        <tr>
            <td>{item.firstName}</td>
            <td>{item.lastName}</td>
            <td>{item.age}</td>
            <td><Link to={'/patientDetails/' + item.id}>Add Data</Link></td>
            <td><Link to={'/analyze/' + item.id}>Analyze</Link></td>
        </tr>
    );
}

export default DisplayPatients;
