import { SERVERS } from "./servers.js";
import { measurePing, measureDownload, measureUpload, estimatePacketLoss } from "./librespeed-client.js";

const server = SERVERS[0];

document.getElementById("serverName").textContent = server.name;
document.getElementById("serverCoords").textContent = `${server.latitude}, ${server.longitude}`;

document.getElementById("startBtn").addEventListener("click", async () => {
  const { latency, jitter } = await measurePing(server.pingURL, 10);
  document.getElementById("latVal").textContent = `${latency.toFixed(1)} ms`;
  document.getElementById("jitVal").textContent = `${jitter.toFixed(1)} ms`;

  const dl = await measureDownload(server.downloadURL, 8, 4);
  document.getElementById("dlVal").textContent = `${dl.Mbps.toFixed(2)} Mbps`;

  const ul = await measureUpload(server.uploadURL, 8, 4, 256);
  document.getElementById("ulVal").textContent = `${ul.Mbps.toFixed(2)} Mbps`;

  const loss = await estimatePacketLoss(server.pingURL, 50);
  document.getElementById("lossVal").textContent = `${loss.lossPct.toFixed(2)} %`;

  // Simple scoring
  document.getElementById("scoreStream").textContent = dl.Mbps > 25 ? "Good" : "Fair";
  document.getElementById("scoreGame").textContent = latency < 60 ? "Good" : "Bad";
  document.getElementById("scoreChat").textContent = ul.Mbps > 3 ? "Good" : "Fair";
});

