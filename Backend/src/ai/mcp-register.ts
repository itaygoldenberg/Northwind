import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { mcpTools } from "./mcp-tools";
import { z } from "zod";

class McpRegister {

    public registerGetAllOrdersTool(mcpServer: McpServer): void {
        const uniqueName = "get_all_orders";
        const config = {
            description: "Get all database orders."
        };
        mcpServer.registerTool(uniqueName, config, mcpTools.getAllOrdersTool);
    }
    public registerGetOneOrderTool(mcpServer: McpServer): void {
        const uniqueName = "get_one_order";
        const config = {
            description: "Get database order by given id.",
            inputSchema: z.object({ id: z.number() })
        };
        mcpServer.registerTool(uniqueName, config, mcpTools.getOneOrderTool);
    }

    public registerGetOrdersByYearTool(mcpServer: McpServer): void {
        const uniqueName = "get_orders_by_year";
        const config = {
            description: "Get database orders by given year.",
            inputSchema: z.object({ year: z.number() })
        };
        mcpServer.registerTool(uniqueName, config, mcpTools.getOrdersByYearTool);
    }
        public registerGetAllEmployeesTool(mcpServer: McpServer): void {
        const uniqueName = "get_all_employees";
        const config = {
            description: "Get all employees, including each employee's city and country."
        };
        mcpServer.registerTool(uniqueName, config, mcpTools.getAllEmployeesTool);
    }
        public registerGetAllCountriesTool(mcpServer: McpServer): void {
        const uniqueName = "get_all_countries";
        const config = {
            description: "Get all employee countries"
        };
        mcpServer.registerTool(uniqueName, config, mcpTools.getAllCountriesTool);
    }

    public registerGetAllCitiesTool(mcpServer: McpServer): void {
        const uniqueName = "get_all_cities";
        const config = {
            description: "Get all employee cities"
        };
        mcpServer.registerTool(uniqueName, config, mcpTools.getAllCitiesTool);
    }
}

export const mcpRegister = new McpRegister();