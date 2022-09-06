using Microsoft.EntityFrameworkCore;
using Server.Data;
using Server.Models;

namespace Server.Repositories; 

public class OptionRepository {
    
    private readonly DataContext _context;

    public OptionRepository(DataContext dataContext) {
        this._context = dataContext;
    }
    
    public ICollection<Option> GetAll() {
        return this._context.Options.ToList();
    }

    public Option? GetOneById(int id) {
        return this._context.Options
            .Where(x => x.Id == id)
            .Include(x => x.Question)
            .FirstOrDefault();
    }
    
    public bool IsOptionExist(int id) {
        return this._context.Options.Any(x => x.Id == id);
    }
    
    public Option AddOption(Option option) {
        var existingOptions = this._context.Options.FirstOrDefault(x => x.Equals(option));
        if (existingOptions != null) return option;
        var entityEntry = this._context.Options.Add(option);
        this._context.SaveChanges();
        return entityEntry.Entity;
    }
    
    public Option? DeleteOption(int id) {
        var option = this._context.Options.FirstOrDefault(x => x.Id == id);
        if (option == null) return null;
        var entityEntry = this._context.Options.Remove(option);
        this._context.SaveChanges();
        return entityEntry.Entity;
    }
    
    public Option? UpdateOption(int id, Option option) {
        option.Id = id;
        if (!this.IsOptionExist(id)) {
            return null;
        } else {
            var entityEntry = this._context.Options.Update(option);
            this._context.SaveChanges();
            return entityEntry.Entity;
        }
    }

}