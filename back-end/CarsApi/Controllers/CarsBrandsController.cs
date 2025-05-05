using Microsoft.AspNetCore.Mvc;
using CarsApi.Models;
using CarsApi.Interfaces;

namespace CarsApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CarsBrandsController(IGetAllCarBrandsUseCase useCase) : ControllerBase
    {
        private readonly IGetAllCarBrandsUseCase _useCase = useCase;

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CarBrand>>> Get()
        {
            try
            {
                return Ok(await _useCase.ExecuteAsync());
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Unexpected error", detail = ex.Message });
            }
        }
    }
}
