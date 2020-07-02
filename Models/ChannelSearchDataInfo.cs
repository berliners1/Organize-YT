using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Organize_YT.Models
{
    public class ChannelSearchDataInfo
    {
        public string DataTitle { get; set; } //items[0].snippet.title
        public string DataChannelId { get; set; } //items[0].snippet.channelId
        public string DataThumbnail { get; set; } //items[0].snippet.thumbnails.default.url
    }
}
