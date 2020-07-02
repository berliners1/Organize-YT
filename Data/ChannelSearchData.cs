using Google.Apis.Services;
using Google.Apis.YouTube.v3;
using Newtonsoft.Json;
using Organize_YT.Models;
using System;
using System.Collections.Generic;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace Organize_YT.Data
{
    public class ChannelSearchData
    {
        public async Task<String> Run(string ApiKey, string ChannelSearch)
        {
            var youtubeService = new YouTubeService(new BaseClientService.Initializer()
            {
                ApplicationName = this.GetType().ToString()
            });

            var searchListRequest = youtubeService.Search.List("snippet");
            searchListRequest.MaxResults = 50;
            searchListRequest.Key = ApiKey;
            searchListRequest.Q = ChannelSearch; //replace it to be called ChannelSearch
            searchListRequest.Type = "channel";

            // Call the search.list method to retrieve results matching the specified query term.
            var searchListResponse = await searchListRequest.ExecuteAsync();

            List<ChannelSearchDataInfo> ChannelData = new List<ChannelSearchDataInfo>();

            foreach (var item in searchListResponse.Items)
            {
                ChannelData.Add(new ChannelSearchDataInfo
                {
                    DataChannelId = item.Snippet.ChannelId,
                    DataThumbnail = item.Snippet.Thumbnails.Default__.Url,
                    DataTitle = item.Snippet.Title
                });
            }

            var jsonData = JsonConvert.SerializeObject(ChannelData);
            return jsonData;
        }

    }
}
