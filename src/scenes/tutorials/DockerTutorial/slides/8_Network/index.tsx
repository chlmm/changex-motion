/**
 * 8_Network - Docker 网络管理
 * 
 * 本幻灯片深入讲解 Docker 网络的类型与操作，分为3个子幻灯片：
 * ┌─────────────────────────────────────────────────────────────────┐
 * │ 1. NetworkTypes (200帧) - 网络类型对比                          │
 * │    4个场景：网络概述、Bridge/Host/None 三种网络类型详解          │
 * │    每种类型展示架构图、特点和适用场景                            │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 2. NetworkOps (200帧) - 网络操作                                │
 * │    7个场景：ls/create/createSubnet/run/connect/disconnect/rm    │
 * │    全部终端演示网络创建、连接、断开、删除等操作                  │
 * ├─────────────────────────────────────────────────────────────────┤
 * │ 3. DNSIsolation (180帧) - DNS解析与网络隔离                     │
 * │    4个场景：DNS机制、DNS示例、网络隔离、多网络架构               │
 * │    展示自定义网络中容器名称解析、frontend/backend 隔离架构       │
 * └─────────────────────────────────────────────────────────────────┘
 * 
 * 总时长: 580帧 (约19.3秒 @30fps)
 */
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { NetworkTypes } from './NetworkTypes';
import { NetworkOps } from './NetworkOps';
import { DNSIsolation } from './DNSIsolation';

// 重新导出子组件
export { NetworkTypes, NetworkOps, DNSIsolation };

// 各子幻灯片时长
const NETWORK_TYPES_DURATION = 200;     // 网络类型对比
const NETWORK_OPS_DURATION = 200;       // 网络操作
const DNS_ISOLATION_DURATION = 180;     // DNS 解析与网络隔离

// 总时长导出
export const NETWORK_TOTAL_FRAMES = 
  NETWORK_TYPES_DURATION + 
  NETWORK_OPS_DURATION + 
  DNS_ISOLATION_DURATION;

// 子幻灯片时长导出（供外部使用）
export const SLIDE_DURATIONS = {
  networkTypes: NETWORK_TYPES_DURATION,
  networkOps: NETWORK_OPS_DURATION,
  dnsIsolation: DNS_ISOLATION_DURATION,
};

// 场景组件导出
export const NetworkScene: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* 场景 1: 网络类型对比 */}
      <Sequence from={0} durationInFrames={NETWORK_TYPES_DURATION}>
        <NetworkTypes />
      </Sequence>

      {/* 场景 2: 网络操作 */}
      <Sequence from={NETWORK_TYPES_DURATION} durationInFrames={NETWORK_OPS_DURATION}>
        <NetworkOps />
      </Sequence>

      {/* 场景 3: DNS 解析与网络隔离 */}
      <Sequence from={NETWORK_TYPES_DURATION + NETWORK_OPS_DURATION} durationInFrames={DNS_ISOLATION_DURATION}>
        <DNSIsolation />
      </Sequence>
    </AbsoluteFill>
  );
};

// 默认导出
export default NetworkScene;
