using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using System.IO;
using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Util.Store;
using Google.Apis.YouTube.v3;
using Newtonsoft.Json;
using Organize_YT.Models;
using IdentityServer4.Validation;

namespace Organize_YT.Data
{
    public class SubscriptionsData
    {
        public async Task<String> Run()
        {
            UserCredential credential;
            using (var stream = new FileStream("client_secrets.json", FileMode.Open, FileAccess.Read))
            {
                credential = await GoogleWebAuthorizationBroker.AuthorizeAsync(
                    GoogleClientSecrets.Load(stream).Secrets,
                    // This OAuth 2.0 access scope allows for full read/write access to the
                    // authenticated user's account.
                    new[] { YouTubeService.Scope.Youtube },
                    "user",
                    CancellationToken.None,
                    new FileDataStore(this.GetType().ToString())
                );
            }

            var youtubeService = new YouTubeService(new BaseClientService.Initializer()
            {
                HttpClientInitializer = credential,
                ApplicationName = this.GetType().ToString()
            });

            List<SubscribersInfo> ChannelData = new List<SubscribersInfo>();

            var nextPageToken = "";
            while (nextPageToken != null)
            {
                var newSubscriptionList = youtubeService.Subscriptions.List("snippet");
                newSubscriptionList.Mine = true;
                newSubscriptionList.MaxResults = 50;
                newSubscriptionList.Order = Google.Apis.YouTube.v3.SubscriptionsResource.ListRequest.OrderEnum.Alphabetical;
                newSubscriptionList.PageToken = nextPageToken;
                var searchListResult = newSubscriptionList.Execute();

                foreach (var item in searchListResult.Items)
                {
                    ChannelData.Add(new SubscribersInfo
                    {
                        DataTitle = item.Snippet.Title,
                        DataChannelId = item.Snippet.ResourceId.ChannelId,
                        DataThumbnail = item.Snippet.Thumbnails.Default__.Url
                    });
                }

                //Utulize nextPageToken so that the final returned list is every subscription, and not contained by the regular MaxResults per page.
                //adapted from code sample given here: https://developers.google.com/youtube/v3/docs/playlistItems/list
                nextPageToken = searchListResult.NextPageToken;

            }

            var jsonData = JsonConvert.SerializeObject(ChannelData);
            return jsonData;
        }

    }
}
