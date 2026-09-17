// Compatibility entry point: all live messaging now uses the MySQL chat schema.
// Keeping this route prevents old clients from silently writing to the legacy messages table.
export { GET, POST } from "../chat/route";
