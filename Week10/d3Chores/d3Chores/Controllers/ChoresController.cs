namespace d3Chores.Controllers;

[ApiController]
[Route("api/[controller]")]
public class Chores : ControllerBase
{
	ChoresService _cs;
	Auth0Provider _ap;
	AccountService _ac;

	public Chores(ChoresService cs, Auth0Provider ap, AccountService ac)
	{
		_cs = cs;
		_ap = ap;
		_ac = ac;
	}


	[HttpGet]
	[Authorize]
	public async Task<ActionResult<List<Chore>>> Get()
	{
		try
		{
			Account user = await _ap.GetUserInfoAsync<Account>(HttpContext);
			return Ok(_cs.Get(user.Id));
		}
		catch (Exception e)
		{
			return BadRequest(e.Message);
		}
	}

	[HttpGet("{id}")]
	[Authorize]
	public ActionResult<Chore> GetById(int id)
	{
		try
		{
			Chore found = _cs.GetById(id);
			return Ok(found);
		}
		catch (Exception e)
		{
			return BadRequest(e.Message);
		}
	}

	[HttpPost]
	[Authorize]
	public async Task<ActionResult<Chore>> Create([FromBody] Chore newChore)
	{
		try
		{
			Account user = await _ap.GetUserInfoAsync<Account>(HttpContext);
			_ac.GetOrCreateProfile(user);

			newChore.user_id = user.Id;
			return Ok(_cs.Create(newChore));
		}
		catch (Exception e)
		{
			return BadRequest(e.Message);
		}
	}

	[HttpPut("{id}")]
	[Authorize]
	public async Task<ActionResult<Chore>> Edit([FromBody] Chore updatedChore, int id)
	{
		try
		{
			Account user = await _ap.GetUserInfoAsync<Account>(HttpContext);
			updatedChore.user_id = user.Id;
			updatedChore.Id = id;
			return Ok(_cs.Edit(updatedChore));
		}
		catch (Exception e)
		{
			return BadRequest(e.Message);
		}
	}

	[HttpDelete("{id}")]
	[Authorize]
	public async Task<ActionResult<string>> Delete(int id)
	{
		try
		{
			Account user = await _ap.GetUserInfoAsync<Account>(HttpContext);
			return Ok(_cs.Delete(id));
		}
		catch (Exception e)
		{
			return BadRequest(e.Message);
		}
	}
}
