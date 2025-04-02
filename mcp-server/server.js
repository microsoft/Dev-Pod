/**
 * Dev-Pod MCP Server
 * Model Context Protocol server implementation for Azure services with Grounding with Bing Search
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { searchWeb, formatCitations } = require('./tools/webSearch');
const { getSubscriptions } = require('./tools/azure');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
if (process.env.ENABLE_CORS === 'true') {
  app.use(cors());
}

// MCP Server route for SSE transport
app.get('/sse', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // Send a comment to keep the connection alive
  const keepAlive = setInterval(() => {
    res.write(': keep-alive\n\n');
  }, 15000);
  
  // Close the connection when the client disconnects
  req.on('close', () => {
    clearInterval(keepAlive);
  });
});

// Tools discovery endpoint
app.get('/tools', (req, res) => {
  const tools = [
    {
      name: 'websearch',
      description: 'Search the web for information using Grounding with Bing Search',
      commands: [
        {
          name: 'search',
          description: 'Perform a web search with citations',
          args: [
            {
              name: 'query',
              description: 'Search query string',
              required: true
            },
            {
              name: 'count',
              description: 'Number of results to return (default: 5)',
              required: false
            },
            {
              name: 'market',
              description: 'Market code (default: en-US)',
              required: false
            },
            {
              name: 'includeCitations',
              description: 'Whether to include citations in the response (default: true)',
              required: false
            }
          ]
        }
      ]
    },
    {
      name: 'azure',
      description: 'Interact with Azure services',
      commands: [
        {
          name: 'subscription',
          description: 'List available Azure subscriptions',
          args: [
            {
              name: 'tenant-id',
              description: 'Azure tenant ID',
              required: false
            }
          ]
        }
      ]
    }
  ];
  
  res.json({
    status: 200,
    message: 'Success',
    results: {
      tools: tools
    },
    duration: 0
  });
});

// Web search endpoint with Grounding support
app.post('/tools/websearch/search', async (req, res) => {
  const startTime = Date.now();
  const { query, count = 5, market = 'en-US', includeCitations = true } = req.body;
  
  if (!query) {
    return res.json({
      status: 400,
      message: 'Missing required args',
      args: [
        {
          name: 'query',
          description: 'Search query string',
          required: true,
          value: ''
        }
      ],
      duration: Date.now() - startTime
    });
  }
  
  try {
    const results = await searchWeb(query, { 
      count: parseInt(count), 
      mkt: market
    });
    
    // Format the response according to the MCP protocol
    const response = {
      status: 200,
      message: 'Success',
      args: [
        {
          name: 'query',
          description: 'Search query string',
          value: query
        },
        {
          name: 'count',
          description: 'Number of results to return',
          value: count.toString()
        },
        {
          name: 'market',
          description: 'Market code',
          value: market
        },
        {
          name: 'includeCitations',
          description: 'Whether to include citations',
          value: includeCitations.toString()
        }
      ],
      results: {
        webPages: results.results.map(item => ({
          name: item.name,
          url: item.url,
          snippet: item.snippet,
          dateLastCrawled: item.dateLastCrawled
        })),
        totalEstimatedMatches: results.totalResults,
        bingQueryUrl: results.bingQueryUrl
      },
      annotations: includeCitations ? {
        citations: results.results.map((item, index) => ({
          index: index + 1,
          title: item.name,
          url: item.url
        })),
        searchQuery: {
          url: results.bingQueryUrl
        }
      } : undefined,
      duration: Date.now() - startTime
    };
    
    res.json(response);
  } catch (error) {
    console.error('Web search error:', error);
    res.json({
      status: 500,
      message: `Error performing web search: ${error.message}`,
      duration: Date.now() - startTime
    });
  }
});

// Azure subscriptions endpoint
app.post('/tools/azure/subscription', async (req, res) => {
  const startTime = Date.now();
  const { 'tenant-id': tenantId } = req.body;
  
  try {
    const subscriptions = await getSubscriptions(tenantId);
    
    res.json({
      status: 200,
      message: 'Success',
      args: [
        {
          name: 'tenant-id',
          description: 'Azure tenant ID',
          value: tenantId || ''
        }
      ],
      results: {
        subscriptions: subscriptions
      },
      duration: Date.now() - startTime
    });
  } catch (error) {
    console.error('Azure subscription error:', error);
    res.json({
      status: 500,
      message: `Error retrieving Azure subscriptions: ${error.message}`,
      duration: Date.now() - startTime
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`MCP Server with Grounding with Bing Search listening on port ${PORT}`);
  console.log(`SSE endpoint available at http://localhost:${PORT}/sse`);
  console.log(`Tools discovery available at http://localhost:${PORT}/tools`);
});