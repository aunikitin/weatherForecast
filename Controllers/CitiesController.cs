using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using WeatherForecast.Models;
using WeatherForecast.Repository;

namespace WeatherForecast.Controllers
{
    [Route("api/[controller]")]
    public class CitiesController : Controller
    {

        [HttpGet("[action]")]
        public IEnumerable<City> GetAllCities()
        {
            return CitiesRepository.GetAllCities();
        }

        [HttpGet("[action]/{id}")]
        public City GetCity([FromRoute]long id)
        {
            return CitiesRepository.GetCity(id);
        }
    }
}