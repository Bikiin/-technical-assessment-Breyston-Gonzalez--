using Xunit;
using Microsoft.EntityFrameworkCore;
using CarsApi.Data;
using CarsApi.Models;

namespace CarsApi.Tests.Data
{
    public class CarsDbContextTests
    {
        private CarsDbContext CreateInMemoryDbContext()
        {
            var options = new DbContextOptionsBuilder<CarsDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var context = new CarsDbContext(options);

            context.Database.EnsureCreated();

            return context;
        }

        [Fact]
        public void CarsBrands_ContainsSeedData()
        {
            var context = CreateInMemoryDbContext();

            var brands = context.CarsBrands.ToList();

            Assert.Equal(3, brands.Count);
            Assert.Contains(brands, b => b.name == "Toyota");
            Assert.Contains(brands, b => b.name == "Nissan");
            Assert.Contains(brands, b => b.name == "Honda");
        }
    }
}
