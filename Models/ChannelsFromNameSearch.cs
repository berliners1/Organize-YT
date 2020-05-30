using System;
using System.Collections.Generic;
using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace OrganizeYT.Models
{
    public partial class ChannelsFromNameSearch
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
        public ChannelsFromNameSearch_PageInfo PageInfo { get; set; }

        [JsonProperty("items")]
        public ChannelsFromNameSearch_Item[] Items { get; set; }
    }

    public partial class ChannelsFromNameSearch_Item
    {
        [JsonProperty("kind")]
        public string Kind { get; set; }

        [JsonProperty("etag")]
        public string Etag { get; set; }

        [JsonProperty("id")]
        public ChannelsFromNameSearch_Id Id { get; set; }

        [JsonProperty("snippet")]
        public ChannelsFromNameSearch_Snippet Snippet { get; set; }
    }

    public partial class ChannelsFromNameSearch_Id
    {
        [JsonProperty("kind")]
        public string Kind { get; set; }

        [JsonProperty("channelId")]
        public string ChannelId { get; set; }
    }

    public partial class ChannelsFromNameSearch_Snippet
    {
        [JsonProperty("publishedAt")]
        public DateTimeOffset PublishedAt { get; set; }

        [JsonProperty("channelId")]
        public string ChannelId { get; set; }

        [JsonProperty("title")]
        public string Title { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("thumbnails")]
        public ChannelsFromNameSearch_Thumbnails Thumbnails { get; set; }

        [JsonProperty("channelTitle")]
        public string ChannelTitle { get; set; }

        [JsonProperty("liveBroadcastContent")]
        public string LiveBroadcastContent { get; set; }

        [JsonProperty("publishTime")]
        public DateTimeOffset PublishTime { get; set; }
    }

    public partial class ChannelsFromNameSearch_Thumbnails
    {
        [JsonProperty("default")]
        public ChannelsFromNameSearch_Default Default { get; set; }

        [JsonProperty("medium")]
        public ChannelsFromNameSearch_Default Medium { get; set; }

        [JsonProperty("high")]
        public ChannelsFromNameSearch_Default High { get; set; }
    }

    public partial class ChannelsFromNameSearch_Default
    {
        [JsonProperty("url")]
        public Uri Url { get; set; }
    }

    public partial class ChannelsFromNameSearch_PageInfo
    {
        [JsonProperty("totalResults")]
        public long TotalResults { get; set; }

        [JsonProperty("resultsPerPage")]
        public long ResultsPerPage { get; set; }
    }
}
