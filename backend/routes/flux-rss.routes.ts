import express from "express";
import RSSController from "../controllers/flux-rss.controller";

const router = express.Router();

router.get("/feed/getFeeds", async (req, res) => {
	const controller = new RSSController();
	const response = await controller.getFeeds();
	return res.send(response);
});

router.post("/feed/addFeed", async (req, res) => {
	const controller = new RSSController();
	const response = await controller.addFeed(req.body);
	return res.send(response);
});

router.get("/feed/getFeed/:id", async (req, res) => {
	const id = Number(req.params.id);
	const controller = new RSSController();
	const response = await controller.getFeed(id);
	return res.send(response);
});

router.delete("/feed/deleteFeed/:id", async (req, res) => {
	const id = Number(req.params.id);
	const controller = new RSSController();
	const response = await controller.deleteFeed(id);
	return res.send(response);
});

router.patch("/feed/updateFeed/:id", async (req, res) => {
	const id = Number(req.params.id);
	const controller = new RSSController();
	const response = await controller.updateFeed(id, req.body);
	return res.send(response);
});

router.get("/feed/getAllFeedItems", async (req, res) => {
	const controller = new RSSController();
	const response = await controller.getAllFeedItems();
	return res.send(response);
});

export default router;
