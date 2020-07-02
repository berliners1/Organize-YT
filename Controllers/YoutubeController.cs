using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Organize_YT.Data;
using Organize_YT.Models;

namespace Organize_YT.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class YoutubeController : ControllerBase
    {
        //Gets the Youtube api key.
        public static IConfiguration _configuration { get; set; }
        public YoutubeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }



        /*-----------------------------------*/
        /*Data and API call for searching channels by Title. 
         * e.g. if you search "PewDiePie" and it finds any channels that match or are similar.*/
        [HttpGet("bychannelsearch/{ChannelSearch}")]
        public ActionResult<ChannelSearchDataInfo> SendChannelSearchData(string ApiKey, string ChannelSearch)
        {
            return Ok(GetChannelSearchData(ApiKey, ChannelSearch).Result);
        }

        static async Task<String> GetChannelSearchData(string ApiKey, string ChannelSearch)
        {
            try
            {
                ApiKey = _configuration["YoutubeApiKey"];
                ChannelSearchData ChannelSearchData = new ChannelSearchData();
                return await ChannelSearchData.Run(ApiKey, ChannelSearch);
            }
            catch (Exception ex)
            {
                return "error: " + ex;
            }
        }



        /*-----------------------------------*/
        /*Data and API call for getting subscriptions of currently logged-in/authenticated user (getting your subscriptions)*/

        //GET api/youtube/yoursubscriptions
        [HttpGet("yoursubscribers")]
        public ActionResult<SubscribersInfo> SendSubData()
        {
            return Ok(GetSubData().Result);
        }

        //Gets return data from Run() in SubscriptionsData.
        //This stack overvlow thread helped me out here:
        //https://stackoverflow.com/questions/13002507/how-can-i-call-an-async-method-in-main
        //And this documentation/code samples from Google:
        //https://developers.google.com/api-client-library/dotnet/guide/aaa_oauth
        //https://github.com/youtube/api-samples/blob/master/dotnet/Google.Apis.YouTube.Samples.Playlists/PlaylistUpdates.cs
        static async Task<String> GetSubData() //rename this to something better
        {
            try
            {
                SubscriptionsData SubscriptionsData = new SubscriptionsData();
                return await SubscriptionsData.Run();
            }
            catch (Exception ex)
            {
                return "error: " + ex;
            }
        }


        /*-----------------------------------*/
        /*Data and API call for getting data from 10 most recent uploads of a channel based on the inputted channel ID*/

        //GET api/youtube/bychannelid/UC-lHJZR3Gqxm24_Vd_AJ5Yw
        [HttpGet("bychannelid/{ChannelId}")]
        public ActionResult<ChannelDataInfo> SendChannelData(string ApiKey, string ChannelId)
        {
            return Ok(GetChannelData(ApiKey, ChannelId).Result);
        }

        static async Task<String> GetChannelData(string ApiKey, string ChannelId)
        {
            try
            {
                ApiKey = _configuration["YoutubeApiKey"];
                ChannelData ChannelData = new ChannelData();
                return await ChannelData.Run(ApiKey, ChannelId);
            }
            catch (Exception ex)
            {
                return "error: " + ex;
            }
        }

    }
}