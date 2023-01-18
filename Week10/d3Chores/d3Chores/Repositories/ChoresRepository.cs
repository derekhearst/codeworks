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
		return _db.Query<Chore, Account, Chore>("SELECT * FROM chores JOIN accounts sc on user_id = sc.id  WHERE user_id = @userId",
		(Chore chore, Account account) =>
		{
			chore.user = account;
			return chore;
		},
		new { userId }
		).ToList();
	}

	public Chore GetById(int id)
	{
		return _db.Query<Chore, Account, Chore>("SELECT * FROM chores ch JOIN accounts ac on user_id = ac.id  WHERE ch.id = @id",
		(Chore chore, Account account) =>
		{
			chore.user = account;
			return chore;
		},
		new { id }).FirstOrDefault();
	}

	public Chore Create(Chore newChore)
	{
		int id = _db.ExecuteScalar<int>(@"
		INSERT INTO chores (name, completed, user_id)
		VALUES (@name, @completed, @user_id);
		SELECT LAST_INSERT_ID();
		", newChore);
		newChore.Id = id;

		Account user = _db.QueryFirstOrDefault<Account>("SELECT * FROM accounts WHERE id = @id", new { id = newChore.user_id });
		newChore.user = user;
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
		return GetById(updatedCore.Id);
	}

	public bool Delete(int id)
	{
		int success = _db.Execute("DELETE FROM chores WHERE id = @id", new { id });
		return success > 0;
	}
}
