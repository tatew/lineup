using System.Collections.Generic;

namespace LineupApi.Models
{
    public class CFBConference 
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<Team> Teams { get; set; }
        public int DivisonId { get; set; }
        public CFBDivision Division { get; set; }
    }
}