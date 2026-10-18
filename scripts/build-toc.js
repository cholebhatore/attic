const fs = require('fs');
const path = require('path');

const curriculum = [
  {
    group: 'Pre-requisites',
    phases: [
      {
        id: 'phase-0',
        number: 'Phase 0',
        title: 'Python Stack & Backend Architecture',
        description:
          'Backend Python for AI services: language mechanics, uv dependency management, Pydantic validation contracts, SQLAlchemy 2.0 models, and Alembic migrations.',
        folder: 'content/docs/ai/python',
        status: 'written',
        topics: [
          {
            id: 'p0-overview',
            title: 'Overview',
            url: '/ai/python',
            desc: 'Language mechanics, execution model, type hints, modern uv tooling, and backend architecture.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p0-package-management',
            title: 'Package Management with uv',
            url: '/ai/python/package-management',
            desc: 'High-speed dependency resolution with uv, virtual environments, lockfiles, and pyproject.toml configuration.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p0-fundamentals-overview',
            title: 'Fundamentals: Overview',
            url: '/ai/python/fundamentals',
            desc: 'Core language primitives, execution model, and memory behavior for high-throughput AI services.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p0-data-structures',
            title: 'Fundamentals: Data Structures',
            url: '/ai/python/fundamentals/data-structures',
            desc: 'Built-in collections, dict hashing internals, set operations, list vs tuple memory layout, and comprehensions.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p0-control-flow',
            title: 'Fundamentals: Control Flow',
            url: '/ai/python/fundamentals/control-flow',
            desc: 'Structural pattern matching (match/case), iteration protocols, generator pipelines, and exception handling.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p0-functions-typing',
            title: 'Fundamentals: Functions & Typing',
            url: '/ai/python/fundamentals/functions-and-typing',
            desc: 'Type hints, Callable, Generics, typing.Annotated, variable scopes, closures, and custom decorators.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p0-classes-oop',
            title: 'Fundamentals: Classes & Architecture',
            url: '/ai/python/fundamentals/classes-and-oop',
            desc: 'Dunder methods, dataclasses, protocols, inheritance vs composition, and object lifecycle.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p0-database-overview',
            title: 'Databases: Overview',
            url: '/ai/python/database',
            desc: 'Relational and document persistence architectures for modern production AI applications.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p0-schemas-models',
            title: 'Databases: Schemas vs Models',
            url: '/ai/python/database/schemas-and-models',
            desc: 'Pydantic v2 validation contracts vs database models, data serialization, and schema boundaries.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p0-orms-odms',
            title: 'Databases: ORMs and ODMs',
            url: '/ai/python/database/orms-and-odms',
            desc: 'SQLAlchemy 2.0 mapped columns, async sessions, relationship loading strategies, and unit of work.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p0-alembic-migrations',
            title: 'Databases: Alembic Migrations',
            url: '/ai/python/database/alembic-migrations',
            desc: 'Schema revision tracking, autogenerate migrations, zero-downtime upgrades, and rollback verification.',
            status: 'written',
            interview: false,
          },
        ],
      },
    ],
  },
  {
    group: 'Foundations',
    phases: [
      {
        id: 'phase-1',
        number: 'Phase 1',
        title: 'Mathematical Foundations & Core AI Intuitions',
        description:
          'Formulate deep geometric and analytical intuition for high-dimensional vector spaces, multivariate optimization, and information theory.',
        folder: 'content/docs/ai/math-foundations',
        status: 'written',
        topics: [
          {
            id: 'p1-overview',
            title: 'Overview',
            url: '/ai/math-foundations',
            desc: 'Roadmap of linear algebra, multivariate calculus, optimization dynamics, and computational graphs.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p1-vectors-matrices',
            title: 'Vectors and Matrices',
            url: '/ai/math-foundations/vectors-and-matrices',
            desc: 'Unit vectors, basis vectors, rank, invertibility, linear transformations, SVD, and eigen-decomposition.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p1-similarity-norms',
            title: 'Similarity and Norms',
            url: '/ai/math-foundations/similarity-and-norms',
            desc: 'Projections, dot products, Cosine similarity, L1 Manhattan (Lasso) vs L2 Euclidean (Ridge) norms.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p1-derivatives-gradients',
            title: 'Derivatives and Gradients',
            url: '/ai/math-foundations/derivatives-and-gradients',
            desc: 'Partial derivatives, chain rule across nested composite functions, Jacobian vectors, directional derivatives.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p1-tensor-broadcasting',
            title: 'Tensor Broadcasting',
            url: '/ai/math-foundations/tensor-broadcasting',
            desc: 'Implicit dimension expansion rules, stride manipulation, and memory-efficient zero-copy vectorization.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p1-softmax-logits',
            title: 'Softmax Probabilities & Logits',
            url: '/ai/math-foundations/softmax-and-logits',
            desc: 'Mapping raw unnormalized logits to probabilities, temperature scaling, and log-sum-exp numerical stability.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p1-information-loss',
            title: 'Information Theory & Loss Functions',
            url: '/ai/math-foundations/information-the-and-loss',
            desc: 'Shannon entropy, Cross-Entropy Loss, Kullback-Leibler (KL) Divergence, and Perplexity in language models.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p1-backprop-scratch',
            title: 'Backprop in Python from Scratch',
            url: '/ai/math-foundations/backprop-from-scratch',
            desc: 'Building a directed acyclic computational graph (DAG) and reverse-mode automatic differentiation in pure NumPy.',
            status: 'written',
            interview: false,
          },
        ],
      },
      {
        id: 'phase-2',
        number: 'Phase 2',
        title: 'Deep Learning Frameworks & PyTorch 2.x Stack',
        description:
          'Translate mathematical arrays into GPU-accelerated computational graphs, automatic mixed precision, and high-throughput data pipelines.',
        folder: 'content/docs/ai/pytorch',
        status: 'written',
        topics: [
          {
            id: 'p2-overview',
            title: 'Overview',
            url: '/ai/pytorch',
            desc: 'Architecture of modern PyTorch 2.x: eager mode, autograd, torch.compile, and distributed pipelines.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p2-tensor-fundamentals',
            title: 'PyTorch Tensor Fundamentals',
            url: '/ai/pytorch/tensor-fundamentals',
            desc: 'Data types (float32, float16, bfloat16, int8), device allocation, memory layout, strides, and contiguity.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p2-indexing-shapes',
            title: 'Indexing and Shapes',
            url: '/ai/pytorch/indexing-and-shapes',
            desc: 'Boolean masking, fancy indexing, flatten, reshape, contiguous vs non-contiguous view, squeeze, and unsqueeze.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p2-combining-permuting',
            title: 'Combining & Permuting Tensors',
            url: '/ai/pytorch/combining-and-permuting',
            desc: 'cat, stack, transpose, permute, and expressive declarative einops tensor transformations.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p2-matrix-multiplication',
            title: 'Matrix Multiplication Mechanics',
            url: '/ai/pytorch/matrix-multiplication',
            desc: 'Hadamard element-wise products (*) vs batched matrix multiplication (@, torch.matmul, torch.bmm, torch.einsum).',
            status: 'written',
            interview: false,
          },
          {
            id: 'p2-autograd-engine',
            title: 'PyTorch Autograd Engine',
            url: '/ai/pytorch/autograd-engine',
            desc: 'Dynamic computational graphs, requires_grad, .backward(), gradient accumulation, and torch.no_grad().',
            status: 'written',
            interview: false,
          },
          {
            id: 'p2-devices-precision',
            title: 'GPU vs CPU & Precision Formats',
            url: '/ai/pytorch/devices-and-precision',
            desc: 'Device placement, pinned host memory, FP32 vs FP16 loss scaling vs BF16 dynamic range, AMP, and torch.compile.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p2-training-loop',
            title: 'Canonical Training Harness',
            url: '/ai/pytorch/training-loop',
            desc: 'Implementing the standard 5-step PyTorch training and validation harness with nn.Module.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p2-data-pipelines',
            title: 'High-Throughput Data Pipelines',
            url: '/ai/pytorch/data-pipelines',
            desc: 'Custom Dataset classes, multi-worker DataLoader prefetching, pin_memory, and WebDataset sharded streaming.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p2-checkpointing',
            title: 'Save, Restore & Checkpointing',
            url: '/ai/pytorch/checkpointing',
            desc: 'Model and optimizer state_dict management, checkpoint resume, and Safetensors zero-copy serialization.',
            status: 'written',
            interview: false,
          },
        ],
      },
      {
        id: 'phase-3',
        number: 'Phase 3',
        title: 'Neural Networks from Scratch & Optimization Dynamics',
        description:
          'Strip away framework abstractions to build forward passes, normalization layers, and adaptive optimizers from raw math.',
        folder: 'content/docs/ai/neural-networks',
        status: 'written',
        topics: [
          {
            id: 'p3-overview',
            title: 'Overview',
            url: '/ai/neural-networks',
            desc: 'Deconstructing deep neural nets into foundational linear and non-linear mathematical operations.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p3-neurons-activations',
            title: 'Neurons and Activations',
            url: '/ai/neural-networks/neurons-and-activations',
            desc: 'Affine transformations (z = Wx + b) and non-linear activations: ReLU, Leaky ReLU, GELU, and modern SiLU/SwiGLU.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p3-layers-initialization',
            title: 'Layers and Weight Initialization',
            url: '/ai/neural-networks/layers-and-initialization',
            desc: 'Vectorized dense layers, variance preservation across forward/backward passes, Xavier/Glorot, He/Kaiming init.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p3-mlp-scratch',
            title: 'MLP from Scratch',
            url: '/ai/neural-networks/mlp-from-scratch',
            desc: 'Multi-layer perceptron architecture, forward activation caching, and analytical backpropagation gradients.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p3-normalization',
            title: 'BatchNorm vs LayerNorm & RMSNorm',
            url: '/ai/neural-networks/normalization',
            desc: 'Internal covariate shift, why LayerNorm dominates sequence models, and RMSNorm speed optimizations in modern LLMs.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p3-lr-schedules',
            title: 'Learning Rate Schedules & Warmup',
            url: '/ai/neural-networks/lr-schedules',
            desc: 'Linear warmup phases, step decay, and Cosine Annealing schedules for stable convergence.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p3-optimizers',
            title: 'Adam & AdamW Optimizers',
            url: '/ai/neural-networks/optimizers',
            desc: 'First and second moment estimation (momentum + RMSprop), bias correction, and decoupled weight decay.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p3-hyperparameter-search',
            title: 'Hyperparameter Search',
            url: '/ai/neural-networks/hyperparameter-search',
            desc: 'Grid search, random search, and Bayesian optimization pruning with Optuna and Ray Tune.',
            status: 'written',
            interview: false,
          },
        ],
      },
      {
        id: 'phase-4',
        number: 'Phase 4',
        title: 'Classical Deep Learning — Vision, Interpretability & Sequences',
        description:
          'Master spatial convolutions, recurrent memory, internal activation auditing, and input-gradient manipulation.',
        folder: 'content/docs/ai/classical-deep-learning',
        status: 'written',
        topics: [
          {
            id: 'p4-overview',
            title: 'Overview',
            url: '/ai/classical-deep-learning',
            desc: 'Evolution from convolutional vision and recurrent sequential networks to attention foundations.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p4-convolutions',
            title: 'Convolutions & Spatial Filters',
            url: '/ai/classical-deep-learning/convolutions',
            desc: 'Spatial kernels, stride, padding, pooling, channels, and receptive field expansion across layers.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p4-vision-architectures',
            title: 'Vision Architectures & Residual Skips',
            url: '/ai/classical-deep-learning/vision-architectures',
            desc: 'CIFAR-10 training pipeline, ResNet residual skip connections, Inception 1x1 convolutions, and timm.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p4-transfer-ensembles',
            title: 'Transfer Learning, Ensembles & Video',
            url: '/ai/classical-deep-learning/transfer-and-ensembles',
            desc: 'Backbone feature freezing (requires_grad = False), task adaptation heads, logit averaging, 5D video tensors.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p4-interpretability',
            title: 'Interpretability & Feature Maps',
            url: '/ai/classical-deep-learning/interpretability',
            desc: 'PyTorch forward/backward hooks (register_forward_hook), activation maps, saliency maps, and Grad-CAM.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p4-gradient-art',
            title: 'Gradient Manipulation & Attacks',
            url: '/ai/classical-deep-learning/gradient-art',
            desc: 'Input pixel optimization (x.requires_grad = True), FGSM/PGD adversarial attacks, Deep Dream, and Style Transfer.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p4-recurrent-networks',
            title: 'RNNs & LSTMs',
            url: '/ai/classical-deep-learning/recurrent-networks',
            desc: 'Recurrent hidden states, vanishing/exploding gradients in BPTT, gradient clipping, LSTM gating mechanisms.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p4-classical-nlp',
            title: 'Classical NLP & Seq2Seq',
            url: '/ai/classical-deep-learning/classical-nlp',
            desc: 'Word2Vec, GloVe embeddings, Seq2Seq encoder-decoder, and the fixed-vector information bottleneck.',
            status: 'written',
            interview: false,
          },
        ],
      },
    ],
  },
  {
    group: 'Architecture',
    phases: [
      {
        id: 'phase-5',
        number: 'Phase 5',
        title: 'The Transformer Architecture',
        description:
          'Master self-attention internals, forward-pass mechanics, positional encodings, and encoder vs decoder paradigms.',
        folder: 'content/docs/ai/transformers',
        status: 'written',
        topics: [
          {
            id: 'p5-overview',
            title: 'Overview',
            url: '/ai/transformers',
            desc: 'Deep architectural breakdown of Attention Is All You Need and modern transformer blocks.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p5-attention-internals',
            title: 'Attention Mechanism & Q, K, V',
            url: '/ai/transformers/attention-internals',
            desc: 'Overcoming Seq2Seq bottlenecks; geometric intuition of Query, Key, Value projections; sqrt(d_k) scaling proof.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p5-masking-multihead',
            title: 'Causal Masking & Multi-Head Attention',
            url: '/ai/transformers/masking-and-multihead',
            desc: 'Upper-triangular -inf causal masks, autoregressive safety, Multi-Head Attention subspace projections.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p5-blocks-positions',
            title: 'Blocks, Positions & Skip Connections',
            url: '/ai/transformers/blocks-and-positions',
            desc: 'Position-wise MLP blocks as KV memories, residual gradient highways, Sinusoidal vs Learned vs RoPE embeddings.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p5-architectures',
            title: 'Encoder vs Decoder & Forward Pass',
            url: '/ai/transformers/architectures',
            desc: 'Encoder-only (BERT) vs Decoder-only (GPT) vs Encoder-Decoder (T5); step-by-step decoder forward pass.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p5-gpt-scratch',
            title: 'GPT from Scratch',
            url: '/ai/transformers/gpt-from-scratch',
            desc: 'Complete autoregressive character/BPE-level Transformer language model built in PyTorch.',
            status: 'written',
            interview: false,
          },
        ],
      },
      {
        id: 'phase-6',
        number: 'Phase 6',
        title: 'Frontier LLMs from Scratch',
        description:
          'Bridge from vanilla transformers to 2025/2026 frontier architectures, tokenization mechanics, and decoding strategies.',
        folder: 'content/docs/ai/llm',
        status: 'written',
        topics: [
          {
            id: 'p6-overview',
            title: 'Overview',
            url: '/ai/llm',
            desc: 'Frontier LLM architectural revolution from Llama 4, DeepSeek-V3, and Qwen 3.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p6-what-is-an-llm',
            title: 'What is an LLM',
            url: '/ai/llm/what-is-an-llm',
            desc: 'Next-token prediction objective, cross-entropy training, emerging capabilities, and compute scaling.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p6-foundation-models',
            title: 'Foundation Models & Open Weights',
            url: '/ai/llm/foundation-models',
            desc: 'Paradigm shift from task-training to adaptation; Open-weights vs Closed-source cost, latency, privacy trade-offs.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p6-inference-lifecycle',
            title: 'Inside ChatGPT (Request Lifecycle)',
            url: '/ai/llm/inference-lifecycle',
            desc: 'End-to-end trace from submitting a prompt to tokenization, KV cache prefill, decode loop, and SSE streaming.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p6-tokenization',
            title: 'Tokenization Deep Dive',
            url: '/ai/llm/tokenization',
            desc: 'BPE, WordPiece, SentencePiece algorithms; token fragmentation cost inflation and reasoning degradation.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p6-context-windows',
            title: 'Context Window Mechanics',
            url: '/ai/llm/context-windows',
            desc: 'Quadratic attention compute O(N^2), linear KV-cache VRAM growth, RoPE base frequency extrapolation.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p6-decoding',
            title: 'Decoding Strategies & Stop Tokens',
            url: '/ai/llm/decoding',
            desc: 'Greedy, beam search, temperature scaling, top-k, top-p nucleus sampling failure modes, stop tokens vs stop sequences.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p6-attention-variants',
            title: 'Modern Attention: MQA, GQA & MLA',
            url: '/ai/llm/attention-variants',
            desc: 'Grouped-Query Attention (GQA) and Multi-Head Latent Attention (MLA) low-rank joint KV compression in DeepSeek.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p6-mixture-of-experts',
            title: 'Mixture of Experts (MoE)',
            url: '/ai/llm/mixture-of-experts',
            desc: 'Sparse expert routing, top-k gating networks, shared vs routed experts, load balancing, and expert capacity.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p6-scaling-parallelism',
            title: 'Scaling Laws & Distributed Parallelism',
            url: '/ai/llm/scaling-and-parallelism',
            desc: 'Chinchilla scaling laws, compute-optimal training, Data, Tensor, Pipeline, Sequence, and Expert Parallelism.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p6-llama-scratch',
            title: 'Llama 4 from Scratch',
            url: '/ai/llm/llama-from-scratch',
            desc: 'PyTorch implementation of modern GQA, SwiGLU, RoPE, RMSNorm, and MoE blocks.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p6-deepseek-scratch',
            title: 'DeepSeek-V3 from Scratch',
            url: '/ai/llm/deepseek-from-scratch',
            desc: 'PyTorch implementation of Multi-Head Latent Attention (MLA), auxiliary-loss-free DeepSeekMoE, and MTP.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p6-qwen-scratch',
            title: 'Qwen 3 from Scratch',
            url: '/ai/llm/qwen-from-scratch',
            desc: 'PyTorch implementation of QK-Norm, dual thinking/non-thinking modes, and dense/MoE architectures.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p6-reading-model-code',
            title: 'Reading Model Code',
            url: '/ai/llm/reading-model-code',
            desc: 'Dissecting Hugging Face modeling_*.py implementations and reproducing architectural ablations.',
            status: 'written',
            interview: false,
          },
        ],
      },
    ],
  },
  {
    group: 'Post-training',
    phases: [
      {
        id: 'phase-7',
        number: 'Phase 7',
        title: 'Post-Training, Fine-Tuning & Model Distillation',
        description:
          'Adapt base models via parameter-efficient fine-tuning (PEFT) or compress capabilities via Knowledge Distillation.',
        folder: 'content/docs/ai/fine-tuning',
        status: 'written',
        topics: [
          {
            id: 'p7-overview',
            title: 'Overview',
            url: '/ai/fine-tuning',
            desc: 'Comprehensive taxonomy of SFT, LoRA, QLoRA, DoRA, prompt tuning, and model distillation.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p7-why-fine-tune',
            title: 'Why Fine-Tune (vs RAG vs Prompting)',
            url: '/ai/fine-tuning/why-fine-tune',
            desc: 'Dynamic facts (RAG) vs behavioral alignment/formatting (Fine-Tuning), catastrophic forgetting mitigation.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p7-hf-ecosystem',
            title: 'The Hugging Face Ecosystem',
            url: '/ai/fine-tuning/hf-ecosystem',
            desc: 'Mastering transformers, datasets, accelerate, peft, trl, and unsloth for rapid training.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p7-data-preparation',
            title: 'Data Preparation & Formatting',
            url: '/ai/fine-tuning/data-preparation',
            desc: 'High-signal instruction curation, ChatML formatting, multi-turn packing, synthetic data distillation, decontamination.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p7-lora',
            title: 'LoRA & DoRA',
            url: '/ai/fine-tuning/lora',
            desc: 'Low-Rank Adaptation math (dW = B @ A), rank r, alpha scaling, target modules, DoRA magnitude/direction split.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p7-qlora',
            title: 'QLoRA (Quantized LoRA)',
            url: '/ai/fine-tuning/qlora',
            desc: '4-bit NormalFloat (NF4), double quantization, paged optimizers, and consumer GPU fine-tuning.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p7-prefix-prompt-tuning',
            title: 'Prefix Tuning vs Prompt Tuning',
            url: '/ai/fine-tuning/prefix-and-prompt-tuning',
            desc: 'Virtual tokens in all transformer layers (Prefix) vs input embedding only (Prompt); parameter count formulas.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p7-knowledge-distillation',
            title: 'Knowledge Distillation',
            url: '/ai/fine-tuning/knowledge-distillation',
            desc: 'Teacher-student distillation, dark knowledge soft labels, temperature scaling, KL divergence distillation loss.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p7-training-run',
            title: 'Training Run & Hyperparameters',
            url: '/ai/fine-tuning/training-run',
            desc: 'Learning rate warmup, gradient accumulation, sequence packing, BF16 mixed precision, FlashAttention-2.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p7-capstone',
            title: 'Capstone Fine-Tuning Projects',
            url: '/ai/fine-tuning/capstone',
            desc: 'End-to-end production capstones: medical documentation scribe, Text-to-SQL generator, classification head.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p7-merging-deployment',
            title: 'Merging Adapters & Deployment',
            url: '/ai/fine-tuning/merging-and-deployment',
            desc: 'Zero-latency LoRA weight merging into base models, regression evals, exporting to vLLM and Hugging Face.',
            status: 'written',
            interview: false,
          },
        ],
      },
      {
        id: 'phase-8',
        number: 'Phase 8',
        title: 'Reinforcement Learning & Reasoning Alignment',
        description:
          'Train policies via environmental feedback and align LLMs for preference optimization and multi-step reasoning.',
        folder: 'content/docs/ai/reinforcement-learning',
        status: 'written',
        topics: [
          {
            id: 'p8-overview',
            title: 'Overview',
            url: '/ai/reinforcement-learning',
            desc: 'From classical MDPs and policy gradients to modern RLHF, DPO, and DeepSeek-R1 GRPO/RLVR.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p8-rl-foundations',
            title: 'Reinforcement Learning Foundations',
            url: '/ai/reinforcement-learning/rl-foundations',
            desc: 'Markov Decision Processes (MDPs), state-action-reward loops, policy pi, value functions, discount factor gamma.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p8-dqn',
            title: 'Deep Q-Learning (DQN)',
            url: '/ai/reinforcement-learning/dqn',
            desc: 'Bellman optimality equation, experience replay buffers, target networks, and Q-function approximation.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p8-policy-gradients',
            title: 'Policy Gradients & REINFORCE',
            url: '/ai/reinforcement-learning/policy-gradients',
            desc: 'Policy gradient theorem, REINFORCE algorithm derivation, baseline subtraction for variance reduction.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p8-reward-models',
            title: 'Reward Models & RLHF Alignment',
            url: '/ai/reinforcement-learning/reward-models',
            desc: 'Bradley-Terry preference model, pairwise comparison loss, training reward heads, RLHF alignment pipeline.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p8-ppo',
            title: 'PPO & Advantage Estimation',
            url: '/ai/reinforcement-learning/ppo',
            desc: 'Proximal Policy Optimization, clipped surrogate objective, Generalized Advantage Estimation (GAE), KL penalty.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p8-dpo',
            title: 'Direct Preference Optimization (DPO)',
            url: '/ai/reinforcement-learning/dpo',
            desc: 'Closed-form analytical policy optimization on chosen/rejected pairs, completely bypassing reward model training.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p8-grpo',
            title: 'Group Relative Policy Optimization (GRPO)',
            url: '/ai/reinforcement-learning/grpo',
            desc: 'Eliminating the critic model by normalizing rewards across sampled group outputs in DeepSeek-R1.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p8-rlvr-reasoning',
            title: 'RLVR & Test-Time Reasoning',
            url: '/ai/reinforcement-learning/rlvr-and-reasoning',
            desc: 'Reinforcement Learning with Verifiable Rewards, rule-based test execution verifiers, test-time compute scaling.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p8-rl-frameworks',
            title: 'Production RL Frameworks',
            url: '/ai/reinforcement-learning/rl-frameworks',
            desc: 'CleanRL, Hugging Face TRL, OpenRLHF, and Verl distributed alignment architectures.',
            status: 'written',
            interview: false,
          },
        ],
      },
    ],
  },
  {
    group: 'Production',
    phases: [
      {
        id: 'phase-9',
        number: 'Phase 9',
        title: 'Context Engineering, Vector Databases & Advanced RAG',
        description:
          'Master the #1 most heavily tested AI Engineering interview domain—designing, scaling, and debugging production RAG pipelines.',
        folder: 'content/docs/ai/rag',
        status: 'written',
        topics: [
          {
            id: 'p9-overview',
            title: 'Overview',
            url: '/ai/rag',
            desc: 'Comprehensive blueprint for context engineering, semantic retrieval, reranking, and agentic RAG.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p9-context-engineering',
            title: 'Context Engineering vs Prompt Engineering',
            url: '/ai/rag/context-engineering',
            desc: 'Tuning the inner prompt box vs architecting the complete outer context window (tools, memory, retrieval).',
            status: 'written',
            interview: true,
          },
          {
            id: 'p9-prompt-chaining',
            title: 'Prompt Chaining & Modular Pipelines',
            url: '/ai/rag/prompt-chaining',
            desc: 'Decomposing complex prompts into sequential validated steps, preventing cascading hallucination.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p9-context-budgeting',
            title: 'Context Budgeting & Compaction',
            url: '/ai/rag/context-budgeting',
            desc: 'Stable-to-fresh context ordering for prompt caching, combating Lost in the Middle, recursive summarization.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p9-rag-vs-long-context',
            title: 'RAG vs Long Context Windows',
            url: '/ai/rag/rag-vs-long-context',
            desc: 'Cost per query, Time-To-First-Token, and needle-in-a-haystack recall degradation in 1M+ token windows.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p9-chunking',
            title: 'Chunking & Contextual Retrieval',
            url: '/ai/rag/chunking',
            desc: 'Fixed-size, recursive character, semantic, and parent-child chunking; prepending LLM-generated contextual headers.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p9-embeddings',
            title: 'Dense Embeddings & Vector Representations',
            url: '/ai/rag/embeddings',
            desc: 'High-dimensional embedding models, semantic similarity metrics, scalar and binary embedding quantization.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p9-vector-databases',
            title: 'Vector Databases & ANN Search',
            url: '/ai/rag/vector-databases',
            desc: 'Approximate Nearest Neighbor (ANN) algorithms: HNSW graphs, IVF clustering, Product Quantization, metadata filtering.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p9-hybrid-search',
            title: 'Hybrid Search (Dense + BM25)',
            url: '/ai/rag/hybrid-search',
            desc: 'Combining dense semantic vectors with sparse lexical BM25 exact keyword matching via Reciprocal Rank Fusion.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p9-reranking',
            title: 'Reranking & Late Interaction (ColBERT)',
            url: '/ai/rag/reranking',
            desc: 'Retrieval recall vs reranker precision; Cross-Encoders, LLM rerankers, and ColBERT per-token MaxSim scoring.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p9-query-transformation',
            title: 'Query Transformation & Expansion',
            url: '/ai/rag/query-transformation',
            desc: 'HyDE (Hypothetical Document Embeddings), Query Decomposition, Step-Back Prompting, and Multi-Query retrieval.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p9-agentic-rag',
            title: 'Self-RAG & Agentic RAG',
            url: '/ai/rag/agentic-rag',
            desc: 'Dynamic retrieval routing, autonomous relevance reflection, multi-hop query rewriting, and stopping criteria.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p9-graphrag',
            title: 'GraphRAG (Knowledge Graph RAG)',
            url: '/ai/rag/graphrag',
            desc: 'Entities, relations, hierarchical community summaries, Local vs Global graph search, and indexing cost trade-offs.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p9-vectorless-rag',
            title: 'Vectorless RAG & Structured Data',
            url: '/ai/rag/vectorless-rag',
            desc: 'Natural language over SQL (Text-to-SQL), Markdown tables, complex multi-column PDF layout parsing.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p9-production-debugging',
            title: 'Production RAG Debugging & Failure Modes',
            url: '/ai/rag/production-debugging',
            desc: 'Fixing hallucinations despite context, duplicate chunks, million-doc latency, RBAC security filters, index freshness.',
            status: 'written',
            interview: true,
          },
        ],
      },
      {
        id: 'phase-10',
        number: 'Phase 10',
        title: 'High-Performance Inference, Quantization, CUDA & Serving',
        description:
          'Optimize GPU hardware execution, compress model weights, and serve LLMs with minimal Time-To-First-Token (TTFT) and maximum throughput.',
        folder: 'content/docs/ai/inference',
        status: 'written',
        topics: [
          {
            id: 'p10-overview',
            title: 'Overview',
            url: '/ai/inference',
            desc: 'GPU execution and CUDA kernels, quantization math and PTQ methods, KV cache arithmetic, prefill against decode, speculation, batching, and serving engines.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p10-gpu-hardware',
            title: 'GPU Hardware and CUDA Fundamentals',
            url: '/ai/inference/gpu-hardware',
            desc: 'Threads, warps, blocks and SMs, HBM against on-chip SRAM, the memory bandwidth bottleneck, the roofline ridge point, and why kernel fusion is the main lever.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p10-cuda-and-triton',
            title: 'Writing Kernels in CUDA and Triton',
            url: '/ai/inference/cuda-and-triton',
            desc: 'The CUDA block model, shared memory reductions, the Triton block-programming model, tiling, and FlashAttention as the case study in fused kernels.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p10-specialized-silicon',
            title: 'Specialized Inference Silicon',
            url: '/ai/inference/specialized-silicon',
            desc: 'LPUs, wafer-scale engines, TPUs, and three-tier memory: why SRAM-first designs trade capacity for bandwidth, with published specs and the cost objections.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p10-quantization-math',
            title: 'Quantization Math, Granularity and Schemes',
            url: '/ai/inference/quantization-math',
            desc: 'Mapping floats to integers with scale and zero-point: INT8, INT4, FP8, NF4, per-tensor against per-channel and per-group, weight-only W4A16 against W8A8.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p10-ptq-vs-qat',
            title: 'PTQ Against QAT',
            url: '/ai/inference/ptq-and-qat',
            desc: 'Round-to-nearest, GPTQ, AWQ protecting salient activation channels, SmoothQuant, bitsandbytes, rotation methods, and what quantization-aware training costs and buys.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p10-local-inference-gguf',
            title: 'Local Inference and GGUF Formats',
            url: '/ai/inference/gguf-and-local',
            desc: 'The GGUF container layout, llama.cpp quant types and their real bits per weight, CPU vector paths, layer offload, Ollama, and Apple Silicon unified memory.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p10-first-token-latency',
            title: 'Prefill Against Decode and First-Token Latency',
            url: '/ai/inference/prefill-and-decode',
            desc: 'Why the first token costs tens of times more than the rest: compute-bound prefill, memory-bound decode, TTFT against TPOT, and chunked prefill interference.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p10-kv-cache-estimation',
            title: 'KV Cache Estimation and Compression',
            url: '/ai/inference/kv-cache',
            desc: 'Exact VRAM arithmetic per token, how many sequences fit on a GPU, when KV traffic overtakes weight traffic, FP8/INT4 caches, eviction, GQA/MLA reductions.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p10-speculative-decoding',
            title: 'Speculative Decoding Variants',
            url: '/ai/inference/speculative-decoding',
            desc: 'Draft and verify with lossless rejection sampling, the expected-tokens formula, n-gram speculation, Medusa heads, EAGLE feature drafting, and tree attention.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p10-continuous-batching',
            title: 'Continuous Batching and Prompt Caching',
            url: '/ai/inference/continuous-batching',
            desc: 'Iteration-level scheduling that removes static batching waste, selective batching, preemption, token budgets, and prefix caching with block-aligned hit rules.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p10-prefill-decode-disagg',
            title: 'Prefill-Decode Disaggregation',
            url: '/ai/inference/disaggregation',
            desc: 'Why one GPU pool cannot serve both phases well, the KV transfer arithmetic that decides whether separation pays, and DistServe, Splitwise, and Mooncake.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p10-serving-engines',
            title: 'Serving Engines Compared',
            url: '/ai/inference/serving-engines',
            desc: 'vLLM PagedAttention, SGLang RadixAttention and constrained decoding, TensorRT-LLM engine compilation and CUDA graphs, and how to choose between them.',
            status: 'written',
            interview: true,
          },
        ],
      },
      {
        id: 'phase-11',
        number: 'Phase 11',
        title: 'Autonomous Agents, MCP, Evaluation & Guardrails',
        description:
          'Architect reliable tool-using agents, standardize context connectors with MCP, and implement rigorous automated evaluation.',
        folder: 'content/docs/ai/agents',
        status: 'written',
        topics: [
          {
            id: 'p11-overview',
            title: 'Overview',
            url: '/ai/agents',
            desc: 'Agent anatomy, the loop, memory, MCP and tooling, frameworks and topologies, security, and automated evaluation with guardrails.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p11-five-agent-components',
            title: 'The 5 Core Components of an AI Agent',
            url: '/ai/agents/agent-anatomy',
            desc: 'The model, the system prompt and Agent Skills, tool definitions, memory, and the controller loop that ties them together.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p11-loop-engineering',
            title: 'Loop Engineering and Fixing Infinite Loops',
            url: '/ai/agents/agent-loop',
            desc: 'The Think-Act-Observe cycle, step budgets, stopping conditions, stuck-action detectors, and the explicit FINISH tool call.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p11-agent-memory',
            title: 'Agent Memory',
            url: '/ai/agents/agent-memory',
            desc: 'Short-term trajectory against long-term stores, the episodic, semantic and procedural taxonomy, write and recall policies, and the failure modes.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p11-reasoning-patterns',
            title: 'Reasoning Patterns: ReAct, Plan-and-Execute',
            url: '/ai/agents/reasoning-patterns',
            desc: 'ReAct, hierarchical Plan-and-Execute, Reflexion self-critique, self-refine, tree search, and the evidence on when critique actually helps.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p11-function-calling-vs-mcp',
            title: 'Function Calling Against MCP',
            url: '/ai/agents/function-calling',
            desc: 'How a model requests a tool: schema design, the description as routing signal, parallel calls, strict mode, streaming, and error handling.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p11-mcp-triad',
            title: 'The MCP Triad Architecture',
            url: '/ai/agents/mcp',
            desc: 'Host, client and server; tools, resources and prompts; transports and authorization; every spec revision from 2024-11-05 to 2026-07-28.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p11-langchain-vs-langgraph',
            title: 'LangChain Against LangGraph',
            url: '/ai/agents/agent-frameworks',
            desc: 'Linear composable pipe chains against cyclical stateful graphs with checkpointing and human-in-the-loop gates, plus the rest of the 2026 field.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p11-multi-agent-topologies',
            title: 'Multi-Agent Topologies',
            url: '/ai/agents/multi-agent',
            desc: 'Supervisor and orchestrator-worker patterns, handoffs, parallel sub-agents, deterministic routing, and the context that makes them work.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p11-agent-security',
            title: 'Agent Security and Prompt Injection Defense',
            url: '/ai/agents/agent-security',
            desc: 'Direct and indirect injection, the lethal trifecta, least-privilege tool scoping, confirmation gates, and sandboxed code execution.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p11-four-eval-pillars',
            title: 'The 4 Evaluation Pillars',
            url: '/ai/agents/eval-metrics',
            desc: 'Reference metrics (BLEU, ROUGE, BERTScore, perplexity, exact match) and fixed benchmarks (MMLU, GSM8K, HumanEval, SWE-bench) with what each hides.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p11-llm-judge-biases',
            title: 'Human Evaluation and LLM-as-a-Judge',
            url: '/ai/agents/judge-and-human-eval',
            desc: 'Likert scales, pairwise battles and Bradley-Terry ratings, error annotation, and mitigating position, verbosity and self-preference bias.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p11-rag-triad-eval',
            title: 'RAG and Agent Evaluation',
            url: '/ai/agents/rag-and-agent-eval',
            desc: 'Context precision, context recall, faithfulness and answer relevance with RAGAS and DeepEval, plus tool selection accuracy and trajectory scoring.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p11-distributed-tracing',
            title: 'Distributed Tracing and Runtime Guardrails',
            url: '/ai/agents/observability-guardrails',
            desc: 'Trace instrumentation with LangSmith, Langfuse and Arize Phoenix, plus input and output rails for PII, toxicity, and grounding checks.',
            status: 'written',
            interview: false,
          },
        ],
      },
      {
        id: 'phase-12',
        number: 'Phase 12',
        title: 'MLOps, LLMOps & AI System Design',
        description:
          'Architect production pipelines, pass 60-minute AI System Design interviews, and manage cost/latency/quality trade-offs at scale.',
        folder: 'content/docs/ai/mlops',
        status: 'written',
        topics: [
          {
            id: 'p12-overview',
            title: 'Overview',
            url: '/ai/mlops',
            desc: 'Production pipelines for AI systems: artifact and prompt versioning, GPU containers and scheduling, evaluation gates, telemetry, and four system designs.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p12-experiment-versioning',
            title: 'Experiment Tracking and Registries',
            url: '/ai/mlops/experiment-tracking',
            desc: 'What a run record must contain, Weights and Biases, MLflow, artifact lineage, hyperparameter sweeps, and Model Registry promotion gates.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p12-data-versioning',
            title: 'Dataset and Prompt Versioning',
            url: '/ai/mlops/data-and-prompt-versioning',
            desc: 'DVC for dataset lineage and reproducible pipelines, plus prompt versioning: templates, registries, and treating a prompt as a deployable artifact.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p12-containerization-gpu',
            title: 'Containerization and GPU Orchestration',
            url: '/ai/mlops/containers-and-gpu-scheduling',
            desc: 'Multi-stage CUDA Docker images, Kubernetes GPU scheduling with device plugins, MIG and time-slicing, gang scheduling, and cold-start optimization.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p12-cicd-ai-systems',
            title: 'CI/CD for AI Systems',
            url: '/ai/mlops/ci-cd-for-llms',
            desc: 'Golden-dataset evaluation gates on every pull request, shadow deployments, canary rollouts, A/B tests for models and prompts, and atomic rollback.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p12-production-telemetry',
            title: 'Production Telemetry and Cost Control',
            url: '/ai/mlops/telemetry-and-cost',
            desc: 'TTFT, inter-token latency, token spend per user, semantic cache hit rates, GPU saturation, and detecting data or concept drift in production.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p12-pipeline-stress-test',
            title: 'The 5-Stage Pipeline Stress-Test',
            url: '/ai/mlops/system-design-framework',
            desc: 'Framing every design around Input, Retrieval, Generation, Verification, Feedback, with the failure mode and mitigation stated for each stage.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p12-quality-latency-cost',
            title: 'The Quality-Latency-Cost Triangle',
            url: '/ai/mlops/system-design-framework',
            desc: 'Cascade routing from a quantized 8B model to a frontier reasoner, prompt and semantic caching, and the arithmetic behind cutting API spend by 70%.',
            status: 'written',
            interview: true,
          },
          {
            id: 'p12-case-study-rag',
            title: 'Case Study: Enterprise Multi-Tenant RAG',
            url: '/ai/mlops/case-multitenant-rag',
            desc: 'Scale math, isolation models, permission propagation into the vector query, hybrid retrieval, reranking, and the leak failure modes.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p12-case-study-moderation',
            title: 'Case Study: Content Moderation Pipeline',
            url: '/ai/mlops/case-moderation',
            desc: 'Tiered detectors, base-rate arithmetic, frame sampling, queue prioritization, reviewer load, and adversarial drift.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p12-case-study-coding-agent',
            title: 'Case Study: Autonomous Coding Agent Sandbox',
            url: '/ai/mlops/case-coding-sandbox',
            desc: 'MicroVM isolation, default-deny egress, scoped credentials, protected test harnesses, budgets, and replayable audits.',
            status: 'written',
            interview: false,
          },
          {
            id: 'p12-case-study-support',
            title: 'Case Study: Customer Support Copilot',
            url: '/ai/mlops/case-support-copilot',
            desc: 'Intent routing, four answer lanes, cache layers, multi-turn context cost, containment metrics, and cost per resolved conversation.',
            status: 'written',
            interview: false,
          },
        ],
      },
    ],
  },
];

function generateHTML() {
  const totalTopics = curriculum.reduce(
    (acc, g) => acc + g.phases.reduce((pAcc, p) => pAcc + p.topics.length, 0),
    0,
  );

  const interviewTopics = curriculum.reduce(
    (acc, g) =>
      acc + g.phases.reduce((pAcc, p) => pAcc + p.topics.filter((t) => t.interview).length, 0),
    0,
  );

  const writtenTopics = curriculum.reduce(
    (acc, g) =>
      acc +
      g.phases.reduce((pAcc, p) => pAcc + p.topics.filter((t) => t.status === 'written').length, 0),
    0,
  );

  return `<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Engineering Documentation — Table of Contents & Study Tracker</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600&family=Geist+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    :root {
      --font-sans: 'Geist', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      --font-mono: 'Geist Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      
      /* Dark Theme (Default) - Pure Black & Neutral Dark Shades */
      --bg: #000000;
      --bg-subtle: #080808;
      --surface: #0e0e0e;
      --surface-elevated: #161616;
      --surface-hover: #1c1c1c;
      --border: #242424;
      --border-subtle: #181818;
      
      --text: #ededed;
      --text-muted: #999999;
      --text-dim: #666666;
      
      --primary: #242424;
      --primary-hover: #333333;
      --primary-text: #ffffff;
      
      --accent-green: #10b981;
      --accent-green-bg: #091a12;
      --accent-green-border: #143d2b;
      
      --accent-amber: #f59e0b;
      --accent-amber-bg: #1c1606;
      --accent-amber-border: #3b2e08;
      
      --radius-xs: 3px;
      --radius-sm: 4px;
      --radius-md: 6px;
      --radius-full: 9999px;
      
      --transition: all 0.15s ease;
    }

    [data-theme="light"] {
      /* Light Theme - Simple & Flat */
      --bg: #f8fafc;
      --bg-subtle: #f1f5f9;
      --surface: #ffffff;
      --surface-elevated: #f8fafc;
      --surface-hover: #f1f5f9;
      --border: #cbd5e1;
      --border-subtle: #e2e8f0;
      
      --text: #0f172a;
      --text-muted: #475569;
      --text-dim: #64748b;
      
      --primary: #334155;
      --primary-hover: #1e293b;
      --primary-text: #ffffff;
      
      --accent-green: #059669;
      --accent-green-bg: #ecfdf5;
      --accent-green-border: #a7f3d0;
      
      --accent-amber: #b45309;
      --accent-amber-bg: #fef3c7;
      --accent-amber-border: #fde68a;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: var(--font-sans);
      background-color: var(--bg);
      color: var(--text);
      font-size: 13px;
      line-height: 1.5;
      min-height: 100vh;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .container {
      max-width: 860px;
      margin: 0 auto;
      padding: 24px 16px 60px 16px;
    }

    /* Header */
    header {
      margin-bottom: 20px;
    }

    .top-nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 14px;
    }

    .brand-pill {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 3px 8px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      font-size: 11px;
      font-weight: 600;
      color: var(--text-muted);
    }

    .brand-pill svg {
      width: 13px;
      height: 13px;
    }

    .nav-actions {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .theme-toggle, .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      height: 28px;
      padding: 0 10px;
      border-radius: var(--radius-sm);
      font-size: 11.5px;
      font-weight: 500;
      cursor: pointer;
      background: var(--surface);
      border: 1px solid var(--border);
      color: var(--text-muted);
      transition: var(--transition);
      user-select: none;
    }

    .theme-toggle:hover, .btn-secondary:hover {
      background: var(--surface-hover);
      color: var(--text);
      border-color: var(--text-dim);
    }

    .hero-title {
      font-size: 18px;
      font-weight: 600;
      letter-spacing: -0.01em;
      line-height: 1.3;
      margin-bottom: 4px;
      color: var(--text);
    }

    .hero-desc {
      font-size: 12px;
      color: var(--text-muted);
      max-width: 680px;
      line-height: 1.45;
    }

    /* Simple Flat Progress Card */
    .progress-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 12px 14px;
      margin-bottom: 18px;
    }

    .progress-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
      margin-bottom: 8px;
      flex-wrap: wrap;
      gap: 8px;
    }

    .progress-title-wrap {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .progress-title {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text);
    }

    .progress-badge {
      display: inline-flex;
      align-items: center;
      font-family: var(--font-mono);
      font-size: 10.5px;
      font-weight: 600;
      color: var(--accent-green);
      background: var(--accent-green-bg);
      border: 1px solid var(--accent-green-border);
      padding: 1px 6px;
      border-radius: var(--radius-xs);
    }

    .progress-count {
      font-family: var(--font-mono);
      font-size: 16px;
      font-weight: 600;
    }

    .progress-count small {
      font-size: 11.5px;
      color: var(--text-muted);
      font-weight: 400;
    }

    .progress-bar-track {
      width: 100%;
      height: 5px;
      background: var(--surface-elevated);
      border-radius: var(--radius-xs);
      overflow: hidden;
      margin-bottom: 10px;
      border: 1px solid var(--border-subtle);
    }

    .progress-bar-fill {
      height: 100%;
      width: 0%;
      background: var(--accent-green);
      border-radius: var(--radius-xs);
      transition: width 0.25s ease;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 8px;
      border-top: 1px solid var(--border-subtle);
      padding-top: 8px;
    }

    .stat-item {
      display: flex;
      flex-direction: column;
      gap: 1px;
    }

    .stat-label {
      font-size: 10px;
      color: var(--text-dim);
      text-transform: uppercase;
      letter-spacing: 0.04em;
      font-weight: 600;
    }

    .stat-val {
      font-size: 12.5px;
      font-weight: 600;
      font-family: var(--font-mono);
      color: var(--text);
    }

    .stat-val small {
      font-size: 10.5px;
      font-weight: 400;
      color: var(--text-muted);
    }

    /* Controls & Toolbar */
    .toolbar {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      padding: 8px 10px;
    }

    .search-row {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
    }

    .search-box {
      flex: 1;
      min-width: 220px;
      position: relative;
    }

    .search-icon {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-dim);
      pointer-events: none;
      width: 13px;
      height: 13px;
    }

    .search-input {
      width: 100%;
      height: 29px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      padding: 0 26px 0 28px;
      color: var(--text);
      font-family: var(--font-sans);
      font-size: 12px;
      outline: none;
      transition: var(--transition);
    }

    .search-input:focus {
      border-color: var(--text-dim);
    }

    .search-clear {
      position: absolute;
      right: 8px;
      top: 50%;
      transform: translateY(-50%);
      background: none;
      border: none;
      color: var(--text-dim);
      cursor: pointer;
      display: none;
      padding: 2px;
      font-size: 14px;
      line-height: 1;
    }
    .search-clear:hover {
      color: var(--text);
    }

    .filter-pills {
      display: flex;
      gap: 5px;
      flex-wrap: wrap;
    }

    .filter-pill {
      background: var(--bg);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 3px 8px;
      border-radius: var(--radius-sm);
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: var(--transition);
      display: inline-flex;
      align-items: center;
      gap: 4px;
      user-select: none;
    }

    .filter-pill:hover {
      color: var(--text);
      border-color: var(--text-dim);
    }

    .filter-pill.active {
      background: var(--primary);
      color: var(--primary-text);
      border-color: var(--primary);
      font-weight: 600;
    }

    .toolbar-actions {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      border-top: 1px solid var(--border-subtle);
      padding-top: 6px;
      font-size: 11px;
    }

    .action-group {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .btn-text {
      background: none;
      border: none;
      color: var(--text-muted);
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      padding: 2px 5px;
      border-radius: var(--radius-xs);
      transition: var(--transition);
    }
    .btn-text:hover {
      color: var(--text);
      background: var(--surface-hover);
    }
    .btn-text.danger:hover {
      color: #ef4444;
      background: rgba(239, 68, 68, 0.1);
    }

    /* Curriculum Hierarchy */
    .group-section {
      margin-bottom: 24px;
    }

    .group-header {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
      padding-bottom: 4px;
      border-bottom: 1px solid var(--border);
    }

    .group-title {
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-dim);
    }

    .group-badge {
      font-size: 10px;
      font-weight: 500;
      color: var(--text-dim);
      background: var(--surface);
      border: 1px solid var(--border);
      padding: 1px 5px;
      border-radius: var(--radius-xs);
    }

    /* Phase Accordion Card */
    .phase-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius-md);
      margin-bottom: 8px;
      overflow: hidden;
    }

    .phase-card.all-covered {
      border-color: var(--accent-green-border);
    }

    .phase-header {
      padding: 8px 12px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
      cursor: pointer;
      background: var(--surface);
      user-select: none;
    }

    .phase-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
      min-width: 0;
    }

    .phase-num {
      font-family: var(--font-mono);
      font-size: 10.5px;
      font-weight: 600;
      color: var(--text-dim);
      background: var(--surface-elevated);
      border: 1px solid var(--border);
      padding: 1px 5px;
      border-radius: var(--radius-xs);
      white-space: nowrap;
    }

    .phase-title-text {
      font-size: 12.5px;
      font-weight: 600;
      color: var(--text);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .phase-stats {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-shrink: 0;
    }

    .badge-written {
      font-size: 10px;
      font-weight: 500;
      color: var(--accent-green);
      background: var(--accent-green-bg);
      border: 1px solid var(--accent-green-border);
      padding: 1px 5px;
      border-radius: var(--radius-xs);
    }

    .phase-progress-pill {
      font-family: var(--font-mono);
      font-size: 10.5px;
      font-weight: 500;
      color: var(--text-muted);
      background: var(--bg);
      border: 1px solid var(--border);
      padding: 1px 6px;
      border-radius: var(--radius-xs);
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }

    .phase-progress-pill.completed {
      color: var(--accent-green);
      background: var(--accent-green-bg);
      border-color: var(--accent-green-border);
    }

    .phase-chevron {
      color: var(--text-dim);
      transition: transform 0.2s ease;
      width: 14px;
      height: 14px;
    }

    .phase-card.expanded .phase-chevron {
      transform: rotate(180deg);
    }

    .phase-body {
      display: none;
      padding: 0 12px 10px 12px;
      border-top: 1px solid var(--border-subtle);
    }

    .phase-card.expanded .phase-body {
      display: block;
    }

    .phase-desc {
      font-size: 11.5px;
      color: var(--text-muted);
      margin: 6px 0 8px 0;
      line-height: 1.4;
    }

    .phase-actions-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 8px;
      padding-bottom: 4px;
      border-bottom: 1px dashed var(--border-subtle);
    }

    .phase-actions-left {
      font-size: 10.5px;
      color: var(--text-dim);
    }

    /* Subtopics List */
    .topics-list {
      display: flex;
      flex-direction: column;
      gap: 5px;
    }

    .topic-row {
      display: flex;
      align-items: flex-start;
      gap: 9px;
      padding: 6px 9px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      transition: var(--transition);
      cursor: pointer;
      position: relative;
    }

    .topic-row:hover {
      background: var(--surface-hover);
      border-color: var(--text-dim);
    }

    .topic-row.is-covered {
      background: var(--accent-green-bg);
      border-color: var(--accent-green-border);
    }

    /* Flat Checkbox */
    .checkbox-container {
      display: flex;
      align-items: center;
      margin-top: 2px;
      cursor: pointer;
    }

    .checkbox-input {
      position: absolute;
      opacity: 0;
      cursor: pointer;
      height: 0;
      width: 0;
    }

    .checkbox-custom {
      width: 15px;
      height: 15px;
      background: var(--surface);
      border: 1.5px solid var(--border);
      border-radius: var(--radius-xs);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: var(--transition);
      flex-shrink: 0;
    }

    .topic-row:hover .checkbox-custom {
      border-color: var(--text-muted);
    }

    .checkbox-input:checked ~ .checkbox-custom {
      background: var(--accent-green);
      border-color: var(--accent-green);
    }

    .checkbox-icon {
      width: 10px;
      height: 10px;
      fill: none;
      stroke: #ffffff;
      stroke-width: 2.5;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: 0;
      transition: opacity 0.1s ease;
    }

    .checkbox-input:checked ~ .checkbox-custom .checkbox-icon {
      opacity: 1;
    }

    /* Topic Content */
    .topic-content {
      flex: 1;
      min-width: 0;
    }

    .topic-head {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-bottom: 2px;
      flex-wrap: wrap;
    }

    .topic-title {
      font-size: 12px;
      font-weight: 500;
      color: var(--text);
      text-decoration: none;
    }

    .topic-row.is-covered .topic-title {
      color: var(--text);
    }

    .tag-interview {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      font-size: 9.5px;
      font-weight: 600;
      color: var(--accent-amber);
      background: var(--accent-amber-bg);
      border: 1px solid var(--accent-amber-border);
      padding: 0 4px;
      border-radius: var(--radius-xs);
      letter-spacing: 0.02em;
    }

    .tag-covered-status {
      display: none;
      align-items: center;
      font-size: 9.5px;
      font-weight: 600;
      color: var(--accent-green);
      background: var(--accent-green-bg);
      padding: 0 4px;
      border-radius: var(--radius-xs);
    }

    .topic-row.is-covered .tag-covered-status {
      display: inline-flex;
    }

    .doc-link-btn {
      display: inline-flex;
      align-items: center;
      gap: 3px;
      color: var(--text-muted);
      font-size: 10.5px;
      text-decoration: none;
      margin-left: auto;
      padding: 1px 6px;
      border-radius: var(--radius-xs);
      background: var(--surface-elevated);
      border: 1px solid var(--border);
    }

    .doc-link-btn svg {
      width: 10px;
      height: 10px;
    }

    .topic-desc {
      font-size: 11px;
      color: var(--text-muted);
      line-height: 1.35;
    }

    /* Toast */
    .toast {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: var(--surface-elevated);
      color: var(--text);
      border: 1px solid var(--border);
      padding: 8px 14px;
      border-radius: var(--radius-sm);
      font-size: 11.5px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
      z-index: 1000;
      opacity: 0;
      transform: translateY(6px);
      pointer-events: none;
      transition: var(--transition);
    }

    .toast.show {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }

    /* Empty state */
    .empty-search {
      display: none;
      text-align: center;
      padding: 40px 16px;
      background: var(--surface);
      border: 1px dashed var(--border);
      border-radius: var(--radius-sm);
      color: var(--text-muted);
      font-size: 12px;
    }

    .empty-search svg {
      width: 32px;
      height: 32px;
      color: var(--text-dim);
      margin-bottom: 8px;
    }

    /* Footer */
    footer {
      margin-top: 36px;
      padding-top: 14px;
      border-top: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
      font-size: 11px;
      color: var(--text-dim);
    }

    footer a {
      color: var(--text-muted);
      text-decoration: none;
    }
    footer a:hover {
      color: var(--text);
      text-decoration: underline;
    }

    /* Responsive */
    @media (max-width: 640px) {
      .container {
        padding: 16px 12px;
      }
      .hero-title {
        font-size: 16px;
      }
      .phase-header {
        padding: 8px 10px;
      }
      .phase-body {
        padding: 0 10px 8px 10px;
      }
      .topic-row {
        padding: 6px 8px;
      }
      .stats-grid {
        grid-template-columns: 1fr 1fr;
      }
      .doc-link-btn {
        margin-left: 0;
        margin-top: 4px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <header>
      <div class="top-nav">
        <div class="brand-pill">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
          </svg>
          AI Engineering Tracker
        </div>
        <div class="nav-actions">
          <button class="btn-secondary" id="btn-export" title="Copy text summary to clipboard">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
              <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
            </svg>
            Copy Summary
          </button>
          <button class="theme-toggle" id="theme-toggle" aria-label="Toggle Theme">
            <svg id="moon-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
            </svg>
            <svg id="sun-icon" style="display:none;" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="4"/>
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/>
            </svg>
            <span id="theme-text">Theme</span>
          </button>
        </div>
      </div>

      <h1 class="hero-title">AI Engineering Documentation — Table of Contents</h1>
      <p class="hero-desc">Interactive curriculum covering linear algebra, PyTorch mechanics, frontier LLMs, advanced RAG, inference, and autonomous agents.</p>
    </header>

    <!-- Progress Card -->
    <section class="progress-card">
      <div class="progress-header">
        <div class="progress-title-wrap">
          <span class="progress-title">Curriculum Progress</span>
          <span class="progress-badge" id="completion-pct-badge">0% Covered</span>
        </div>
        <div class="progress-count">
          <span id="covered-count">0</span><small> / ${totalTopics} Topics</small>
        </div>
      </div>

      <div class="progress-bar-track">
        <div class="progress-bar-fill" id="master-progress-bar"></div>
      </div>

      <div class="stats-grid">
        <div class="stat-item">
          <span class="stat-label">Interview Core</span>
          <span class="stat-val"><span id="interview-covered-count">0</span> <small>/ ${interviewTopics}</small></span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Written Docs</span>
          <span class="stat-val"><span id="written-covered-count">0</span> <small>/ ${writtenTopics}</small></span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Total Phases</span>
          <span class="stat-val">13 <small>Phases</small></span>
        </div>
      </div>
    </section>

    <!-- Toolbar / Search / Filters -->
    <div class="toolbar">
      <div class="search-row">
        <div class="search-box">
          <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.3-4.3"/>
          </svg>
          <input type="text" class="search-input" id="search-input" placeholder="Search topics (e.g. LoRA, DPO, Softmax, GQA, vLLM)...">
          <button class="search-clear" id="search-clear" title="Clear search">&times;</button>
        </div>

        <div class="filter-pills">
          <button class="filter-pill active" data-filter="all">All (${totalTopics})</button>
          <button class="filter-pill" data-filter="uncovered">Uncovered</button>
          <button class="filter-pill" data-filter="covered">Covered</button>
          <button class="filter-pill" data-filter="interview">⭐ Interview Core (${interviewTopics})</button>
          <button class="filter-pill" data-filter="written">📖 Written (${writtenTopics})</button>
        </div>
      </div>

      <div class="toolbar-actions">
        <div class="action-group">
          <button class="btn-text" id="btn-expand-all">Expand All</button>
          <span>•</span>
          <button class="btn-text" id="btn-collapse-all">Collapse All</button>
        </div>
        <div class="action-group">
          <button class="btn-text" id="btn-select-all">Mark All Covered</button>
          <span>•</span>
          <button class="btn-text danger" id="btn-reset-all">Reset All</button>
        </div>
      </div>
    </div>


    <!-- Empty Search State -->
    <div class="empty-search" id="empty-search">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <path d="m21 21-4.3-4.3"/>
        <path d="M8 11h6"/>
      </svg>
      <h3>No topics match your query</h3>
      <p>Try searching for a different keyword or clearing active filters.</p>
    </div>

    <!-- Curriculum Groups -->
    <main id="curriculum-container">
      ${curriculum
        .map(
          (group) => `
        <section class="group-section" data-group="${group.group}">
          <div class="group-header">
            <h2 class="group-title">${group.group}</h2>
            <span class="group-badge">${group.phases.length} ${group.phases.length === 1 ? 'Phase' : 'Phases'}</span>
          </div>

          ${group.phases
            .map(
              (phase, pIndex) => `
            <div class="phase-card expanded" id="card-${phase.id}" data-phase="${phase.id}">
              <div class="phase-header" data-toggle="${phase.id}">
                <div class="phase-meta">
                  <span class="phase-num">${phase.number}</span>
                  <span class="phase-title-text">${phase.title}</span>
                </div>
                <div class="phase-stats">
                  <span class="badge-written">Written (${phase.topics.length}p)</span>
                  <span class="phase-progress-pill" id="pill-${phase.id}">
                    <span class="phase-covered-num">0</span>/${phase.topics.length}
                  </span>
                  <svg class="phase-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="6 9 12 15 18 9"/>
                  </svg>
                </div>
              </div>

              <div class="phase-body">
                <p class="phase-desc">${phase.description}</p>
                <div class="phase-actions-bar">
                  <span class="phase-actions-left">${phase.topics.length} subtopics</span>
                  <button class="btn-text btn-mark-phase" data-phase-target="${phase.id}">Toggle Phase Covered</button>
                </div>

                <div class="topics-list">
                  ${phase.topics
                    .map(
                      (topic) => `
                    <div class="topic-row" id="row-${topic.id}" data-topic-id="${topic.id}" data-interview="${topic.interview}" data-status="${topic.status}">
                      <label class="checkbox-container" onclick="event.stopPropagation();">
                        <input type="checkbox" class="checkbox-input" id="check-${topic.id}" data-topic-id="${topic.id}" data-phase-id="${phase.id}">
                        <div class="checkbox-custom">
                          <svg class="checkbox-icon" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        </div>
                      </label>

                      <div class="topic-content">
                        <div class="topic-head">
                          <span class="topic-title">${topic.title}</span>
                          ${topic.interview ? `<span class="tag-interview">⭐ INTERVIEW-CORE</span>` : ''}
                          <span class="tag-covered-status">✓ Covered</span>
                          ${
                            topic.url
                              ? `
                            <a href="https://atticintic.vercel.app${topic.url}" target="_blank" rel="noopener noreferrer" class="doc-link-btn" onclick="event.stopPropagation();" title="Open documentation on atticintic.vercel.app">
                              Read Page
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                                <polyline points="15 3 21 3 21 9"/>
                                <line x1="10" y1="14" x2="21" y2="3"/>
                              </svg>
                            </a>
                          `
                              : ''
                          }
                        </div>
                        <p class="topic-desc">${topic.desc}</p>
                      </div>
                    </div>
                  `,
                    )
                    .join('')}
                </div>
              </div>
            </div>
          `,
            )
            .join('')}
        </section>
      `,
        )
        .join('')}
    </main>

    <footer>
      <div>
        <span>AI Engineering Curriculum Documentation</span> • 
        <span>Generated for <a href="file:///E:/dev/attic">attic</a></span>
      </div>
      <div>
        <span>Checkboxes persist in local storage automatically</span>
      </div>
    </footer>
  </div>

  <div class="toast" id="toast">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
      <polyline points="22 4 12 14.01 9 11.01"/>
    </svg>
    <span id="toast-msg">Progress updated!</span>
  </div>

  <script>
    (function() {
      const STORAGE_KEY = 'ai_eng_toc_progress_v1';
      const THEME_KEY = 'ai_eng_theme_pref';

      const curriculumData = ${JSON.stringify(curriculum)};
      const totalTopicsCount = ${totalTopics};
      const interviewTotalCount = ${interviewTopics};
      const writtenTotalCount = ${writtenTopics};

      let coveredSet = new Set();
      let activeFilter = 'all';
      let searchQuery = '';

      // Initialize theme
      function initTheme() {
        const savedTheme = localStorage.getItem(THEME_KEY);
        if (savedTheme) {
          document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
          document.documentElement.setAttribute('data-theme', 'light');
        } else {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
        updateThemeUI();
      }

      function updateThemeUI() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const sun = document.getElementById('sun-icon');
        const moon = document.getElementById('moon-icon');
        const text = document.getElementById('theme-text');
        if (currentTheme === 'light') {
          sun.style.display = 'inline-block';
          moon.style.display = 'none';
          text.textContent = 'Light';
        } else {
          sun.style.display = 'none';
          moon.style.display = 'inline-block';
          text.textContent = 'Dark';
        }
      }

      document.getElementById('theme-toggle').addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(THEME_KEY, next);
        updateThemeUI();
      });

      // Load saved progress
      function loadProgress() {
        try {
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            const arr = JSON.parse(raw);
            coveredSet = new Set(arr);
          }
        } catch (e) {
          console.error('Failed to parse localStorage progress', e);
          coveredSet = new Set();
        }
      }

      function saveProgress() {
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(coveredSet)));
        } catch (e) {
          console.error('Failed to save to localStorage', e);
        }
      }

      // Update UI elements based on coveredSet
      function updateStats() {
        const coveredCount = coveredSet.size;
        const pct = totalTopicsCount > 0 ? Math.round((coveredCount / totalTopicsCount) * 100) : 0;

        document.getElementById('covered-count').textContent = coveredCount;
        document.getElementById('master-progress-bar').style.width = pct + '%';
        document.getElementById('completion-pct-badge').textContent = pct + '% Covered';

        // Count interview and written
        let interviewCovered = 0;
        let writtenCovered = 0;

        curriculumData.forEach(g => {
          g.phases.forEach(p => {
            let phaseCovered = 0;
            p.topics.forEach(t => {
              const isChecked = coveredSet.has(t.id);
              if (isChecked) {
                if (t.interview) interviewCovered++;
                if (t.status === 'written') writtenCovered++;
                phaseCovered++;
              }

              // Update DOM row state
              const row = document.getElementById('row-' + t.id);
              const checkbox = document.getElementById('check-' + t.id);
              if (row && checkbox) {
                if (isChecked) {
                  row.classList.add('is-covered');
                  checkbox.checked = true;
                } else {
                  row.classList.remove('is-covered');
                  checkbox.checked = false;
                }
              }
            });

            // Update Phase pill
            const pill = document.getElementById('pill-' + p.id);
            const card = document.getElementById('card-' + p.id);
            if (pill) {
              const numSpan = pill.querySelector('.phase-covered-num');
              if (numSpan) numSpan.textContent = phaseCovered;
              if (phaseCovered === p.topics.length && p.topics.length > 0) {
                pill.classList.add('completed');
                if (card) card.classList.add('all-covered');
              } else {
                pill.classList.remove('completed');
                if (card) card.classList.remove('all-covered');
              }
            }
          });
        });

        document.getElementById('interview-covered-count').textContent = interviewCovered;
        document.getElementById('written-covered-count').textContent = writtenCovered;
      }

      // Toggle a single topic
      function toggleTopic(topicId) {
        if (coveredSet.has(topicId)) {
          coveredSet.delete(topicId);
        } else {
          coveredSet.add(topicId);
        }
        saveProgress();
        updateStats();
        applyFilters();
      }

      // Toggle entire phase
      function togglePhase(phaseId) {
        let phase = null;
        for (const g of curriculumData) {
          for (const p of g.phases) {
            if (p.id === phaseId) {
              phase = p;
              break;
            }
          }
          if (phase) break;
        }
        if (!phase) return;

        const allCovered = phase.topics.every(t => coveredSet.has(t.id));
        if (allCovered) {
          // Uncheck all in phase
          phase.topics.forEach(t => coveredSet.delete(t.id));
          showToast('Phase ' + phase.number + ' unmarked');
        } else {
          // Check all in phase
          phase.topics.forEach(t => coveredSet.add(t.id));
          showToast('Phase ' + phase.number + ' marked covered!');
        }

        saveProgress();
        updateStats();
        applyFilters();
      }

      // Filters & Search
      function applyFilters() {
        const q = searchQuery.toLowerCase().trim();
        let visibleTopicsCount = 0;

        curriculumData.forEach(g => {
          let groupHasVisiblePhase = false;

          g.phases.forEach(p => {
            let phaseHasVisibleTopic = false;

            p.topics.forEach(t => {
              const row = document.getElementById('row-' + t.id);
              if (!row) return;

              const isCovered = coveredSet.has(t.id);
              let matchesFilter = true;

              if (activeFilter === 'covered' && !isCovered) matchesFilter = false;
              if (activeFilter === 'uncovered' && isCovered) matchesFilter = false;
              if (activeFilter === 'interview' && !t.interview) matchesFilter = false;
              if (activeFilter === 'written' && t.status !== 'written') matchesFilter = false;

              let matchesSearch = true;
              if (q) {
                const text = (t.title + ' ' + t.desc + ' ' + p.title + ' ' + p.number).toLowerCase();
                matchesSearch = text.includes(q);
              }

              if (matchesFilter && matchesSearch) {
                row.style.display = 'flex';
                phaseHasVisibleTopic = true;
                visibleTopicsCount++;
              } else {
                row.style.display = 'none';
              }
            });

            const card = document.getElementById('card-' + p.id);
            if (card) {
              if (phaseHasVisibleTopic) {
                card.style.display = 'block';
                groupHasVisiblePhase = true;
              } else {
                card.style.display = 'none';
              }
            }
          });

          const groupSection = document.querySelector('[data-group="' + g.group + '"]');
          if (groupSection) {
            groupSection.style.display = groupHasVisiblePhase ? 'block' : 'none';
          }
        });

        const emptySearch = document.getElementById('empty-search');
        if (emptySearch) {
          emptySearch.style.display = visibleTopicsCount === 0 ? 'block' : 'none';
        }
      }

      // Toast feedback
      let toastTimer = null;
      function showToast(message) {
        const toast = document.getElementById('toast');
        const msg = document.getElementById('toast-msg');
        if (!toast || !msg) return;

        msg.textContent = message;
        toast.classList.add('show');
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => {
          toast.classList.remove('show');
        }, 2200);
      }

      // Setup Event Listeners
      function setupListeners() {
        // Topic row clicks
        document.querySelectorAll('.topic-row').forEach(row => {
          row.addEventListener('click', (e) => {
            // Ignore if clicked directly on an anchor link
            if (e.target.closest('a')) return;
            const topicId = row.getAttribute('data-topic-id');
            if (topicId) toggleTopic(topicId);
          });
        });

        // Checkbox change events
        document.querySelectorAll('.checkbox-input').forEach(box => {
          box.addEventListener('change', (e) => {
            const topicId = box.getAttribute('data-topic-id');
            if (topicId) toggleTopic(topicId);
          });
        });

        // Phase accordion expand/collapse
        document.querySelectorAll('[data-toggle]').forEach(header => {
          header.addEventListener('click', () => {
            const card = header.closest('.phase-card');
            if (card) card.classList.toggle('expanded');
          });
        });

        // Mark phase button
        document.querySelectorAll('.btn-mark-phase').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const phaseId = btn.getAttribute('data-phase-target');
            if (phaseId) togglePhase(phaseId);
          });
        });

        // Filter pills
        document.querySelectorAll('.filter-pill').forEach(pill => {
          pill.addEventListener('click', () => {
            document.querySelectorAll('.filter-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            activeFilter = pill.getAttribute('data-filter') || 'all';
            applyFilters();
          });
        });

        // Search input
        const searchInput = document.getElementById('search-input');
        const clearBtn = document.getElementById('search-clear');
        searchInput.addEventListener('input', (e) => {
          searchQuery = e.target.value;
          clearBtn.style.display = searchQuery ? 'block' : 'none';
          applyFilters();
        });

        clearBtn.addEventListener('click', () => {
          searchInput.value = '';
          searchQuery = '';
          clearBtn.style.display = 'none';
          searchInput.focus();
          applyFilters();
        });

        // Expand / Collapse All
        document.getElementById('btn-expand-all').addEventListener('click', () => {
          document.querySelectorAll('.phase-card').forEach(c => c.classList.add('expanded'));
        });

        document.getElementById('btn-collapse-all').addEventListener('click', () => {
          document.querySelectorAll('.phase-card').forEach(c => c.classList.remove('expanded'));
        });

        // Select All / Reset All
        document.getElementById('btn-select-all').addEventListener('click', () => {
          curriculumData.forEach(g => {
            g.phases.forEach(p => {
              p.topics.forEach(t => coveredSet.add(t.id));
            });
          });
          saveProgress();
          updateStats();
          applyFilters();
          showToast('All topics marked as covered! 🎉');
        });

        document.getElementById('btn-reset-all').addEventListener('click', () => {
          if (confirm('Are you sure you want to reset all your progress? This cannot be undone.')) {
            coveredSet.clear();
            saveProgress();
            updateStats();
            applyFilters();
            showToast('Progress reset.');
          }
        });

        // Copy Summary to Clipboard
        document.getElementById('btn-export').addEventListener('click', () => {
          const coveredCount = coveredSet.size;
          const pct = Math.round((coveredCount / totalTopicsCount) * 100);
          let summary = '# AI Engineering Learning Progress Report\\n\\n';
          summary += '**Overall Progress:** ' + coveredCount + ' / ' + totalTopicsCount + ' (' + pct + '%)\\n\\n';

          curriculumData.forEach(g => {
            summary += '### ' + g.group + '\\n';
            g.phases.forEach(p => {
              const phaseCovered = p.topics.filter(t => coveredSet.has(t.id)).length;
              summary += '- **' + p.number + ': ' + p.title + '** (' + phaseCovered + '/' + p.topics.length + ' covered)\\n';
            });
            summary += '\\n';
          });

          navigator.clipboard.writeText(summary).then(() => {
            showToast('Markdown summary copied to clipboard! 📋');
          }).catch(err => {
            console.error('Clipboard error', err);
            showToast('Could not access clipboard.');
          });
        });
      }

      // Initialize
      initTheme();
      loadProgress();
      updateStats();
      setupListeners();
    })();
  </script>
</body>
</html>`;
}

// Generate file
const htmlContent = generateHTML();
const rootPath = path.join(__dirname, '..', 'ai-engineering-toc.html');

fs.writeFileSync(rootPath, htmlContent, 'utf8');
console.log('Successfully created:', rootPath);
