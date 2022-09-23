using CVManager.Repository;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Nest;
using System;

namespace CVManager.Configurations
{
    public static class ElasticSearchConfiguration
    {
        public static void ConfigureElasticSearch(this IServiceCollection services, IConfiguration configuration)
        {
            var url = configuration["elasticsearch:url"];
            var defaultIndex = configuration["elasticsearch:index"];

            var settings = new ConnectionSettings(new Uri(url))
                .DefaultIndex(defaultIndex)
                .EnableDebugMode();

            ElasticSearchMappings.DefaultMappings(settings);

            var client = new ElasticClient(settings);

            services.AddSingleton<IElasticClient>(client);

            ElasticSearchMappings.CreateApplicationIndex(client, defaultIndex);
        }
    }
}
