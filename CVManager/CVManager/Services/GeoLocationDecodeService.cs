using CVManager.Services.Interfaces;
using CVManager.Services.Models;
using Microsoft.Extensions.Configuration;
using RestSharp;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace CVManager.Services
{
    public class GeoLocationDecodeService : IGeoLocationDecodeService
    {
        private readonly IConfiguration _configuration;
        public GeoLocationDecodeService(IConfiguration configuration)
        {
            _configuration = configuration ?? throw new ArgumentNullException(nameof(configuration));
        }
        public async Task<CityGeoLocation> DecodeCityLatLong(string cityName)
        {
            var decodeUrl = _configuration["geolocation:decodeUrl"];
            var apiKey = _configuration["geolocation:key"];
            if (apiKey == null)
            {
                throw new Exception("Geolocation service not available");
            }

            var fullUrl = string.Format(decodeUrl, apiKey, cityName);
            using var client = new RestClient();
            var restRequest = new RestRequest($"{fullUrl}", Method.Get);
            var result = await client.ExecuteAsync<CityDecodeResult>(restRequest).ConfigureAwait(false);
            client.Dispose();

            if (result.StatusCode == HttpStatusCode.OK)
            {
                if (result.Data != null)
            {
                    var data = result.Data.Data.FirstOrDefault();
                    if (data != null)
                    {
                        return new CityGeoLocation
                        {
                            Name = data.Type == "country" ? "Serbia" : cityName,
                            Latitude = data.Latitude,
                            Longitude = data.Longitude
                        };
                    }

                }

                throw new Exception($"City {cityName} not found");
            }
            else if (result.StatusCode == HttpStatusCode.BadRequest)
            {
                throw new Exception($"City {cityName} not found");
            }
            else if (result.StatusCode == HttpStatusCode.NotFound)
            {
                throw new Exception($"City {cityName} not found");
            }
            else
            {
                throw new Exception($"City {cityName} not found");
            }
        }

        public async Task<CityGeoLocation> DecodeCityName(double latitude, double longitude)
        {
            var decodeUrl = _configuration["geolocation:reDecodeUrl"];
            var apiKey = _configuration["geolocation:key"];
            if (apiKey == null)
            {
                throw new Exception("Geolocation service not available");
            }

            var fullUrl = string.Format(decodeUrl, apiKey, latitude, longitude);
            using var client = new RestClient();
            var restRequest = new RestRequest($"{fullUrl}", Method.Get);
            var result = await client.ExecuteAsync<CityDecodeResult>(restRequest).ConfigureAwait(false);
            client.Dispose();

            if (result.StatusCode == HttpStatusCode.OK)
            {
                if (result.Data != null)
            {
                    var data = result.Data.Data.FirstOrDefault();
                    if (data != null)
                    {
                        return new CityGeoLocation
                        {
                            Name = data.Name,
                            Latitude = data.Latitude,
                            Longitude = data.Longitude
                        };
                    }
                }

                throw new Exception("City is not found");
            }
            else if (result.StatusCode == HttpStatusCode.BadRequest)
            {
                throw new Exception("City is not found");
            }
            else if (result.StatusCode == HttpStatusCode.NotFound)
            {
                throw new Exception("City is not found");
            }
            else
            {
                throw new Exception("City is not found");
            }
        }
    }
}
