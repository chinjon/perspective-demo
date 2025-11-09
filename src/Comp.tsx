import perspective from "@perspective-dev/client";
import perspective_viewer from "@perspective-dev/viewer";
import "@perspective-dev/viewer-datagrid";
import "@perspective-dev/viewer-d3fc";

import "@perspective-dev/viewer/dist/css/pro-dark.css";
import "./index.css";

import SERVER_WASM from "@perspective-dev/server/dist/wasm/perspective-server.wasm?url";
import CLIENT_WASM from "@perspective-dev/viewer/dist/wasm/perspective-viewer.wasm?url";

await Promise.all([
    perspective.init_server(fetch(SERVER_WASM)),
    perspective_viewer.init_client(fetch(CLIENT_WASM)),
]);

const req = fetch("https://vega.github.io/editor/data/movies.json");
const viewer = document.createElement("perspective-viewer");
document.body.append(viewer);
const worker = await perspective.worker();
const resp = await req;
const buffer = await resp.json();
const table = worker.table(buffer);
viewer.load(table);

export default () => {
  return <h2>Child component</h2>;
};
