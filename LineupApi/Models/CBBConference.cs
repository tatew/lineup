using System.Collections.Generic;

namespace LineupApi.Models
{
    public class CBBConference
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Team> Teams { get; set; }
    }
}