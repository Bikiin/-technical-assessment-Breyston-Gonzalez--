using Moq;
using Microsoft.AspNetCore.Mvc;
using CarsApi.Controllers;
using CarsApi.Models;
using CarsApi.Interfaces;
using System.Text.Json;

namespace CarsApi.Tests.Controllers
{
    public class CarsBrandsControllerTests
    {
        [Fact]
        public async Task Get_ReturnsOk_WithListOfBrands()
        {
            var mockUseCase = new Mock<IGetAllCarBrandsUseCase>();

            mockUseCase.Setup(x => x.ExecuteAsync()).ReturnsAsync(new List<CarBrand>
            {
                new CarBrand { id = 1, name = "Toyota" },
                new CarBrand { id = 2, name = "Honda" }
            });

            var controller = new CarsBrandsController(mockUseCase.Object);

            var result = await controller.Get();

            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var brands = Assert.IsAssignableFrom<IEnumerable<CarBrand>>(okResult.Value);
            Assert.Equal(2, brands.Count());
        }

        [Fact]
        public async Task Get_Returns500_OnException()
        {
            var mockUseCase = new Mock<IGetAllCarBrandsUseCase>();
            mockUseCase.Setup(x => x.ExecuteAsync()).ThrowsAsync(new Exception("db error"));

            var controller = new CarsBrandsController(mockUseCase.Object);

            var result = await controller.Get();

            var errorResult = Assert.IsType<ObjectResult>(result.Result);
            Assert.Equal(500, errorResult.StatusCode);

            // Serializar y reparsear como JsonElement
            var json = JsonSerializer.Serialize(errorResult.Value);
            var doc = JsonDocument.Parse(json);
            var root = doc.RootElement;

            Assert.Equal("Unexpected error", root.GetProperty("error").GetString());
            Assert.Equal("db error", root.GetProperty("detail").GetString());
        }


    }
}
