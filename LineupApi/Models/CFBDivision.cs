using System.Collections.Generic;

namespace LineupApi.Models
{
    public class CFBDivision
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<CFBConference> Conferences { get; set; }
    }
}