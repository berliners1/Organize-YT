using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace OrganizeYT.Models
{
    public partial class SingleYoutubeVideoById
    {
        [JsonProperty("kind")]
        public string Kind { get; set; }

        [JsonProperty("etag")]
        public string Etag { get; set; }

        [JsonProperty("items")]
        public List<SingleYoutubeVideoById_Items> Items { get; set; }

        [JsonProperty("pageInfo")]
        public SingleYoutubeVideoById_PageInfo PageInfo { get; set; }

    }

    public partial class SingleYoutubeVideoById_Items
    {
        [JsonProperty("kind")]
        public string Kind { get; set; }

        [JsonProperty("etag")]
        public string Etag { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("snippet")]
        public SingleYoutubeVideoById_Snippet Snippet { get; set; }
    }

    public partial class SingleYoutubeVideoById_Snippet
    {
        [JsonProperty("publishedAt")]
        public string PublishedAt { get; set; }

        [JsonProperty("channelId")]
        public string ChannelId { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("thumbnails")]
        public SingleYoutubeVideoById_Thumbnails Thumbnails { get; set; }

        [JsonProperty("channelTitle")]
        public string ChannelTitle { get; set; }

        [JsonProperty("tags")]
        public string[] Tags { get; set; }

        [JsonProperty("categoryId")]
        public int CategoryId { get; set; }

        [JsonProperty("liveBroadcastContent")]
        public string LiveBroadcastContent { get; set; }

        [JsonProperty("localized")]
        public SingleYoutubeVideoById_Localized Localized { get; set; }
    }

    public partial class SingleYoutubeVideoById_Thumbnails
    {
        [JsonProperty("default")]
        public SingleYoutubeVideoById_ThumbnailsDefault ThumbnailsDefault { get; set; }
        [JsonProperty("medium")]
        public SingleYoutubeVideoById_ThumbnailsMedium ThumbnailsMedium { get; set; }
        [JsonProperty("high")]
        public SingleYoutubeVideoById_ThumbnailsHigh ThumbnailsHigh { get; set; }
        [JsonProperty("standard")]
        public SingleYoutubeVideoById_ThumbnailsStandard ThumbnailsStandard { get; set; }
        [JsonProperty("maxres")]
        public SingleYoutubeVideoById_ThumbnailsMaxRes ThumbnailsMaxres { get; set; }
    }
    public partial class SingleYoutubeVideoById_ThumbnailsDefault
    {
        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }
    }
    public partial class SingleYoutubeVideoById_ThumbnailsMedium
    {
        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }
    }
    public partial class SingleYoutubeVideoById_ThumbnailsHigh
    {
        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }
    }
    public partial class SingleYoutubeVideoById_ThumbnailsStandard
    {
        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }
    }
    public partial class SingleYoutubeVideoById_ThumbnailsMaxRes
    {
        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }
    }

    public partial class SingleYoutubeVideoById_Localized
    {
        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }
    }

    public partial class SingleYoutubeVideoById_PageInfo
    {
        [JsonProperty("totalResults")]
        public int TotalResults { get; set; }

        [JsonProperty("resultsPerPage")]
        public int ResultsPerPage { get; set; }
    }
}
