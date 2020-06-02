using Organize_YT.Models;

namespace Organize_YT.Data
{
    public interface IYoutubeDataRepo
    {
        //return a single video's details back to the user based on the video id provided
        public SingleYoutubeVideoById GetVideoById(string VideoId, string ApiKey);

        //Get channel ID from name search
        public ChannelsFromNameSearch GetChannelsList(string ChannelName, string ApiKey);

        //Get all videos from a given chanel, based on channel id provided
        public VideosFromChannel GetChannelVideos(string ChannelId, string ApiKey);
    }
}
