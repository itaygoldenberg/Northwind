// Tools to be used by the MCP server
// Tools - what the MCP server do?
 
import { CallToolResult } from "@modelcontextprotocol/sdk/types";
import { orderService } from "../services/order-service";
import { employeeService } from "../services/employee-service";


 
class McpTools {
 
    public async getAllOrdersTool(): Promise<CallToolResult> {
        console.log("Using tool: getAllOrdersTool");
        const orders = await orderService.getAllOrders();
        const result: CallToolResult = {
            content: [{
                type: "text",
                text: JSON.stringify(orders)
            }]
        };
        return result;
    }
 
    public async getOneOrderTool(args: { id: number }): Promise<CallToolResult> {
        console.log("Using tool: getOneOrderTool");
        const order = await orderService.getOneOrder(args.id);
        const result: CallToolResult = {
            content: [{
                type: "text",
                text: JSON.stringify(order)
            }]
        };
        return result;
    }
   public async getOrdersByYearTool(args: { year: number }): Promise<CallToolResult> {
        console.log("Using tool: getOrdersByYearTool");
        const orders = await orderService.getOrdersByYear(args.year);
        const result: CallToolResult = {
            content: [{
                type: "text",
                text: JSON.stringify(orders)
            }]
        };
        return result;
    }
        public async getAllEmployeesTool(): Promise<CallToolResult> {
        console.log("Using tool: getAllEmployeesTool");
        const employees = await employeeService.getAllEmployees();
        const result: CallToolResult = {
            content: [{
                type: "text",
                text: JSON.stringify(employees)
            }]
        };
        return result;
    }

        public async getAllCountriesTool(): Promise<CallToolResult> {
        console.log("Using tool: getAllCountriesTool");
        const countries = await employeeService.getAllCountries();
        const result: CallToolResult = {
            content: [{
                type: "text",
                text: JSON.stringify(countries)
            }]
        };
        return result;
    }
        public async getAllCitiesTool(): Promise<CallToolResult> {
        console.log("Using tool: getAllCitiesTool");
        const cities = await employeeService.getAllCities();
        const result: CallToolResult = {
            content: [{
                type: "text",
                text: JSON.stringify(cities)
            }]
        };
        return result;
    }
    }


 
export const mcpTools = new McpTools();
 