using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CVManager.Services.Models
{
    public class CityDecodeModel
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public string Type { get; set; }
        public string Name { get; set; }
        public double Confidence { get; set; }
        public string Country { get; set; }
        public string Country_code { get; set; }
        public string Continent { get; set; }
        public string Label { get; set; }
    }

    public class CityDecodeResult
    {
        public List<CityDecodeModel> Data { get; set; }
    }
}
