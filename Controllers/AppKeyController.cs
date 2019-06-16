using Microsoft.AspNetCore.Mvc;

namespace WeatherForecast.Controllers
{
    [Route("api/[controller]")]
    public class AppKeyController : Controller
    {
        /// <summary>
        /// key для использования api weatherbit.io
        /// </summary>
        private const string _appKey = "045fc7ad99114a299d22a52b28bcf035";

        [HttpGet("[action]")]
        public string GetAppKey()
        {
            return _appKey;
        }
    }
}