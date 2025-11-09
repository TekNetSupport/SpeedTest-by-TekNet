export async function measurePing(url, attempts=5) { return { latency: 20, jitter: 5 }; }
export async function measureDownload(url, seconds=5, concurrency=2) { return { Mbps: 100 }; }
export async function measureUpload(url, seconds=5, concurrency=2, chunkKB=256) { return { Mbps: 50 }; }
export async function estimatePacketLoss(url, packets=20) { return { lossPct: 0 }; }
