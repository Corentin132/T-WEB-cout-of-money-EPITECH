import { Body, Controller, Delete, Get, Patch, Post, Route, Tags } from "tsoa";
import Parser from "rss-parser";
import { PrismaClient } from "@prisma/client";




interface RSSResponse {
	url: string;
	active: boolean;
	name: string;
	id: string | number;
}

interface RSSFeedItem {
	title: string;
	link: string;
	pubDate: string;
	creator: string;
	description: string;
	category: string;
	image?: string;
	isArticleSaved: boolean;
}

interface RSSRequest {
	url: string;
	active: boolean;
	name: string;
}

interface ErrorResponse {
	error: string;
	codeError: number;
}

interface SuccessResponse {
	success: string;
}

const prisma = new PrismaClient();

@Route("feed")
export default class RSSController extends Controller {

	@Tags("RSS")
	@Get("/getFeed/{id}")
	public async getFeed(id: number): Promise<RSSResponse | ErrorResponse> {
		try {
			const feed = await prisma.feed.findUnique({
				where: {
					id: id,
				},
			});
			if (feed) {
				const response: RSSResponse = {
					url: feed.url || "",
					active: feed.active || false,
					name: feed.name || "",
					id: feed.id || "",
				};
				return response;
			} else {
				return { error: "Feed or feed items are undefined", codeError: 500 };
			}
		} catch (error) {
			return { error: "Error parsing RSS feed", codeError: 500 };
		}
	}
	@Tags("RSS")
	@Post("/addFeed")
	public async addFeed(@Body() requestBody: RSSRequest): Promise<SuccessResponse | ErrorResponse> {
		const { url, active, name } = requestBody;
		try {
			const feeds = await prisma.feed.findMany();
			if (!url) {
				return { error: "URL is empty", codeError: 500 };
			}
			if (feeds) {
				const feed = feeds.find((feed) => feed.url === url);
				if (feed) {
					return { error: "Feed already exists", codeError: 500 };
				}
			}
			await prisma.feed.create({
				data: {
					url: url,
					active: active,
					name: name,
				}
			});
			return { success: "Feed added" };
		} catch (error) {
			return { error: "Error parsing RSS feed", codeError: 500 };
		}
	}
	@Tags("RSS")
	@Get("/getFeeds")
	public async getFeeds(): Promise<RSSRequest[] | ErrorResponse> {
		try {
			const feeds = await prisma.feed.findMany();
			if (feeds) {
				const response = feeds.map((feed) => ({
					url: feed.url || "",
					active: feed.active || false,
					name: feed.name || "",
					id: feed.id || "",
					createdAt: feed.createdAt || "",
					updatedAt: feed.updatedAt || "",
				}
				));
				return response;
			} else {
				return { error: "Feed or feed items are undefined", codeError: 500 };
			}
		} catch (error) {
			return { error: "Error parsing RSS feed", codeError: 500 };
		}
	}

	@Tags("RSS")
	@Delete("/deleteFeed/{id}")
	public async deleteFeed(id: number): Promise<SuccessResponse | ErrorResponse> {
		try {
			await prisma.feed.delete({
				where: {
					id: id,
				},
			});
			return { success: "Feed deleted" };
		} catch (error) {
			return { error: "Error parsing RSS feed", codeError: 500 };
		}
	}

	@Tags("RSS")
	@Patch("/updateFeed/{id}")
	public async updateFeed(id: number, @Body() requestBody: RSSRequest): Promise<SuccessResponse | ErrorResponse> {
		const { url, active, name } = requestBody;
		try {
			await prisma.feed.update({
				where: {
					id: id,
				},
				data: {
					url: url,
					active: active,
					name: name,
				}
			});
			return { success: "Feed updated" };
		} catch (error) {
			return { error: "Error parsing RSS feed", codeError: 500 };
		}
	}

	@Tags("RSS")
	@Get("/getAllFeedItems")
	public async getAllFeedItems(): Promise<Array<RSSFeedItem> | ErrorResponse> {
		const parser = new Parser();
		try {
			const feeds = await prisma.feed.findMany();
			if (feeds) {
				const response = new Array<RSSFeedItem>();
				
				// Use Promise.all to wait for all async operations to complete
				await Promise.all(feeds.map(async (feed) => {
					try {
						if(!feed.active) return;
						const feedResponse = await parser.parseURL(feed.url);
						if (feedResponse) {
							feedResponse.items.map((item) => {
								const feedItem: RSSFeedItem = {
									title: item.title || "",
									link: item.link || "",
									pubDate: item.pubDate || "",
									creator: item.creator || "",
									description: item.description || "",
									category: item.categories?.toString() || "",
									image: item.enclosure?.url || feedResponse.image?.url,
									isArticleSaved: false,
								};
								response.push(feedItem);
							});
						}
					} catch (error) {
						return { error: "Error parsing RSS feed", codeError: 500 };
					}
				}));
				return response;
			}
			

			return { error: "Feed or feed items are undefined", codeError: 500 };
		}
		catch (error) {
			return { error: "Error parsing RSS feed", codeError: 500 };
		}
	}
}
