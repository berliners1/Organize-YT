using Newtonsoft.Json;
using OrganizeYT.Models;
using System;
using System.Net;
using System.Threading.Channels;
using Microsoft.Extensions.Configuration;

namespace OrganizeYT.Data
{
    public class YoutubeDataRepo : IYoutubeDataRepo
    {
        public SingleYoutubeVideoById GetVideoById(string VideoId, string ApiKey)
        {
            var JsonUrlData = new WebClient().DownloadString("https://www.googleapis.com/youtube/v3/videos?id=" + VideoId + "&key=" + ApiKey + "&part=snippet");
            var ReadableJsonData = JsonConvert.DeserializeObject<SingleYoutubeVideoById>(JsonUrlData);

            return new SingleYoutubeVideoById { 
                Kind = ReadableJsonData.Kind,
                Etag = ReadableJsonData.Etag,
                Items = ReadableJsonData.Items,
                PageInfo = ReadableJsonData.PageInfo
            };
        }

        public ChannelsFromNameSearch GetChannelsList(string ChannelName, string ApiKey)
        {
            var JsonUrlData = new WebClient().DownloadString("https://www.googleapis.com/youtube/v3/search?part=id%2Csnippet&q=" + ChannelName + "&type=channel&key=" + ApiKey);
            var ReadableJsonData = JsonConvert.DeserializeObject<ChannelsFromNameSearch>(JsonUrlData);

            return new ChannelsFromNameSearch
            {
                Kind = ReadableJsonData.Kind,
                Etag = ReadableJsonData.Etag,
                NextPageToken = ReadableJsonData.NextPageToken,
                RegionCode = ReadableJsonData.RegionCode,
                PageInfo = ReadableJsonData.PageInfo,
                Items = ReadableJsonData.Items
            };
        }

        public VideosFromChannel GetChannelVideos(string ChannelId, string ApiKey)
        {
            var JsonUrlData = new WebClient().DownloadString("https://www.googleapis.com/youtube/v3/search?key=" + ApiKey + "&channelId=" + ChannelId + "&part=snippet,id&order=date&maxResults=20");
            var ReadableJsonData = JsonConvert.DeserializeObject<VideosFromChannel>(JsonUrlData);

            return new VideosFromChannel
            {
                Kind = ReadableJsonData.Kind,
                Etag = ReadableJsonData.Etag,
                NextPageToken = ReadableJsonData.NextPageToken,
                RegionCode = ReadableJsonData.RegionCode,
                PageInfo = ReadableJsonData.PageInfo,
                Items = ReadableJsonData.Items
            };
        }
    }
}
