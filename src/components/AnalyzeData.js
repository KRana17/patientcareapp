import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function AnalyzeData() {
    const [data, setData] = useState({
        clinicalData: [],
        firstName: '',
        lastName: '',
        age: ''
    });
    const params = useParams();

    useEffect(() => {
        axios.get('http://localhost:8080/patientservices/api/patients/analyze/' + params.patientId)
            .then(res => {
                setData(res.data);
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }, [params.patientId]);

    return (
        <div>
            <h2>Patient Details:</h2>
            First Name: {data.firstName}<br />
            Last Name: {data.lastName}<br />
            Age: {data.age}

            <h2>Clinical Report:</h2>
            {data.clinicalData.map(eachEntry => <RowCreator key={eachEntry.id} item={eachEntry} patientId={data.id} />)}
        </div>
    );
}

function RowCreator({ item, patientId }) {
    return (
        <div>
            <table border="1">
                <tbody>
                    <tr>
                        <td><b>{item.componentName}</b></td>
                    </tr>
                    <tr>
                        <td>{item.componentName}</td>
                        <td>{item.componentValue}</td>
                        <td>{item.measuredDateTime}</td>
                        <td><Link to={'/chart/' + item.componentName + '/' + patientId}>
                            <img src={require('../Logo.png')} alt="Logo" height='20' width='20' /></Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AnalyzeData;
