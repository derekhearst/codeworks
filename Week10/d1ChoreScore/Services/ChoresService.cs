using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace d1ChoreScore.Services;


public class ChoresService
{
	private readonly ChoresRepository _repo;
	public ChoresService(ChoresRepository repo)
	{
		_repo = repo;
	}

	internal List<Chore> GetAll()
	{
		return _repo.GetAll();
	}

	internal Chore Create(Chore newChore)
	{
		return _repo.Create(newChore);
	}

	internal Chore Edit(Chore updatedChore)
	{
		return _repo.Edit(updatedChore);
	}

	internal string Delete(Guid id)
	{
		return _repo.Delete(id);
	}

}
