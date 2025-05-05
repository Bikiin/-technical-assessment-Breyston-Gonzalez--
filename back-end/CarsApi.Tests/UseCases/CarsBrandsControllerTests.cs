using Xunit;
using CarsApi.Data;
using CarsApi.Models;
using CarsApi.UseCases;
using Microsoft.EntityFrameworkCore;

namespace CarsApi.Tests.UseCases
{
    public class GetAllCarBrandsUseCaseTests
    {
        private CarsDbContext GetInMemoryContext()
        {
            var options = new DbContextOptionsBuilder<CarsDbContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var context = new CarsDbContext(options);

            context.CarsBrands.AddRange(
                new CarBrand { id = 1, name = "BMW" },
                new CarBrand { id = 2, name = "Audi" }
            );
            context.SaveChanges();

            return context;
        }

        [Fact]
        public async Task ExecuteAsync_ReturnsAllBrands()
        {
            var context = GetInMemoryContext();
            var useCase = new GetAllCarBrandsUseCase(context);

            var result = await useCase.ExecuteAsync();

            Assert.NotNull(result);
            Assert.Equal(2, result.Count());
        }
    }
}
