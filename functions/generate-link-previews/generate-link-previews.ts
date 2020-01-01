/* eslint-disable import/prefer-default-export */

import { APIGatewayEvent, APIGatewayProxyResult } from 'aws-lambda';
import axios from 'axios';
import cheerio from 'cheerio';


/**
 * Adapted from:
 * "A Guide to Web Scraping with Node.js"
 * by Fireship
 * https://www.youtube.com/watch?v=dXjKh66BR2U
 */
const generateLinkPreviews = async (urls: string[]) => {
  const requests = urls.map(async (url) => {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);
    const getMetaTag = (
      name: string,
    ) => $(`meta[name=${name}]`).attr('content')
      || $(`meta[property="og:${name}"]`).attr('content')
      || $(`meta[property="twitter:${name}"]`).attr('content');
    return {
      url,
      title: $('title').first().text(),
      favicon: $('link[rel="icon"]').attr('href'),
      description: getMetaTag('description'),
      image: getMetaTag('image'),
      author: getMetaTag('author'),
    };
  });
  return Promise.all(requests);
};

const handler = async (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  if (!event.queryStringParameters?.urls) {
    return {
      // Bad Request
      statusCode: 400,
      body: 'Bad Request: URLs are Missing',
    };
  }
  return {
    // OK
    statusCode: 200,
    body: JSON.stringify(
      await generateLinkPreviews(
        JSON.parse(
          event.queryStringParameters.urls,
        ),
      ),
    ),
  };
};

export { handler };
