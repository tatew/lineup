using System.Collections.Generic;

namespace LineupApi.Models
{
    public class Team
    {
        public int Id {get; set;}
        public string Name {get; set;}
        public string Location {get; set;}
        public string Abbreviation {get; set;}
        public string LogoUrl {get; set;}
        public ICollection<UserTeams> TeamUsers {get; set;}
        public int SportId { get; set; }
        public Sport Sport { get; set; }
        public int? CFBConferenceId { get; set; }
        public CFBConference? CFBConference { get; set; }
        public int? CBBConferenceId { get; set; }
        public CBBConference? CBBConference { get; set; }
    }
}