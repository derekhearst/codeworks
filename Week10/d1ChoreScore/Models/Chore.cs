using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace d1ChoreScore.Models;

public class Chore
{
	public Guid id { get; set; }
	public string name { get; set; }
	public bool isComplete { get; set; }

	public Chore(Guid id, string name, bool isComplete)
	{
		this.id = id;
		this.name = name;
		this.isComplete = isComplete;
	}
}
