"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Server,
  Cpu,
  HardDrive,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Play,
  Pause,
  Database,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

export default function NexoraDashboardDemo() {
  const [isStreaming, setIsStreaming] = useState(true);
  const [timeRange, setTimeRange] = useState("1h");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNodeFilter, setSelectedNodeFilter] = useState("all");
  const [latencyTicks, setLatencyTicks] = useState([12, 14, 11, 15, 13, 16, 12, 11, 18, 14, 13, 12]);
  const [throughput, setThroughput] = useState(4.82);

  // Simulate real-time streaming updates
  useEffect(() => {
    if (!isStreaming) return;
    const interval = setInterval(() => {
      setLatencyTicks((prev) => {
        const nextVal = Math.floor(10 + Math.random() * 8);
        return [...prev.slice(1), nextVal];
      });
      setThroughput((prev) => +(prev + (Math.random() * 0.1 - 0.05)).toFixed(2));
    }, 1800);
    return () => clearInterval(interval);
  }, [isStreaming]);

  const clusterNodes = [
    { id: "node-us-east-01", region: "us-east-1", cpu: "38%", memory: "5.2 GB", ping: "8ms", status: "healthy" },
    { id: "node-us-east-02", region: "us-east-1", cpu: "82%", memory: "14.8 GB", ping: "14ms", status: "warning" },
    { id: "node-eu-west-01", region: "eu-west-1", cpu: "44%", memory: "7.1 GB", ping: "22ms", status: "healthy" },
    { id: "node-ap-east-01", region: "ap-east-1", cpu: "29%", memory: "4.0 GB", ping: "45ms", status: "healthy" },
    { id: "node-sa-east-01", region: "sa-east-1", cpu: "12%", memory: "2.4 GB", ping: "68ms", status: "standby" },
  ];

  const filteredNodes = clusterNodes.filter((node) => {
    const matchesSearch = node.id.toLowerCase().includes(searchQuery.toLowerCase()) || node.region.includes(searchQuery.toLowerCase());
    const matchesStatus = selectedNodeFilter === "all" || node.status === selectedNodeFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#070A0E] text-[#F1F5F9] font-sans selection:bg-[#38BDF8] selection:text-[#070A0E] pb-16">
      {/* Top Navbar */}
      <header className="sticky top-0 z-30 bg-[#0B0F16]/95 backdrop-blur-md border-b border-[#1E293B] px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-[#0284C7]/20 border border-[#38BDF8]/40 flex items-center justify-center text-[#38BDF8]">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-base tracking-tight text-white font-mono">NEXORA</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0369A1]/30 text-[#38BDF8] font-mono border border-[#38BDF8]/30">
                TELEMETRY CLUSTER v4.2
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-mono hidden sm:block">Real-time distributed telemetry</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs font-mono">
          <button
            onClick={() => setIsStreaming(!isStreaming)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border transition-all ${
              isStreaming
                ? "bg-[#0369A1]/20 border-[#38BDF8]/40 text-[#38BDF8]"
                : "bg-slate-800/40 border-slate-700 text-slate-400 hover:text-white"
            }`}
          >
            {isStreaming ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isStreaming ? "STREAMING ACTIVE" : "STREAM PAUSED"}</span>
          </button>

          <div className="hidden sm:flex items-center space-x-1 bg-[#131B26] p-1 rounded-lg border border-[#1E293B]">
            {["1h", "6h", "24h"].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range)}
                className={`px-2.5 py-1 rounded text-xs transition-colors ${
                  timeRange === range ? "bg-[#38BDF8] text-slate-950 font-bold" : "text-slate-400 hover:text-white"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-6 max-w-7xl mx-auto space-y-6">
        {/* Metric Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-[#0F1622] border border-[#1E293B] hover:border-[#38BDF8]/40 transition-all">
            <div className="flex justify-between items-start text-slate-400 mb-2">
              <span className="text-xs font-mono">THROUGHPUT</span>
              <Activity className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">{throughput} GB/s</div>
            <div className="text-xs text-emerald-400 font-mono mt-1 flex items-center space-x-1">
              <span>↑ 8.4%</span>
              <span className="text-slate-500">vs 1h avg</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0F1622] border border-[#1E293B] hover:border-[#38BDF8]/40 transition-all">
            <div className="flex justify-between items-start text-slate-400 mb-2">
              <span className="text-xs font-mono">AVG P99 LATENCY</span>
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">
              {latencyTicks[latencyTicks.length - 1]} ms
            </div>
            <div className="text-xs text-emerald-400 font-mono mt-1 flex items-center space-x-1">
              <span>● Ultra-low jitter</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0F1622] border border-[#1E293B] hover:border-[#38BDF8]/40 transition-all">
            <div className="flex justify-between items-start text-slate-400 mb-2">
              <span className="text-xs font-mono">HEALTHY NODES</span>
              <Server className="w-4 h-4 text-[#B6FF3B]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">1,419 / 1,420</div>
            <div className="text-xs text-[#B6FF3B] font-mono mt-1 flex items-center space-x-1">
              <span>● 99.98% Available</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#0F1622] border border-[#1E293B] hover:border-[#38BDF8]/40 transition-all">
            <div className="flex justify-between items-start text-slate-400 mb-2">
              <span className="text-xs font-mono">SOC2 COMPLIANCE</span>
              <ShieldCheck className="w-4 h-4 text-[#38BDF8]" />
            </div>
            <div className="text-2xl font-bold font-mono text-white">ENCRYPTED</div>
            <div className="text-xs text-slate-400 font-mono mt-1">mTLS TLS 1.3 Active</div>
          </div>
        </div>

        {/* Big Interactive Chart Section */}
        <div className="p-5 rounded-2xl bg-[#0F1622] border border-[#1E293B]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-[#1E293B]">
            <div>
              <h2 className="text-base font-semibold text-white">Live Ingestion Velocity & Latency Jitter</h2>
              <p className="text-xs text-slate-400 font-mono">Real-time sampled telemetry per second</p>
            </div>
            <div className="flex items-center space-x-4 mt-2 sm:mt-0 text-xs font-mono">
              <span className="flex items-center space-x-1.5 text-[#38BDF8]">
                <span className="w-2 h-2 rounded-full bg-[#38BDF8]" />
                <span>Latency (ms)</span>
              </span>
              <span className="flex items-center space-x-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Target &lt; 20ms</span>
              </span>
            </div>
          </div>

          {/* SVG Realtime Graph */}
          <div className="h-48 w-full flex items-end space-x-2 pt-4 pb-2 px-2 bg-[#090D14] rounded-xl border border-[#1A2332]">
            {latencyTicks.map((val, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center group relative h-full justify-end">
                <div
                  className="w-full rounded-t transition-all duration-300 group-hover:brightness-125"
                  style={{
                    height: `${(val / 25) * 100}%`,
                    backgroundColor: val > 15 ? "#F59E0B" : "#38BDF8",
                  }}
                />
                <span className="text-[10px] font-mono text-slate-500 mt-2">{val}m</span>
                {/* Tooltip on hover */}
                <div className="absolute -top-8 bg-slate-900 border border-slate-700 text-white text-[10px] font-mono px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  {val}ms
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nodes Data Table */}
        <div className="p-5 rounded-2xl bg-[#0F1622] border border-[#1E293B]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="text-sm font-semibold text-white font-mono uppercase tracking-wider">CLUSTER NODES</h3>
            
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                <input
                  type="text"
                  placeholder="Filter nodes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-lg bg-[#090D14] border border-[#1E293B] text-xs font-mono text-white placeholder-slate-500 focus:outline-none focus:border-[#38BDF8]"
                />
              </div>

              <select
                value={selectedNodeFilter}
                onChange={(e) => setSelectedNodeFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg bg-[#090D14] border border-[#1E293B] text-xs font-mono text-slate-300 focus:outline-none"
              >
                <option value="all">All Status</option>
                <option value="healthy">Healthy</option>
                <option value="warning">Warning</option>
                <option value="standby">Standby</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-[#1E293B] text-slate-400">
                  <th className="py-2.5 px-3">NODE ID</th>
                  <th className="py-2.5 px-3">REGION</th>
                  <th className="py-2.5 px-3">CPU LOAD</th>
                  <th className="py-2.5 px-3">MEMORY</th>
                  <th className="py-2.5 px-3">RTT PING</th>
                  <th className="py-2.5 px-3">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1A2332]">
                {filteredNodes.map((node) => (
                  <tr key={node.id} className="hover:bg-[#131C2A] transition-colors">
                    <td className="py-3 px-3 font-semibold text-white">{node.id}</td>
                    <td className="py-3 px-3 text-slate-400">{node.region}</td>
                    <td className="py-3 px-3 text-slate-300">{node.cpu}</td>
                    <td className="py-3 px-3 text-slate-300">{node.memory}</td>
                    <td className="py-3 px-3 text-[#38BDF8]">{node.ping}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] ${
                          node.status === "healthy"
                            ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                            : node.status === "warning"
                            ? "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                            : "bg-slate-500/10 text-slate-400 border border-slate-500/30"
                        }`}
                      >
                        ● {node.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
