using Microsoft.AspNetCore.Mvc;
using OrganizeYT.Data;
using OrganizeYT.Models;
using System.Threading.Channels;
using Microsoft.Extensions.Configuration;

namespace OrganizeYT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YoutubeController : ControllerBase
    {
        public IConfiguration _configuration { get; }
        private IYoutubeDataRepo _repository;
        public YoutubeController(IYoutubeDataRepo repository, IConfiguration configuration)
        {
            _repository = repository;
            _configuration = configuration;
        }

        //GET api/youtube/byvideoid/K10s2eK5MRc
        [HttpGet("byvideoid/{VideoId}")]
        public ActionResult<SingleYoutubeVideoById> GetVideoById(string VideoId, string ApiKey)
        {
            ApiKey = _configuration["OrganizeYT:YoutubeApiKey"];
            var videoItem = _repository.GetVideoById(VideoId, ApiKey);
            return Ok(videoItem);
        }

        //GET api/youtube/byname/PewDiePie
        [HttpGet("byname/{ChannelName}")]
        public ActionResult<ChannelsFromNameSearch> GetChannelList(string ChannelName, string ApiKey)
        {
            ApiKey = _configuration["OrganizeYT:YoutubeApiKey"];
            var videoItem = _repository.GetChannelsList(ChannelName, ApiKey);
            return Ok(videoItem);
        }

        //GET api/youtube/bychannelid/UC-lHJZR3Gqxm24_Vd_AJ5Yw
        [HttpGet("bychannelid/{ChannelId}")]
        public ActionResult<VideosFromChannel> GetChannelVideos(string ChannelId, string ApiKey)
        {
            ApiKey = _configuration["OrganizeYT:YoutubeApiKey"];
            var videoItem = _repository.GetChannelVideos(ChannelId, ApiKey);
            return Ok(videoItem);
        }
    }
}
