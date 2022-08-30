using Microsoft.EntityFrameworkCore;
using Server.Models;

namespace Server.Data; 

public class DataContext : DbContext {

    public DbSet<Quiz> Quizzes { get; set; }
    public DbSet<Question> Questions { get; set; }
    public DbSet<Option> Options { get; set; }
    public DbSet<Topic> Topics { get; set; }
    public DbSet<User> Users { get; set; }
    public DbSet<Setting> Settings { get; set; }

    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

}