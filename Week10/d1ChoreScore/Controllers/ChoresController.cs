using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace d1ChoreScore.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ChoresController : ControllerBase

{
	private readonly ChoresService _service;
	public ChoresController(ChoresService service)
	{
		_service = service;
	}
	[HttpGet]
	public ActionResult<List<Chore>> Get()
	{
		return Ok(_service.GetAll());
	}

	[HttpPost]
	public ActionResult<Chore> Create([FromBody] Chore newChore)
	{
		try
		{
			return Ok(_service.Create(newChore));
		}
		catch (Exception e)
		{
			return BadRequest(e.Message);
		}
	}

	[HttpPut("{id}")]
	public ActionResult<Chore> Edit([FromBody] Chore updatedChore, Guid id)
	{
		try
		{
			updatedChore.id = id;
			return Ok(_service.Edit(updatedChore));
		}
		catch (Exception e)
		{
			return BadRequest(e.Message);
		}
	}

	[HttpDelete("{id}")]
	public ActionResult<string> Delete(Guid id)
	{
		try
		{
			return Ok(_service.Delete(id));
		}
		catch (Exception e)
		{
			return BadRequest(e.Message);
		}
	}
}
