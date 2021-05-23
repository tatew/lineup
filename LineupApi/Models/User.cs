using System.Collections.Generic;

namespace LineupApi.Models
{
    public class User
    {
        public int Id {get; set;}
        public string Username {get; set;}
        public string Password {get; set;}
        public ICollection<UserTeams> UserTeams {get; set;}
    }
}