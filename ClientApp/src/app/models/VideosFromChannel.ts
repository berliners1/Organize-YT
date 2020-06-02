export interface VideosFromChannel {
    kind:          string;
    etag:          string;
    nextPageToken: string;
    regionCode:    string;
    pageInfo:      PageInfo;
    items:         Item[];
}

export interface Item {
    kind:    ItemKind;
    etag:    string;
    id:      ID;
    snippet: Snippet;
}

export interface ID {
    kind:    IDKind;
    videoId: string;
}

export enum IDKind {
    YoutubeVideo = "youtube#video",
}

export enum ItemKind {
    YoutubeSearchResult = "youtube#searchResult",
}

export interface Snippet {
    publishedAt:          Date;
    channelId:            ChannelID;
    title:                string;
    description:          string;
    thumbnails:           Thumbnails;
    channelTitle:         ChannelTitle;
    liveBroadcastContent: LiveBroadcastContent;
    publishTime:          Date;
}

export enum ChannelID {
    UCLHJZR3Gqxm24VdAJ5Yw = "UC-lHJZR3Gqxm24_Vd_AJ5Yw",
}

export enum ChannelTitle {
    PewDiePie = "PewDiePie",
}

export enum LiveBroadcastContent {
    None = "none",
}

export interface Thumbnails {
    thumbnailsDefault: ThumbnailsDefaultClass;
    thumbnailsMedium:  ThumbnailsDefaultClass;
    thumbnailsHigh:    ThumbnailsDefaultClass;
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
