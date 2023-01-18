namespace d3Chores.Services;

public class ChoresService
{
	ChoresRepository _repo;

	public ChoresService(ChoresRepository repo)
	{
		_repo = repo;
	}

	public List<Chore> Get(string userId)
	{
		return _repo.Get(userId);
	}

	public Chore GetById(int id)
	{
		Chore found = _repo.GetById(id);
		if (found == null)
		{
			throw new Exception("Invalid Id");
		}
		return found;
	}

	public Chore Create(Chore newChore)
	{
		return _repo.Create(newChore);

	}
	public Chore Edit(Chore updatedChore)
	{
		return _repo.Edit(updatedChore);
	}

	public string Delete(int id)
	{
		if (_repo.Delete(id))
		{
			return "Successfully Deleted";
		}
		throw new Exception("Invalid Id");
	}
}
