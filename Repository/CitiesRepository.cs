using System.Collections.Generic;
using WeatherForecast.Models;

namespace WeatherForecast.Repository
{
    public class CitiesRepository
    {
        private static readonly List<City> Cities = new List<City>
        {
            new City
            {
                ID = 498817,
                CityName = "Saint Petersburg"
            },
            new City
            {
                ID = 524901,
                CityName = "Moscow"
            },
        };

        public static IEnumerable<City> GetAllCities()
        {
            return Cities;
        }

        public static City GetCity(long id)
        {
            return Cities.Find(c => c.ID == id);
        }
    }
}
