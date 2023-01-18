namespace d3Chores.Repositories;

public class ChoresRepository
{
	IDbConnection _db;

	public ChoresRepository(IDbConnection db)
	{
		_db = db;
	}

	public List<Chore> Get(string userId)
	{
		return _db.Query<Chore>("SELECT * FROM chores WHERE user_id = @userId", new { userId }).ToList();
	}

	public Chore GetById(int id)
	{
		return _db.QueryFirstOrDefault<Chore>("SELECT * FROM chores WHERE id = @id", new { id });
	}

	public Chore Create(Chore newChore)
	{
		int id = _db.ExecuteScalar<int>(@"
		INSERT INTO chores (name, completed, user_id)
		VALUES (@name, @completed, @user_id);
		SELECT LAST_INSERT_ID();
		", newChore);
		newChore.Id = id;
		return newChore;
	}

	public Chore Edit(Chore updatedCore)
	{
		_db.Execute(@"
		UPDATE chores
		SET
			name = @name,
			completed = @completed
		WHERE id = @id
		", updatedCore);
		return updatedCore;
	}

	public bool Delete(int id)
	{
		int success = _db.Execute("DELETE FROM chores WHERE id = @id", new { id });
		return success > 0;
	}
}
