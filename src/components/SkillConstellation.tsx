import React, { useState } from 'react';
import { Box } from '@mui/material';

const GOLD = '#D4AF37';

interface SkillNode {
  id: string;
  label: string;
  x: number;
  y: number;
  color: string;
  labelDy: number; // label offset relative to node center
}

interface Edge { from: string; to: string }

const NODES: SkillNode[] = [
  { id: 'kafka',  label: 'Kafka',         x: 58,  y: 108, color: '#E57373', labelDy: 18 },
  { id: 'spark',  label: 'Spark',         x: 178, y: 62,  color: '#81C784', labelDy: -13 },
  { id: 'java',   label: 'Java',          x: 298, y: 42,  color: '#64B5F6', labelDy: -13 },
  { id: 'python', label: 'Python',        x: 188, y: 152, color: '#64B5F6', labelDy: 18 },
  { id: 'k8s',    label: 'K8s',           x: 62,  y: 172, color: '#E57373', labelDy: 16 },
  { id: 'aws',    label: 'AWS',           x: 392, y: 108, color: '#FFB74D', labelDy: 18 },
  { id: 'cts',    label: 'Cost-to-Serve', x: 315, y: 172, color: GOLD,      labelDy: 18 },
  { id: 'ppif',   label: 'PPI-F™',        x: 472, y: 52,  color: GOLD,      labelDy: -13 },
];

const EDGES: Edge[] = [
  { from: 'kafka',  to: 'spark' },
  { from: 'spark',  to: 'java' },
  { from: 'spark',  to: 'python' },
  { from: 'spark',  to: 'aws' },
  { from: 'kafka',  to: 'k8s' },
  { from: 'k8s',    to: 'aws' },
  { from: 'aws',    to: 'cts' },
  { from: 'cts',    to: 'ppif' },
  { from: 'java',   to: 'kafka' },
  { from: 'spark',  to: 'cts' },
];

const getNode = (id: string) => NODES.find((n) => n.id === id)!;

const getConnected = (id: string): Set<string> => {
  const s = new Set<string>();
  EDGES.forEach((e) => {
    if (e.from === id) s.add(e.to);
    if (e.to === id) s.add(e.from);
  });
  return s;
};

const SkillConstellation: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const connected = hovered ? getConnected(hovered) : new Set<string>();

  const nodeOpacity = (id: string) => {
    if (!hovered) return 0.65;
    if (id === hovered) return 1;
    if (connected.has(id)) return 0.9;
    return 0.18;
  };

  const edgeOpacity = (e: Edge) => {
    if (!hovered) return 0.15;
    if (e.from === hovered || e.to === hovered) return 0.75;
    return 0.04;
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 620, mx: 'auto', mt: 3 }}>
      <svg
        viewBox="0 0 540 210"
        style={{ width: '100%', height: 'auto', overflow: 'visible', minHeight: 140 }}
        aria-label="Technology skill constellation"
      >
        {/* Edges */}
        {EDGES.map((e) => {
          const a = getNode(e.from);
          const b = getNode(e.to);
          return (
            <line
              key={`${e.from}-${e.to}`}
              x1={a.x} y1={a.y} x2={b.x} y2={b.y}
              stroke="rgba(255,255,255,1)"
              strokeWidth={0.75}
              strokeOpacity={edgeOpacity(e)}
              style={{ transition: 'stroke-opacity 0.22s ease' }}
            />
          );
        })}

        {/* Nodes */}
        {NODES.map((node) => {
          const isHovered = node.id === hovered;
          const op = nodeOpacity(node.id);
          return (
            <g
              key={node.id}
              onMouseEnter={() => setHovered(node.id)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'default' }}
            >
              {/* Glow ring */}
              {isHovered && (
                <circle
                  cx={node.x} cy={node.y} r={20}
                  fill="none"
                  stroke={node.color}
                  strokeWidth={1}
                  strokeOpacity={0.4}
                />
              )}
              {/* Dot */}
              <circle
                cx={node.x} cy={node.y}
                r={isHovered ? 7 : 4.5}
                fill={isHovered ? node.color : 'rgba(255,255,255,0.85)'}
                opacity={op}
                style={{ transition: 'all 0.22s ease' }}
              />
              {/* Label */}
              <text
                x={node.x}
                y={node.y + node.labelDy}
                textAnchor="middle"
                fill={isHovered ? node.color : 'rgba(255,255,255,0.72)'}
                fontSize={11}
                fontFamily="DS-DIGII, monospace"
                opacity={op}
                style={{ transition: 'all 0.22s ease', userSelect: 'none' }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </Box>
  );
};

export default SkillConstellation;
