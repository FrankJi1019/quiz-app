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
    
    public DbSet<Session> Sessions { get; set; }
    
    public DbSet<Attempt> Attempts { get; set; }

    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder) {
        builder.Entity<Attempt>()
            .HasOne(a => a.Question)
            .WithMany()
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<Attempt>()
            .HasOne(a => a.Option)
            .WithMany()
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<Quiz>()
            .HasOne(q => q.Author)
            .WithMany()
            .OnDelete(DeleteBehavior.NoAction);

        builder.Entity<Quiz>()
            .HasOne(x => x.Author)
            .WithMany()
            .OnDelete(DeleteBehavior.NoAction);
    }

}