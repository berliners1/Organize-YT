export interface VideosFromChannel {
    kind:          string;
    etag:          string;
    nextPageToken: string;
    items:         Item[];
    pageInfo:      PageInfo;
}

export interface Item {
    kind:    ItemKind;
    etag:    string;
    id:      string;
    snippet: Snippet;
}

export enum IDKind {
    YoutubeVideo = "youtube#video",
}

export enum ItemKind {
    YoutubeSearchResult = "youtube#searchResult",
}

export interface Snippet {
    publishedAt:          Date;
    channelId:            string;
    title:                string;
    description:          string;
    thumbnails:           Thumbnails;
    channelTitle:         string;
    playlistId:           string;
    position:             number;
    resourceId:           ResourceId;
}

export interface ResourceId{
    kind: string;
    videoId: string;
}

export interface Thumbnails {
    thumbnailsDefault: ThumbnailsDefaultClass;
    thumbnailsMedium:  ThumbnailsDefaultClass;
    thumbnailsHigh:    ThumbnailsDefaultClass;
    thumbnailsStandard: ThumbnailsDefaultClass;
    thumbnailsMaxres: ThumbnailsDefaultClass;
}

export interface ThumbnailsDefaultClass {
    url:    string;
    width:  number;
    height: number;
}

export interface PageInfo {
    totalResults:   number;
    resultsPerPage: number;
}
