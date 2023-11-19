import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useCities } from "../contexts/CitiesContext";
import BackButton from "./BackButton";
// import { useSearchParams } from "react-router-dom/dist/index";
import styles from "./City.module.css";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));

function City() {
    const { id } = useParams();
    const { getCity, currentCity, isLoading } = useCities();

    
    useEffect(function(){
        getCity(id);
    }, [id]);
	
	
	if(isLoading) <Spinner />;
	// const [searchPaarams, setSearchParams] = useSearchParams();
	//
	// const lat = searchPaarams.get('lat');
	// const lng = searchPaarams.get('lng');
	
    const { cityName, notes, emoji, date } =  currentCity || '';
    
  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span> {cityName}
        </h3>
      </div>
      
      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>
      
      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}
      
      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>
      
      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
