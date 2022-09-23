using CVManager.Services.Models;
using System.Threading.Tasks;

namespace CVManager.Services.Interfaces
{
    public interface IGeoLocationDecodeService
    {
        Task<CityGeoLocation> DecodeCityLatLong(string cityName);
        Task<CityGeoLocation> DecodeCityName(double latitude, double longitude);
    }
}
