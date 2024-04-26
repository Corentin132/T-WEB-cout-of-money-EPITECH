
interface AdminRSSFeed {
    id?: string;
    name: string;
    url: string;
    active: boolean;
}


export async function getFeeds(){
    const response = await fetch("http://localhost:4000/feed/getFeeds", {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        },
    });
    const feeds = await response.json();
    return feeds;
} 

export async function addFeed(feed: AdminRSSFeed){
    const response = await fetch("http://localhost:4000/feed/addFeed", {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(feed),
    });
    const feeds = await response.json();
    return feeds;
}

export async function deleteFeed(id : string){
    const response = await fetch("http://localhost:4000/feed/deleteFeed/"+id, {
        method: "DELETE",
        headers: {
        "Content-Type": "application/json",
        },
    });
    const feeds = await response.json();
    return feeds;
}

export async function updateFeed(feed: AdminRSSFeed){
    const response = await fetch("http://localhost:4000/feed/updateFeed/"+feed.id, {
        method: "PATCH",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify(feed),
    });
    const feeds = await response.json();
    return feeds;
}
