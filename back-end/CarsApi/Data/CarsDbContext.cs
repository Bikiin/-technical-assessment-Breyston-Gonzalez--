using Microsoft.EntityFrameworkCore;
using CarsApi.Models;

namespace CarsApi.Data
{
    public class CarsDbContext(DbContextOptions<CarsDbContext> options) : DbContext(options)
    {
        public DbSet<CarBrand> CarsBrands { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CarBrand>().HasData(
                new CarBrand { id = 1, name = "Toyota" },
                new CarBrand { id = 2, name = "Nissan" },
                new CarBrand { id = 3, name = "Honda" }
            );
        }
    }
}