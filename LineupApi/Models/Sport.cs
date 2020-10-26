using System.Collections.Generic;

namespace LineupApi.Models
{
    public class Sport 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Url { get; set; }
        public ICollection<Team> Teams { get; set; }
    }
}