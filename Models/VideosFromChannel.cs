using System;
using System.Collections.Generic;
using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace OrganizeYT.Models
{
    public partial class VideosFromChannel
    {
        [JsonProperty("kind")]
        public string Kind { get; set; }

        [JsonProperty("etag")]
        public string Etag { get; set; }

        [JsonProperty("nextPageToken")]
        public string NextPageToken { get; set; }

        [JsonProperty("regionCode")]
        public string RegionCode { get; set; }

        [JsonProperty("pageInfo")]
        public VideosFromChannel_PageInfo PageInfo { get; set; }

        [JsonProperty("items")]
        public VideosFromChannel_Item[] Items { get; set; }
    }

    public partial class VideosFromChannel_PageInfo
    {
        [JsonProperty("totalResults")]
        public long TotalResults { get; set; }

        [JsonProperty("resultsPerPage")]
        public long ResultsPerPage { get; set; }
    }

    public partial class VideosFromChannel_Item
    {
        [JsonProperty("kind")]
        public string Kind { get; set; }

        [JsonProperty("etag")]
        public string Etag { get; set; }

        [JsonProperty("id")]
        public VideosFromChannel_Id Id { get; set; }

        [JsonProperty("snippet")]
        public VideosFromChannel_Snippet Snippet { get; set; }
    }

    public partial class VideosFromChannel_Id
    {
        [JsonProperty("kind")]
        public string Kind { get; set; }

        [JsonProperty("videoId")]
        public string videoId { get; set; }
    }

    public partial class VideosFromChannel_Snippet
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
        public VideosFromChannel_Thumbnails Thumbnails { get; set; }

        [JsonProperty("channelTitle")]
        public string ChannelTitle { get; set; }

        [JsonProperty("liveBroadcastContent")]
        public string LiveBroadcastContent { get; set; }

        [JsonProperty("publishTime")]
        public string PublishTime { get; set; }
    }

    public partial class VideosFromChannel_Thumbnails
    {
        [JsonProperty("default")]
        public VideosFromChannel_ThumbnailsDefault ThumbnailsDefault { get; set; }
        [JsonProperty("medium")]
        public VideosFromChannel_ThumbnailsMedium ThumbnailsMedium { get; set; }
        [JsonProperty("high")]
        public VideosFromChannel_ThumbnailsHigh ThumbnailsHigh { get; set; }
    }
    public partial class VideosFromChannel_ThumbnailsDefault
    {
        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }
    }
    public partial class VideosFromChannel_ThumbnailsMedium
    {
        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }
    }
    public partial class VideosFromChannel_ThumbnailsHigh
    {
        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("width")]
        public int Width { get; set; }

        [JsonProperty("height")]
        public int Height { get; set; }
    }
}
