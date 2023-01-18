namespace d3Chores.Models;

public class Chore
{
	public int Id { get; set; }
	public string Name { get; set; }
	public bool completed { get; set; }
	public string user_id { get; set; }
	public Account user { get; set; }
}
