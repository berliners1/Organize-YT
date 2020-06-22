using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Newtonsoft.Json;
using Organize_YT.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Organize_YT.Data
{
    public class ChannelData
    {
        public async Task<String> Run(string ApiKey, string ChannelId)
        {
            var youtubeService = new YouTubeService(new BaseClientService.Initializer()
            {
                ApplicationName = this.GetType().ToString()
            });

            //var searchListRequest = youtubeService.Search.List("snippet");
            var searchListRequest2 = youtubeService.PlaylistItems.List("snippet");
            //searchListRequest.Q = "Google"; // Replace with your search term.
            searchListRequest2.MaxResults = 10;
            searchListRequest2.Key = ApiKey;
            searchListRequest2.PlaylistId = ChannelId; //ex. UU-lHJZR3Gqxm24_Vd_AJ5Yw

            // Call the search.list method to retrieve results matching the specified query term.
            var searchListResponse = await searchListRequest2.ExecuteAsync();

            List<ChannelDataInfo> ChannelData = new List<ChannelDataInfo>();

            foreach (var item in searchListResponse.Items)
            {
                ChannelData.Add(new ChannelDataInfo
                {
                    ChannelTitle = item.Snippet.ChannelTitle,
                    ChannelId = item.Snippet.ChannelId,
                    VideoTitle = item.Snippet.Title,
                    VideoThumbnail = item.Snippet.Thumbnails.Default__.Url,
                    VideoUrlId = item.Snippet.ResourceId.VideoId
                });
            }

            var jsonData = JsonConvert.SerializeObject(ChannelData);
            return jsonData;
        }


    }
}
