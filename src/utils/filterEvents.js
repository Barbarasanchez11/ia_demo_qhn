import events from '../data/events.js';

const filterEvents = ({ city, ages = [], category }) => {
  return events.filter(event => {
    const ageMatch = ages.some(a => a >= event.edad_min && a <= event.edad_max);
    const cityMatch = event.ciudad.toLowerCase() === city.toLowerCase();
    const categoryMatch = category
      ? event.categoria.toLowerCase() === category.toLowerCase()
      : true;

    return ageMatch && cityMatch && categoryMatch;
  });
};

export default filterEvents;
