using AutoMapper;
using Server.Dto;
using Server.Models;

namespace Server.Helper; 

public class MappingProfiles : Profile {

    public MappingProfiles() {
        
        CreateMap<Quiz, QuizOutputDto>().ForMember(
            x => x.Topics, 
            o => o.Ignore()
        );
        CreateMap<CreateQuizDto, Quiz>();

        CreateMap<Question, QuestionOutputDto>();
        CreateMap<CreateQuestionDto, Question>();
        CreateMap<CreateQuestionWithOptionDto, Question>().ForMember(
            x => x.Options,
            o => o.Ignore()
        );
        
        CreateMap<Option, OptionOutputDto>();
        CreateMap<Option, OptionNoAnswerOutputDto>();
        CreateMap<CreateOptionDto, Option>();
        
        CreateMap<Topic, TopicOutputDto>();
        CreateMap<CreateTopicDto, Topic>();

        CreateMap<Setting, SettingOutputDto>();

        CreateMap<User, UserMetaDataOutputDto>();
    }
    
}