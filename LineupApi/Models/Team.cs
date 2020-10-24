using System.Collections.Generic;

namespace LineupApi.Models
{
    public class Team
    {
        public int Id {get; set;}
        public string Name {get; set;}
        public string City {get; set;}
        public string Abbreviation {get; set;}
        public string Sport {get; set;}
        public ICollection<UserTeams> TeamUsers {get; set;}
    }
}