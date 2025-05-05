using CarsApi.Models;

namespace CarsApi.Interfaces
{
    public interface IGetAllCarBrandsUseCase
    {
        Task<IEnumerable<CarBrand>> ExecuteAsync();
    }
}
