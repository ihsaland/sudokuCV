import React from 'react';
import { Box, Typography, Divider, Button } from '@mui/material';
import PrintIcon from '@mui/icons-material/Print';

/**
 * Print-optimized resume — light background, standard fonts.
 * Accessible at /resume; user prints → Save as PDF to update Ian_Salandy.pdf.
 */

const s = {
  name: { fontSize: '26px', fontWeight: 700, color: '#111', fontFamily: 'Georgia, serif', letterSpacing: '0.02em' },
  title: { fontSize: '13px', color: '#555', fontFamily: 'Arial, sans-serif', mt: '2px', letterSpacing: '0.06em', textTransform: 'uppercase' as const },
  contact: { fontSize: '11px', color: '#666', fontFamily: 'Arial, sans-serif', mt: '6px' },
  sectionHead: { fontSize: '11px', fontWeight: 700, color: '#b8962e', fontFamily: 'Arial, sans-serif', letterSpacing: '0.1em', textTransform: 'uppercase' as const, mt: '18px', mb: '6px' },
  roleTitle: { fontSize: '12px', fontWeight: 700, color: '#111', fontFamily: 'Arial, sans-serif' },
  roleOrg: { fontSize: '12px', color: '#333', fontFamily: 'Arial, sans-serif' },
  rolePeriod: { fontSize: '11px', color: '#888', fontFamily: 'Arial, sans-serif', float: 'right' as const },
  body: { fontSize: '11.5px', color: '#222', fontFamily: 'Arial, sans-serif', lineHeight: 1.55 },
  bullet: { fontSize: '11.5px', color: '#222', fontFamily: 'Arial, sans-serif', lineHeight: 1.55, ml: '16px' },
  divider: { borderColor: '#ddd', my: '8px' },
  chip: {
    display: 'inline-block',
    fontSize: '10.5px', color: '#555', fontFamily: 'Arial, sans-serif',
    border: '0.5px solid #ccc', borderRadius: '4px',
    px: '6px', py: '2px', mr: '4px', mb: '4px',
  },
};

const SectionHead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <Typography sx={s.sectionHead}>{children}</Typography>
    <Divider sx={s.divider} />
  </>
);

const Role: React.FC<{ org: string; title: string; period: string; bullets: string[] }> = ({ org, title, period, bullets }) => (
  <Box sx={{ mb: '10px' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
      <Box>
        <Typography component="span" sx={s.roleTitle}>{title}</Typography>
        <Typography component="span" sx={{ ...s.roleOrg, ml: '6px' }}>· {org}</Typography>
      </Box>
      <Typography sx={s.rolePeriod}>{period}</Typography>
    </Box>
    <Box component="ul" sx={{ m: 0, pl: '18px', mt: '3px' }}>
      {bullets.map((b, i) => (
        <Box key={i} component="li" sx={s.bullet}>{b}</Box>
      ))}
    </Box>
  </Box>
);

const PrintableResume: React.FC = () => (
  <Box sx={{ background: '#fff', minHeight: '100vh', py: 0 }}>

    {/* Print button — hidden on print */}
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: 4, pt: 2, pb: 1, '@media print': { display: 'none' } }}>
      <Button
        variant="outlined"
        size="small"
        startIcon={<PrintIcon />}
        onClick={() => window.print()}
        sx={{
          color: '#b8962e', borderColor: '#b8962e', fontSize: '0.82rem',
          '&:hover': { backgroundColor: 'rgba(184,150,46,0.08)', borderColor: '#b8962e' },
        }}
      >
        Print / Save as PDF
      </Button>
    </Box>

    {/* Resume body */}
    <Box
      sx={{
        maxWidth: '760px',
        mx: 'auto',
        px: { xs: '24px', sm: '40px' },
        pb: '48px',
        '@media print': {
          maxWidth: '100%',
          px: '0.6in',
          pb: '0.5in',
          '& *': { printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' },
        },
      }}
    >

      {/* Header */}
      <Box sx={{ textAlign: 'center', pt: '32px', pb: '12px', '@media print': { pt: '0.4in' } }}>
        <Typography sx={s.name}>IAN SALANDY</Typography>
        <Typography sx={s.title}>Systems Pressure Architect · Performance Engineering · Distributed Systems</Typography>
        <Typography sx={s.contact}>
          ian.salandy@gmail.com &nbsp;·&nbsp; LinkedIn: linkedin.com/in/iansalandy &nbsp;·&nbsp; Portfolio: iansalandy.com
        </Typography>
      </Box>

      <Divider sx={{ borderColor: '#b8962e', borderWidth: '1.5px', mb: '4px' }} />

      {/* Summary */}
      <SectionHead>Professional Summary</SectionHead>
      <Typography sx={s.body}>
        Systems Pressure Architect with 15+ years of experience defining and scaling distributed systems architectures for high-throughput data platforms. Expert in capacity planning, cost-to-serve modeling, and system-level performance engineering across multi-billion event workloads. Trusted advisor to engineering leadership on system risk, scalability strategy, and infrastructure investment. Methodology includes the PPI-F™ (Performance Pressure Index) Framework for structured performance analysis and risk mitigation.
      </Typography>

      {/* Experience */}
      <SectionHead>Professional Experience</SectionHead>

      <Role
        org="Salesforce"
        title="Acting Principal Architect / Staff Performance Engineer"
        period="2021 – Present"
        bullets={[
          'Defined scalability architecture for distributed data platforms processing billions of events annually across multi-region deployments.',
          'Designed system-level scaling strategies across compute, storage, and query layers improving throughput by 35%.',
          'Built cost-to-serve models reducing infrastructure spend by ~$750K annually without degrading SLAs.',
          'Developed predictive workload models forecasting system behavior under 2×–10× growth scenarios.',
          'Established cross-system diagnostics frameworks for bottleneck identification across Spark, Trino, and Kafka stacks.',
          'Led benchmarking and regression governance, setting org-wide quality gates across quarterly releases.',
          'Presented system risk, scaling constraints, and architectural recommendations to VP and C-suite stakeholders.',
        ]}
      />

      <Role
        org="IBM"
        title="Principal Performance & Capacity Engineer"
        period="2016 – 2021"
        bullets={[
          'Defined capacity planning and scalability strategies for enterprise distributed systems supporting millions of daily transactions.',
          'Built infrastructure efficiency models reducing waste by 20%+ through workload-aligned allocation.',
          'Led JVM and backend optimization initiatives improving p99 latency and system reliability under variable load.',
          'Standardized performance criteria and escalation paths across multiple product lines.',
        ]}
      />

      <Role
        org="Accenture"
        title="Lead Performance Engineer"
        period="2009 – 2016"
        bullets={[
          'Led performance architecture initiatives for enterprise systems across financial services, retail, and public sector clients.',
          'Designed load simulation frameworks to validate scalability ahead of peak seasonal events.',
          'Diagnosed distributed system bottlenecks impacting production reliability and SLA attainment.',
          'Delivered performance readiness assessments and executive briefings for go-live decisions.',
        ]}
      />

      {/* Skills */}
      <SectionHead>Skills & Technologies</SectionHead>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0 }}>
        {[
          'Distributed Systems Architecture', 'Scalability Strategy', 'Capacity Planning',
          'Cost-to-Serve Modeling', 'Performance Engineering', 'System Diagnostics',
          'Benchmarking & Regression Governance', 'Performance Tooling', 'Executive Communication',
          'Java', 'Python', 'SQL', 'Bash',
          'Apache Spark', 'Trino / Presto', 'Apache Kafka',
          'Kubernetes', 'AWS EMR', 'AWS EKS', 'AWS (EC2, S3, CloudWatch)',
          'JVM Tuning', 'Workload Modeling', 'Load Simulation',
        ].map((t) => (
          <Box key={t} sx={s.chip}>{t}</Box>
        ))}
      </Box>
      <Typography sx={{ ...s.body, mt: '6px' }}>
        Methodology: PPI-F™ (Performance Pressure Index) Framework — four-pillar governance across Performance, Production Readiness, Infrastructure Efficiency, and Failure Resilience. Infrastructure economics including cost-to-serve modeling, waste indexing, and economic blast radius analysis. Advisory through KPI99.
      </Typography>

      {/* Education */}
      <SectionHead>Education</SectionHead>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '4px' }}>
        <Box>
          <Typography sx={s.roleTitle}>M.S. Computer Science</Typography>
          <Typography sx={s.roleOrg}>North Carolina State University</Typography>
        </Box>
        <Typography sx={s.rolePeriod}>2004 – 2006</Typography>
      </Box>
      <Typography sx={{ ...s.body, mb: '10px' }}>
        Graduate research in distributed computing, parallel architectures, and performance modeling.
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: '4px' }}>
        <Box>
          <Typography sx={s.roleTitle}>B.S. Computer Science</Typography>
          <Typography sx={s.roleOrg}>Morehouse College</Typography>
        </Box>
        <Typography sx={s.rolePeriod}>2000 – 2004</Typography>
      </Box>
      <Typography sx={s.body}>
        Foundation in algorithms, operating systems, networks, and software engineering principles.
      </Typography>

    </Box>
  </Box>
);

export default PrintableResume;
