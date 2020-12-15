using AutoMapper;
using LineupApi.Models;
using LineupApi.DTOs;

namespace LineupApi.Helpers 
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Team, TeamDTO>();
            CreateMap<TeamDTO, Team>();

            CreateMap<User, UserDTO>();
            CreateMap<UserDTO, User>();

            CreateMap<Sport, SportDTO>();
            CreateMap<SportDTO, Sport>();

            CreateMap<CFBDivision, CFBDivisonDTO>();
            CreateMap<CFBDivisonDTO, CFBDivision>();

            CreateMap<CFBConference, CFBConferenceDTO>();
            CreateMap<CFBConferenceDTO, CFBConference>();
        }
    }
}