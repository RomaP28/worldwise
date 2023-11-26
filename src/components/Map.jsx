
import styles from './Map.module.css';
import {  useSearchParams, useNavigate } from "react-router-dom/dist/index";
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useCities } from "../contexts/CitiesContext";
import PropTypes from 'prop-types';

function Map() {
	const { cities } = useCities();

	const [mapPosition, setMapPosition] = useState([40, 0]);
	// eslint-disable-next-line
	const [searchParams, setSearchParams] = useSearchParams();
	
	const mapLat = searchParams.get('lat');
	const mapLng = searchParams.get('lng');
	
	useEffect(()=>{
		if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
	}, [mapLat, mapLng]);
	
	return (
		<div className={styles.mapContainer}>
			<MapContainer center={mapPosition} zoom={6} scrollWheelZoom={true} className={styles.map}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map(city => (
					<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
						<Popup>
							<span>{city.emoji}</span> <span>{city.cityName}</span>
						</Popup>
					</Marker>
					)
				)}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	)
}

function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

function DetectClick() {
	
	const navigate = useNavigate();

	useMapEvents({
		click: e => {
			console.log(e);
			navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
		}
	});
}

ChangeCenter.propTypes = {
	position: PropTypes.array
};

export default Map;


