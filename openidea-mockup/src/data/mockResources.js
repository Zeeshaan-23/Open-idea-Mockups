/**
 * Mock data for the Open Resources (/openresources) Research Workstation.
 * 
 * PROTOTYPE DATASET:
 * This data structure models authentic open scientific, code, and hardware resources
 * across the 6 canonical Open Idea categories:
 * - Papers (arXiv, Crossref, Europe PMC)
 * - Datasets (Zenodo, DataCite, Harvard Dataverse, Hugging Face Datasets)
 * - Code (GitHub, GitLab, Codeberg)
 * - Models (Hugging Face Models)
 * - Hardware (OSHWA, CERN OHWR, Thingiverse)
 * - Videos (YouTube / Academic Lectures)
 */

export const RESOURCE_CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'paper', label: 'Papers' },
  { id: 'dataset', label: 'Datasets' },
  { id: 'code', label: 'Code' },
  { id: 'model', label: 'Models' },
  { id: 'hardware', label: 'Hardware' },
  { id: 'video', label: 'Videos' }
];

export const SEARCH_SUGGESTIONS = [
  'Machine Learning',
  'Quantum Computing',
  'Neural Networks',
  'Climate Change',
  'Robotics',
  'CRISPR'
];

export const SOURCE_NAMES = {
  arxiv: 'arXiv',
  openalex: 'OpenAlex',
  crossref: 'Crossref',
  europepmc: 'Europe PMC',
  zenodo: 'Zenodo',
  datacite: 'DataCite',
  dataverse: 'Harvard Dataverse',
  hfdatasets: 'Hugging Face Datasets',
  github: 'GitHub',
  gitlab: 'GitLab',
  codeberg: 'Codeberg',
  huggingface: 'Hugging Face Models',
  oshwa: 'OSHWA certified',
  ohwr: 'CERN OHWR',
  thingiverse: 'Thingiverse',
  youtube: 'YouTube'
};

export const MOCK_RESOURCES = [
  // --- PAPERS ---
  {
    id: 'res-paper-1',
    type: 'paper',
    title: 'Decentralized Intelligence in Open Innovation Networks',
    source: 'arxiv',
    year: 2024,
    license: 'CC-BY-4.0',
    authors: ['Dr. Elena Vance', 'Marcus Thorne'],
    tags: ['collective-intelligence', 'decentralized-ai', 'open-science', 'network-theory'],
    url: 'https://arxiv.org/abs/2401.08921',
    description: 'An empirical investigation into distributed peer-to-peer intelligence frameworks for scientific discovery. The authors demonstrate that asynchronous peer critique mechanisms accelerate hypothesis validation by 42% compared to hierarchical peer review pipelines.',
    typeMeta: {
      citationCount: '84 citations',
      doi: '10.48550/arXiv.2401.08921',
      pages: '28 pages'
    },
    qa: [
      {
        q: 'What problem does this paper address?',
        a: 'It addresses the bottleneck of centralized peer review by introducing a verifiable cryptographic reputation graph for distributed peer evaluations across scientific domains.'
      },
      {
        q: 'How can this be used in an open project?',
        a: 'The authors provide an open-source consensus protocol implementation in Rust that can be integrated into collaborative governance workflows and peer assessment platforms.'
      },
      {
        q: 'What are the commercial licensing terms?',
        a: 'Published under Creative Commons Attribution 4.0 International (CC-BY-4.0), permitting commercial reuse, modification, and distribution with standard attribution.'
      }
    ]
  },
  {
    id: 'res-paper-2',
    type: 'paper',
    title: 'Attention Optimization in Low-Power Edge Neural Transducers',
    source: 'crossref',
    year: 2023,
    license: 'CC-BY-NC-4.0',
    authors: ['Sophia Lin', 'Dr. Rajiv Patel'],
    tags: ['edge-computing', 'transformers', 'neural-networks', 'hardware-acceleration'],
    url: 'https://doi.org/10.1109/TNNLS.2023.3289104',
    description: 'Presents a sparse multi-head self-attention kernel designed specifically for RISC-V embedded accelerators. Achieves 3.8x lower latency and 64% memory reduction on constrained edge microcontrollers without measurable degradation in perplexity.',
    typeMeta: {
      citationCount: '112 citations',
      doi: '10.1109/TNNLS.2023.3289104',
      pages: '14 pages'
    },
    qa: [
      {
        q: 'What hardware architectures are tested in this paper?',
        a: 'Evaluations were performed on RV64GCX custom vector extensions, ARM Cortex-M55, and low-power FPGA edge co-processors.'
      },
      {
        q: 'Is there reference code available?',
        a: 'Yes, C++ tensor kernels and quantized ONNX runtime bindings are open-sourced under the paper’s repository on GitHub.'
      }
    ]
  },
  {
    id: 'res-paper-3',
    type: 'paper',
    title: 'Zero-Shot Robotic Manipulation via Latent Skill Composition',
    source: 'arxiv',
    year: 2024,
    license: 'CC-BY-4.0',
    authors: ['Liam Zhao', 'Priya Nair', 'K. Arisawa'],
    tags: ['robotics', 'latent-spaces', 'reinforcement-learning', 'zero-shot'],
    url: 'https://arxiv.org/abs/2403.11892',
    description: 'Proposes a modular diffusion policy architecture that decomposes complex manipulation instructions into discrete spatial primitives. Enables zero-shot generalization across 12 unseen household manipulation tasks with a 91.4% success rate.',
    typeMeta: {
      citationCount: '47 citations',
      doi: '10.48550/arXiv.2403.11892',
      pages: '22 pages'
    },
    qa: [
      {
        q: 'How does it achieve zero-shot transfer?',
        a: 'By grounding multimodal token embeddings in invariant 3D contact affordance manifolds rather than direct end-effector trajectories.'
      },
      {
        q: 'Can this run in standard physics simulators?',
        a: 'Environments and checkpoints are provided for Isaac Gym, MuJoCo, and PyBullet with standard UR5e and Franka Emika arm configurations.'
      }
    ]
  },
  {
    id: 'res-paper-4',
    type: 'paper',
    title: 'Targeted Genomic Repair Mechanisms via Catalytic CRISPR-Cas12f Vectors',
    source: 'europepmc',
    year: 2023,
    license: 'CC-BY-4.0',
    authors: ['Dr. Anne Dubois', 'Stefan Lindqvist', 'Chen Wei'],
    tags: ['CRISPR', 'gene-editing', 'molecular-biology', 'genomics'],
    url: 'https://europepmc.org/article/MED/37841029',
    description: 'Characterizes ultra-compact Cas12f ribonucleoprotein complexes with enhanced off-target discrimination thresholds. Demonstrates high in-vivo editing efficiencies in human embryonic cell lines with packaging suitability for single-AAV payload delivery.',
    typeMeta: {
      citationCount: '159 citations',
      doi: '10.1038/s41587-023-01982-w',
      pages: '18 pages'
    },
    qa: [
      {
        q: 'Why is Cas12f significant compared to SpCas9?',
        a: 'Cas12f is less than half the molecular weight of SpCas9 (~400-500 amino acids vs. ~1368), allowing full packaging inside single adeno-associated virus (AAV) capsids alongside regulatory elements.'
      },
      {
        q: 'Are guide RNA sequences published?',
        a: 'Complete gRNA library sequences and high-throughput cleavage profiling assays are included in the supplementary Open Data deposit.'
      }
    ]
  },

  // --- DATASETS ---
  {
    id: 'res-dataset-1',
    type: 'dataset',
    title: 'Global Climate Adaptation & Urban Heat Island Telemetry Index',
    source: 'zenodo',
    year: 2024,
    license: 'ODC-By-1.0',
    authors: ['EcoSyz Public Data Lab', 'Urban Resilience Consortium'],
    tags: ['climate-change', 'geospatial', 'urban-planning', 'remote-sensing'],
    url: 'https://zenodo.org/record/8492019',
    description: 'High-resolution thermal infrared radiometric readings and land surface temperature (LST) records across 420 metropolitan areas worldwide from 2014 to 2024. Calibrated against MODIS and Landsat-9 surface reflectance baselines.',
    typeMeta: {
      format: 'Parquet / GeoTIFF',
      size: '14.2 GB',
      coverage: '420 Global Cities (10 Years)'
    },
    qa: [
      {
        q: 'What spatial resolution is provided?',
        a: 'Urban surface layers are gridded at 30-meter ground resolution, with hourly temporal interpolations for 120 key climate monitoring hubs.'
      },
      {
        q: 'What tools can read this dataset?',
        a: 'Formatted as GeoParquet and Cloud-Optimized GeoTIFFs (COG), directly queryable via DuckDB, GDAL, QGIS, and GeoPandas.'
      }
    ]
  },
  {
    id: 'res-dataset-2',
    type: 'dataset',
    title: 'Multimodal Indic Language Speech Corpus for Low-Resource AI',
    source: 'hfdatasets',
    year: 2023,
    license: 'CC-BY-SA-4.0',
    authors: ['Open Language Collective'],
    tags: ['NLP', 'speech-recognition', 'multilingual', 'machine-learning'],
    url: 'https://huggingface.co/datasets/open-language/indic-speech-corpus',
    description: 'Over 12,000 hours of validated acoustic speech recordings across 18 regional Indic dialects with phonetic alignments, native orthographic transcriptions, and speaker demographic metadata.',
    typeMeta: {
      format: 'FLAC / JSONL',
      size: '280 GB',
      coverage: '18 Dialects / 12,400 Hours'
    },
    qa: [
      {
        q: 'How was the audio validated?',
        a: 'Every audio segment underwent dual-blind human verification for acoustic clarity, phonetic alignment accuracy, and dialect authenticity.'
      },
      {
        q: 'Can this be used for commercial TTS models?',
        a: 'The dataset is shared under CC-BY-SA-4.0, which allows commercial model training provided derived weights or datasets preserve share-alike provisions.'
      }
    ]
  },
  {
    id: 'res-dataset-3',
    type: 'dataset',
    title: 'Atmospheric Carbon Flux & Eddy Covariance Telemetry (2018–2024)',
    source: 'dataverse',
    year: 2024,
    license: 'CC0 Public Domain',
    authors: ['Global Biosphere Observatory'],
    tags: ['carbon-flux', 'climate-change', 'sensor-telemetry', 'ecology'],
    url: 'https://dataverse.harvard.edu/dataset.xhtml?persistentId=doi:10.7910/DVN/CRBFLX',
    description: 'Raw and quality-screened half-hourly measurements of carbon dioxide, water vapor, and latent heat fluxes collected from 64 terrestrial eddy covariance flux towers across temperate and tropical biome biotypes.',
    typeMeta: {
      format: 'NetCDF / CSV',
      size: '48.6 GB',
      coverage: '64 Terrestrial Towers'
    },
    qa: [
      {
        q: 'What standard conventions are followed?',
        a: 'Complies with FLUXNET2015 and CF-1.8 NetCDF conventions with full automated gap-filling and friction velocity (uStar) filtering flags.'
      }
    ]
  },
  {
    id: 'res-dataset-4',
    type: 'dataset',
    title: 'Autonomous Navigation Multi-Sensor Benchmark in Harsh Weather',
    source: 'datacite',
    year: 2023,
    license: 'CC-BY-4.0',
    authors: ['Autonomous Mobility Lab', 'ETH Zurich Robotics'],
    tags: ['robotics', 'lidar', 'autonomous-systems', 'neural-networks'],
    url: 'https://doi.org/10.3929/ethz-b-000612984',
    description: 'Calibrated synchronized data from 128-beam LiDAR, dual stereoscopic 4K cameras, and 4D imaging radar gathered during heavy snowfall, blizzard conditions, and dense fog across 1,800 km of suburban and mountain routes.',
    typeMeta: {
      format: 'ROS2 Bag / HDF5',
      size: '1.2 TB',
      coverage: '1,800 km Harsh Weather Routes'
    },
    qa: [
      {
        q: 'Are ground truth bounding boxes included?',
        a: 'Yes, 3D oriented bounding boxes for vehicles, pedestrians, snow berms, and road borders with unique temporal tracking IDs.'
      }
    ]
  },

  // --- CODE ---
  {
    id: 'res-code-1',
    type: 'code',
    title: 'OpenStudio Next.js 14 & Supabase Scaffold Template',
    source: 'github',
    year: 2024,
    license: 'MIT',
    authors: ['Open Idea Labs', 'Core Contributor Team'],
    tags: ['nextjs', 'react', 'full-stack', 'open-source', 'studio'],
    url: 'https://github.com/open-idea/open-studio-template',
    description: 'Production-ready starter boilerplate featuring Server Components, streaming SSR, Supabase Row-Level Security auth patterns, modular CSS tokens, and zero vendor lock-in build configurations.',
    typeMeta: {
      language: 'TypeScript',
      stars: '4.8k',
      forks: '620'
    },
    qa: [
      {
        q: 'What databases are supported out of the box?',
        a: 'Standard PostgreSQL via Supabase client, with clean migration templates for self-hosted Postgres, Prisma, and Drizzle ORM.'
      },
      {
        q: 'Does it support dark mode?',
        a: 'Yes, includes a unified CSS token architecture that toggles light and dark modes with automatic system preference detection.'
      }
    ]
  },
  {
    id: 'res-code-2',
    type: 'code',
    title: 'Q-Simulator: Distributed Tensor Network Quantum Circuit Engine',
    source: 'gitlab',
    year: 2023,
    license: 'Apache-2.0',
    authors: ['Quantum Computing Systems Group'],
    tags: ['quantum-computing', 'tensor-networks', 'simulation', 'rust'],
    url: 'https://gitlab.com/q-systems/q-simulator',
    description: 'High-performance Rust framework for contracting large-scale tensor networks representing quantum circuits up to 64 entangled qubits. Features automatic contraction path optimization via graph hyper-partitioning.',
    typeMeta: {
      language: 'Rust',
      stars: '1.9k',
      forks: '184'
    },
    qa: [
      {
        q: 'How does it compare to Qiskit Aer?',
        a: 'For low-depth circuits with local 2D entangling topologies, tensor network contraction achieves up to 10x faster execution than state-vector simulation.'
      }
    ]
  },
  {
    id: 'res-code-3',
    type: 'code',
    title: 'MeshTelemetry: Lightweight Microcontroller Sensor Gossip Protocol',
    source: 'codeberg',
    year: 2024,
    license: 'GPL-3.0',
    authors: ['Free Hardware Alliance'],
    tags: ['mesh-networking', 'IoT', 'embedded', 'robotics', 'hardware'],
    url: 'https://codeberg.org/fha/mesh-telemetry',
    description: 'Self-healing, multi-hop broadcast networking protocol tailored for ESP32 and nRF52 microcontrollers. Operates over sub-GHz LoRa and 2.4GHz BLE with battery lifetime exceeding 24 months on a single 18650 cell.',
    typeMeta: {
      language: 'C / C++',
      stars: '840',
      forks: '95'
    },
    qa: [
      {
        q: 'What is the maximum hop count?',
        a: 'Supports up to 16 network hops with deterministic packet deduplication and cryptographically signed payload headers.'
      }
    ]
  },
  {
    id: 'res-code-4',
    type: 'code',
    title: 'BioCRISPR-Sim: In-Silico Off-Target Binding Prediction Pipeline',
    source: 'github',
    year: 2023,
    license: 'BSD-3-Clause',
    authors: ['Open Bioengineering Group'],
    tags: ['CRISPR', 'bioinformatics', 'python', 'molecular-biology'],
    url: 'https://github.com/open-bioeng/biocrispr-sim',
    description: 'End-to-end Python package computing binding thermodynamics and cleavage probabilities for Cas9, Cas12a, and Cas12f guide sequences against whole-genome FASTA indexes in under 3 minutes.',
    typeMeta: {
      language: 'Python',
      stars: '2.3k',
      forks: '310'
    },
    qa: [
      {
        q: 'Does it require specialized GPU acceleration?',
        a: 'Runs on standard multi-core CPUs via SIMD vectorization, with optional PyTorch CUDA kernels for batch genome-wide screens.'
      }
    ]
  },

  // --- MODELS ---
  {
    id: 'res-model-1',
    type: 'model',
    title: 'Aether-7B-Dense: Open-Weights Bilingual Reasoning Foundation Model',
    source: 'huggingface',
    year: 2024,
    license: 'Apache-2.0',
    authors: ['Open Alignment Collective'],
    tags: ['machine-learning', 'LLM', 'open-weights', 'neural-networks'],
    url: 'https://huggingface.co/open-alignment/aether-7b-dense',
    description: '7-billion parameter dense autoregressive model trained on 3.2 trillion tokens of curated open scientific literature, code repositories, and mathematical proofs. Demonstrates exceptional reasoning performance on GSM8k and HumanEval.',
    typeMeta: {
      pipeline: 'text-generation',
      parameters: '7.24B',
      contextWindow: '32k tokens'
    },
    qa: [
      {
        q: 'What precision formats are published?',
        a: 'Full FP16 weights, BF16 checkpoints, and quantized 4-bit / 8-bit GGUF files for local llama.cpp execution on consumer hardware.'
      },
      {
        q: 'Is the pre-training dataset disclosed?',
        a: 'The full token mix taxonomy and data filtering scripts are openly available on Hugging Face Datasets.'
      }
    ]
  },
  {
    id: 'res-model-2',
    type: 'model',
    title: 'AgriSense-Vision-v2: Multi-Spectral Crop Disease Segmentation Model',
    source: 'huggingface',
    year: 2023,
    license: 'MIT',
    authors: ['Agrisense AI Working Group'],
    tags: ['computer-vision', 'neural-networks', 'agriculture', 'edge-computing'],
    url: 'https://huggingface.co/agrisense/vision-v2-segmenter',
    description: 'Lightweight convolutional transformer model capable of segmenting 38 common leaf pathologies, nitrogen deficiencies, and hydric stress patterns from drone and smartphone RGB-NIR imagery.',
    typeMeta: {
      pipeline: 'image-segmentation',
      parameters: '24.1M',
      latency: '18ms (Edge TPU)'
    },
    qa: [
      {
        q: 'Can this model run offline on field devices?',
        a: 'Yes, quantized INT8 models execute in real time on Raspberry Pi 5, Coral Edge TPU, and Jetson Nano boards without an internet connection.'
      }
    ]
  },
  {
    id: 'res-model-3',
    type: 'model',
    title: 'NeuroVoice-Flow: Real-Time Flow-Matching Text-to-Speech Engine',
    source: 'huggingface',
    year: 2024,
    license: 'Apache-2.0',
    authors: ['Acoustic Intelligence Lab'],
    tags: ['audio-synthesis', 'voice-ai', 'machine-learning', 'flow-matching'],
    url: 'https://huggingface.co/acoustic-ai/neurovoice-flow',
    description: 'Continuous normalizing flow acoustic model yielding natural, artifact-free speech synthesis with zero-shot voice cloning capabilities from a 3-second reference audio clip.',
    typeMeta: {
      pipeline: 'text-to-speech',
      parameters: '82M',
      sampleRate: '24kHz'
    },
    qa: [
      {
        q: 'Does it support streaming generation?',
        a: 'Yes, first-chunk audio synthesis latency is below 110ms on an Apple M-series or modern x86 CPU.'
      }
    ]
  },

  // --- HARDWARE ---
  {
    id: 'res-hardware-1',
    type: 'hardware',
    title: 'OpenLab Spectrometer v3: 3D-Printable Optical Diagnostic Tool',
    source: 'oshwa',
    year: 2023,
    license: 'CERN-OHL-S-v2',
    authors: ['Dr. Kevin Miller', 'Open Science Hardware Alliance'],
    tags: ['open-hardware', 'optics', 'laboratory-tools', 'scientific-instruments'],
    url: 'https://certification.oshwa.org/us000412.html',
    description: 'Fully open-source visible light absorption spectrometer utilizing an off-the-shelf Sony CMOS line sensor and a 1000 lines/mm holographic diffraction grating. Achieves 1.8nm spectral resolution from 380nm to 750nm.',
    typeMeta: {
      certId: 'OSHWA US000412',
      cadFormat: 'STEP / FreeCAD',
      billOfMaterials: '$48 total BOM cost'
    },
    qa: [
      {
        q: 'What manufacturing methods are required?',
        a: 'The optical chassis is designed for standard FDM 3D printing in black PLA/PETG. The PCB is a 2-layer board that can be ordered from any rapid fab house.'
      },
      {
        q: 'How is it calibrated?',
        a: 'Includes an automated Python calibration utility using compact fluorescent lamp (CFL) mercury emission peaks.'
      }
    ]
  },
  {
    id: 'res-hardware-2',
    type: 'hardware',
    title: 'AeroDrone-Core: Modular Autonomous Avionics Carrier Board',
    source: 'ohwr',
    year: 2024,
    license: 'CERN-OHL-W-v2',
    authors: ['Open Avionics Consortium'],
    tags: ['robotics', 'flight-controller', 'drones', 'embedded'],
    url: 'https://ohwr.org/project/aerodrone-core',
    description: 'Triple-redundant IMU flight computer motherboard supporting PX4 Autopilot and ArduPilot. Features galvanic isolation, high-current power distribution, and dual CAN-bus interfaces for autonomous agricultural and surveying drones.',
    typeMeta: {
      certId: 'CERN OHWR v2.1',
      cadFormat: 'KiCad 8.0',
      interfaces: 'Dual CAN, 8x PWM, Ethernet'
    },
    qa: [
      {
        q: 'Is the board flight-proven?',
        a: 'Over 400 flight hours documented across quadrotor, hexacopter, and fixed-wing experimental aircraft.'
      }
    ]
  },
  {
    id: 'res-hardware-3',
    type: 'hardware',
    title: 'SolarMesh Node: IP67 Field-Deployable Agricultural Sensor Hub',
    source: 'thingiverse',
    year: 2023,
    license: 'CC-BY-SA-4.0',
    authors: ['AgriTech Collective'],
    tags: ['sensor-hardware', 'solar', 'climate-change', 'open-hardware'],
    url: 'https://thingiverse.com/thing:5928104',
    description: 'Weatherproof enclosure, MPPT solar charger circuit, and sensor interface expansion shield for continuous telemetry in open-field soil moisture, leaf wetness, and ambient microclimate monitoring.',
    typeMeta: {
      certId: 'Design Reg #59281',
      cadFormat: 'STEP / STL / Gerber',
      rating: 'IP67 Sealed Enclosure'
    },
    qa: [
      {
        q: 'What battery chemistry does it use?',
        a: 'Configured for standard Lithium Iron Phosphate (LiFePO4) 18650 cells for safe outdoor operating temperatures from -20°C to +60°C.'
      }
    ]
  },

  // --- VIDEOS ---
  {
    id: 'res-video-1',
    type: 'video',
    title: 'Quantum Error Correction & Surface Codes Explained From First Principles',
    source: 'youtube',
    year: 2024,
    license: 'CC-BY-3.0',
    authors: ['Prof. Angela Vance'],
    tags: ['quantum-computing', 'physics', 'lecture', 'mathematics'],
    url: 'https://youtube.com/watch?v=open-quantum-lec-04',
    description: 'Comprehensive graduate lecture breaking down the stabilizer formalism, syndrome measurement cycles, and minimum-weight perfect matching decoding algorithms in planar surface codes.',
    typeMeta: {
      duration: '48m 12s',
      channel: 'Open Quantum Institute',
      views: '64k views'
    },
    qa: [
      {
        q: 'Are lecture notes and problem sets provided?',
        a: 'Complete LaTeX lecture notes, Jupyter decoding notebooks, and problem solutions are linked in the video repository description.'
      }
    ]
  },
  {
    id: 'res-video-2',
    type: 'video',
    title: 'Deep Reinforcement Learning for Legged Locomotion: Sim-to-Real Transfer',
    source: 'youtube',
    year: 2023,
    license: 'Open Access',
    authors: ['Dr. Kenji Sato'],
    tags: ['robotics', 'reinforcement-learning', 'locomotion', 'neural-networks'],
    url: 'https://youtube.com/watch?v=robotics-sim-to-real-23',
    description: 'A technical workshop covering domain randomization, policy distillation, and actuator dynamics modeling to transfer quadruped locomotion policies from GPU simulators to physical robots without fine-tuning.',
    typeMeta: {
      duration: '36m 45s',
      channel: 'Open Robotics Consortium',
      views: '112k views'
    },
    qa: [
      {
        q: 'What simulator does this lecture demonstrate?',
        a: 'The walkthrough uses Isaac Gym with PyTorch tensorized environments running 4,096 parallel quadrupeds on a single workstation GPU.'
      }
    ]
  },
  {
    id: 'res-video-3',
    type: 'video',
    title: 'CRISPR-Cas Structure & Off-Target Profiling Mechanics',
    source: 'youtube',
    year: 2024,
    license: 'CC-BY-4.0',
    authors: ['BioMolecular Video Archive'],
    tags: ['CRISPR', 'genomics', 'molecular-biology', 'biotechnology'],
    url: 'https://youtube.com/watch?v=crispr-cas-mechanics-24',
    description: 'Cryo-EM structural walkthrough showing the conformational activation of the Cas RuvC nuclease domain upon target strand hybridization, detailing guide RNA mismatch tolerances at the PAM-distal end.',
    typeMeta: {
      duration: '29m 10s',
      channel: 'Structural Biology Channel',
      views: '41k views'
    },
    qa: [
      {
        q: 'Which Cas variants are analyzed?',
        a: 'Covers structural comparisons between Cas9, Cas12a, Cas12f, and engineered high-fidelity SpCas9-HF1 enzymes.'
      }
    ]
  }
];

// Helper to filter resources locally
export function filterResources({ query = '', category = 'all' }) {
  const q = query.toLowerCase().trim();

  return MOCK_RESOURCES.filter((res) => {
    // 1. Category match
    if (category !== 'all' && res.type !== category) {
      return false;
    }

    // 2. Query match
    if (!q) return true;

    const matchesTitle = res.title.toLowerCase().includes(q);
    const matchesDescription = res.description.toLowerCase().includes(q);
    const matchesSource = res.source.toLowerCase().includes(q);
    const matchesAuthors = res.authors.some(a => a.toLowerCase().includes(q));
    const matchesTags = res.tags.some(t => t.toLowerCase().includes(q));

    return matchesTitle || matchesDescription || matchesSource || matchesAuthors || matchesTags;
  });
}

// Predefined mock responses for the Research Assistant
export function getAssistantResponse(promptType, activeResults, customText = '') {
  const count = activeResults.length;
  const categories = [...new Set(activeResults.map(r => r.type))];

  if (promptType === 'compare') {
    return {
      title: 'Cross-Resource Synthesis',
      content: `Analyzing the **${count} visible resources** across ${categories.join(', ')} categories:\n\n` +
        `• **Theoretical Foundations vs. Practical Artifacts:** The collection balances peer-reviewed empirical papers (such as decentralized intelligence and low-power transformers) with direct open-source implementations (e.g., Rust simulators and embedded C mesh protocols).\n` +
        `• **Permissive Open Licensing:** Over 85% of these resources adopt permissive standard licenses (MIT, Apache-2.0, and CC-BY-4.0), making them interoperable for downstream open innovation without restrictive copyright friction.\n` +
        `• **Modular Integration:** Most code and model assets expose standardized API layers (PyTorch, ONNX, and Next.js) compatible with the datasets provided in Parquet and GeoTIFF formats.`
    };
  }

  if (promptType === 'summarize') {
    return {
      title: 'Core Research Themes',
      content: `Here is a consolidated summary of the **${count} filtered resources**:\n\n` +
        `1. **Edge-First & Resource-Constrained Architectures:** A distinct emphasis on running machine learning, mesh networking, and sensor analytics on low-power, field-deployable hardware.\n` +
        `2. **Empirical Open Verification:** Transparent publication of benchmark datasets (climate adaptation, Indic speech, and harsh-weather LiDAR) to enable reproducible external validation.\n` +
        `3. **Physical-Digital Convergence:** Strong representation of physical open hardware blueprints (spectrometers, solar sensor hubs, avionics boards) paired with real-time software telemetry pipelines.`
    };
  }

  if (promptType === 'approaches') {
    return {
      title: 'Common Methodologies',
      content: `Across the active research assets, three recurring methodologies stand out:\n\n` +
        `• **Zero-Shot & Sparse Modeling:** Prioritizing computational efficiency over brute-force parameters (e.g., sparse attention kernels in papers, diffusion primitives in robotics).\n` +
        `• **Open Standards Compliance:** Datasets conform to Open Data Commons and CF-1.8 NetCDF conventions, while hardware carries formal OSHWA and CERN Open Hardware certifications.\n` +
        `• **Asynchronous Collaboration:** Protocols and architectures assume decentralized, peer-to-peer topologies rather than monolithic single-vendor infrastructure.`
    };
  }

  // Fallback for custom user input
  return {
    title: 'Research Assistant Assessment',
    content: `Regarding **"${customText.trim()}"** across your active search (${count} resources indexed):\n\n` +
      `The visible catalog contains relevant foundational work in ${categories.map(c => c.toUpperCase()).join(' & ')}. ` +
      `You can inspect individual entries on the left to review verified abstracts, run inline Q&A queries against specific papers, or jump directly to original repositories via the "Open" action.`
  };
}
