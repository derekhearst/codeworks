using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace d1ChoreScore.Repositories;


public class ChoresRepository
{
	public List<Chore> GetAll()
	{
		return new List<Chore>() { new Chore(Guid.NewGuid(), "Test", false) };
	}

	public Chore Create(Chore newChore)
	{
		return newChore;
	}

	public Chore Edit(Chore updatedChore)
	{
		return updatedChore;
	}

	public string Delete(Guid id)
	{
		return "Deleted";
	}
}
