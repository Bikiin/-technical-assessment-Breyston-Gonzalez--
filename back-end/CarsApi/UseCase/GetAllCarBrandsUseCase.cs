using CarsApi.Data;
using CarsApi.Interfaces;
using CarsApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CarsApi.UseCases
{
    public class GetAllCarBrandsUseCase(CarsDbContext context) : IGetAllCarBrandsUseCase
    {
        private readonly CarsDbContext _context = context;

        public async Task<IEnumerable<CarBrand>> ExecuteAsync()
        {
            return await _context.CarsBrands.ToListAsync();
        }
    }
}
