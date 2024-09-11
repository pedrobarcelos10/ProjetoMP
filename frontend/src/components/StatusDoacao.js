import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const StatusDoacao = () => {
  const { codigo } = useParams();
  const [status, setStatus] = useState('');
  const [localizacao, setLocalizacao] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  useEffect(() => {
    const fetchStatus = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:8000/doacoes/status/${codigo}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStatus(response.data.status);
        setLocalizacao(response.data.localizacao);
        setLatitude(response.data.latitude);
        setLongitude(response.data.longitude);
        setQrCodeUrl(response.data.qr_code);
      } catch (error) {
        console.error('Erro ao buscar status', error);
      }
    };

    fetchStatus();
  }, [codigo]);

  return (
    <div>
      <h1>Status da Doação</h1>
      <p>Status: {status}</p>
      <p>Localização: {localizacao}</p>


      {qrCodeUrl && (
        <div>
          <h3>QR Code da Doação:</h3>
          <img src={qrCodeUrl} alt="QR Code da doação" />
        </div>
      )}


      {latitude && longitude && (
        <MapContainer center={[latitude, longitude]} zoom={13} style={{ height: '400px', width: '100%' }}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitude, longitude]}>
            <Popup>
              Localização da doação.
            </Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default StatusDoacao;
